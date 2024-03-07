import { getProfiles } from '@/api/profile/profileApi';
import { colors } from '@/assets/styles/theme';
import Header from '@/components/common/header';
import Overlay from '@/components/common/overlay';
import ProfileBox from '@/components/profile/ProfileBox';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import FilterBox from '@/components/totalBabpool/FilterBox';
import FilterModal from '@/components/totalBabpool/FilterModal';
import PageNation from '@/components/totalBabpool/PageNation';
import Searchbar from '@/components/totalBabpool/Searchbar';
import { useNavigation } from '@/hooks/useNavigation';
import { ProfileType, ProfilesType } from '@/interface/api/profileType';
import {
    FILTER_CATEGORY,
    FilterCategoryType,
    INIT_INTEREST_KEYWORD,
    INTEREST_KEYWORD,
} from '@/utils/constant';
import { getDivisionId, getDivisionName, getKeywordId } from '@/utils/util';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

export type SearchInfoType = {
    searchText: string;
    division: ('1학년' | '2학년' | '3학년' | '4학년' | '졸업생' | '대학원생')[];
    filterKeyword: {
        university: string[]; // 대학생활
        exam: string[]; // 수험
        employment: string[]; // 취업
        graduateSchool: string[]; // 대학원
    };
};

export default function TotalBabpoolPage() {
    const DEFAULT_FILTER_CATEGORY = FILTER_CATEGORY[0];
    const searchParams = new URLSearchParams(window.location.search);
    const groupName = searchParams.get('groupName') ? searchParams.get('groupName') : '';

    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
        searchText: '',
        division: ['1학년'],
        filterKeyword: groupName
            ? {
                  ...INIT_INTEREST_KEYWORD,
                  [groupName]: INTEREST_KEYWORD[groupName as keyof typeof INTEREST_KEYWORD],
              }
            : INIT_INTEREST_KEYWORD,
    });

    const [page, setPage] = useState(0);
    const filterRef = useRef<SearchInfoType>(searchInfo);

    const [filterCategory, setFilterCategory] =
        useState<FilterCategoryType>(DEFAULT_FILTER_CATEGORY);

    const fetchProfileList = async () => {
        const { searchText, division, filterKeyword } = searchInfo;
        const requestDivision = division.map((item) => getDivisionId(item)).join(',');
        const requestKeyword = Object.values(filterKeyword)
            .flat()
            .map((item) => getKeywordId(item))
            .join(',');
        const params = {
            searchTerm: searchText,
            userGrades: requestDivision,
            keywords: requestKeyword ? requestKeyword : '',
            page,
            size: 10,
            sort: 'profile_intro',
        };
        console.log(params);
        const res = await getProfiles(params);
        console.log(res);
        return res;
    };

    const { data, isError, isLoading } = useQuery<ProfilesType>({
        queryKey: ['profiles', searchInfo, page],
        queryFn: fetchProfileList,
    });
    const { navigate } = useNavigation();
    console.log(data)

    console.log(data);

    const handleProfileSelect = (profile: ProfileType) => {
        navigate(`/profile/${profile.userId}`);
    };

    // searchBar 검색어 변경
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        setSearchInfo((prev) => ({ ...prev, searchText: value }));
    };

    // 필터 카테고리 변경
    const handleChangeCategory = (category: FilterCategoryType) => {
        setFilterCategory(category);
    };

    // 필터 모달 닫기
    const handleCloseModal = () => {
        setFilterModalOpen(false);
    };

    // 필터 모달 열기/닫기
    const handleSetFilterModal = (category: FilterCategoryType) => {
        setFilterModalOpen(!filterModalOpen);
        handleChangeCategory(category);
        filterRef.current = searchInfo;
    };

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    useEffect(() => {
        fetchProfileList();
    }, [searchInfo, page]);

    return !isLoading && data ? (
        <>
            <TotalBabpoolPageContainer>
                <Header text="밥풀 전체보기" />
                <SearchBarContainer>
                    <Searchbar
                        value={searchInfo.searchText}
                        placeHolder="검색하기"
                        onChange={handleTextChange}
                    />
                </SearchBarContainer>
                <FilterBoxContainer>
                    {FILTER_CATEGORY.map((category) => (
                        <FilterBox
                            key={category}
                            text={category}
                            onClick={() => handleSetFilterModal(category)}
                        />
                    ))}
                </FilterBoxContainer>

                {/* 유저 프로필 */}
                <UserProfileContainer>
                    {data.content.map((profile) => {
                        const keywords = profile.keywordIdWithNameString
                            .split(',')
                            .map((item: string) => item.split(':'))
                            .map((item: string[]) => item[1]);
                        return (
                            <UserProfileBox
                                key={profile.userId}
                                onClick={() => handleProfileSelect(profile)}
                            >
                                <ProfileBox
                                    name={String(profile.userId)}
                                    content={profile.profileIntro}
                                    group={getDivisionName(profile.userGrade)}
                                    url={profile.profileImageUrl}
                                />
                                <ProfileKeywords keywords={keywords} />
                            </UserProfileBox>
                        );
                    })}
                </UserProfileContainer>
                <PageNation
                    currentPage={page + 1}
                    totalPage={data.totalPages}
                    handlePageChange={handlePageChange}
                />

                <FilterModal
                    open={filterModalOpen}
                    setSearchInfo={setSearchInfo}
                    filterCategory={filterCategory}
                    filterRef={filterRef}
                    handleChangeCategory={handleChangeCategory}
                    handleSetFilterModal={handleSetFilterModal}
                    handleCloseModal={handleCloseModal}
                />
                {filterModalOpen && <Overlay />}
            </TotalBabpoolPageContainer>
        </>
    ) : (
        <p>로딩중</p>
    );
}

const TotalBabpoolPageContainer = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    position: relative;
    overflow: hidden;
`;

const SearchBarContainer = styled.div`
    width: 100%;
    padding: 15px 20px;
`;

const FilterBoxContainer = styled.div`
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const UserProfileContainer = styled.section`
    width: 100%;
    height: calc(100% - 81px);
    padding: 0 20px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
`;

const UserProfileBox = styled.div`
    width: 100%;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid ${colors.purple_light_20};
    border-radius: 8px;
`;
