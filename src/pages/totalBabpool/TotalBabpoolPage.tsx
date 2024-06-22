import { getProfiles, getisRegistrationProfile } from '@/api/profile/profileApi';
import { colors } from '@/assets/styles/theme';
import { INIT_SEARCH_INFO, SearchInfoType, searchInfoState } from '@/atom/searchInfoStore';
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
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Loading from '@/components/common/loading/Loading';
import { loginCheck } from '@/utils/validate';
import Popup from '@/components/common/popup';
import Button from '@/components/common/button';
import { alarmInfoState } from '@/atom/alarminfo';
import AlarmModal from '@/components/common/alarm/AlarmModal';

export default function TotalBabpoolPage() {
    const DEFAULT_FILTER_CATEGORY = FILTER_CATEGORY[0];
    const searchParams = new URLSearchParams(window.location.search);
    const groupName = searchParams.get('groupName') ? searchParams.get('groupName') : '';

    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [isProfileRegister, setIsProfileRegister] = useState(false);
    const [profileCheckModalOpen, setProfileCheckModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchInfo, setSearchInfo] = useRecoilState(searchInfoState);
    const alarmInfo = useRecoilValue(alarmInfoState);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const filterRef = useRef<SearchInfoType>(searchInfo);

    const [filterCategory, setFilterCategory] =
        useState<FilterCategoryType>(DEFAULT_FILTER_CATEGORY);

        // 프로필 리스트 요청
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
            page: searchInfo.page,
            size: 10,
            sort: 'profile_intro',
        };
        const res = await getProfiles(params);
        console.log(res);
        return res;
    };

    const { data, isError, isLoading } = useQuery<ProfilesType>({
        queryKey: ['profiles', searchInfo],
        queryFn: fetchProfileList, 
        staleTime: 1000 * 60 * 5,
    });
    const { navigate, authCheck } = useNavigation();

    const handleProfileSelect = (profile: ProfileType) => {
        if (!authCheck()) {
        }
        if (!isProfileRegister) {
            setProfileCheckModalOpen(true);
            return;
        }
        setSearchInfo((prev) => ({ ...prev, prevFilterKeyword: prev.filterKeyword }));
        navigate(`profile/${profile.profileId}`);
    };

    // searchBar 검색어 변경
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        setSearchValue(value);
        if (searchValue.length > 20) {
            setSearchValue((prev) => prev.slice(0, 21));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Enter 키가 눌렸을 때 fetchProfileList 함수 호출
            setSearchInfo((prev) => ({ ...prev, searchText: searchValue }));
        }
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
        filterRef.current = searchInfo;
        handleChangeCategory(category);
    };

    const handlePageChange = (page: number) => {
        setSearchInfo((prev) => ({ ...prev, page }));
    };

    useEffect(() => {
        // 이전 필터 키워드가 존재하면 유지, 없으면 초기화
        const validateFilterKeyword = [] as string[];
        Object.values(searchInfo.prevFilterKeyword).map((groupKeywords) => {
            groupKeywords.map((item) => {
                validateFilterKeyword.push(item);
            });
        });
        setSearchInfo((prev) => ({
            ...prev,
            filterKeyword:
                validateFilterKeyword.length !== 0
                    ? searchInfo.prevFilterKeyword
                    : groupName
                    ? {
                          ...INIT_INTEREST_KEYWORD,
                          [groupName]: INTEREST_KEYWORD[groupName as keyof typeof INTEREST_KEYWORD],
                      }
                    : INIT_INTEREST_KEYWORD,
        }));

        return () => {
            setSearchInfo(INIT_SEARCH_INFO);
        }
    }, [groupName]);

    useEffect(() => {
        if (loginCheck()) {
            getisRegistrationProfile().then((res) => {
                setIsProfileRegister(res.register);
            });
        }
    }, []);


    return (
        <>
            <TotalBabpoolPageContainer>
                <Header text="밥풀 전체보기" destination="/" />
                <SearchBarContainer>
                    <Searchbar
                        value={searchValue}
                        placeHolder="검색하기"
                        inputRef={searchInputRef}
                        onChange={handleTextChange}
                        onKeyDown={handleKeyDown}
                    />
                </SearchBarContainer>
                <FilterBoxContainer>
                    {FILTER_CATEGORY.map((category) => {
                        const keywordLength = Object.values(searchInfo.filterKeyword)
                            .flat()
                            .map((item) => getKeywordId(item)).length;
                        return (
                            <FilterBox
                                key={category}
                                text={category}
                                filterLength={
                                    category === '구분' ? searchInfo.division.length : keywordLength
                                }
                                onClick={() => handleSetFilterModal(category)}
                            />
                        );
                    })}
                </FilterBoxContainer>

                {!isLoading && data ? (
                    <>
                        {/* 유저 프로필 */}
                        <UserProfileContainer>
                            {data.content.map((profile) => {
                                const keywords = profile.keywordNameList;

                                return (
                                    <UserProfileBox
                                        key={profile.userId}
                                        onClick={() => handleProfileSelect(profile)}
                                    >
                                        <ProfileBox
                                            name={String(profile.userNickname)}
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
                            currentPage={searchInfo.page + 1}
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
                        {profileCheckModalOpen && (
                            <Overlay>
                                <Popup
                                    text="밥풀러의 프로필카드를 보기 전에"
                                    secondText="나의 프로필카드를 작성하러 가볼까요?"
                                    button={
                                        <Button
                                            text="바로가기"
                                            onClick={() => navigate('/mypage/profile-modify')}
                                        />
                                    }
                                    closePopup={() => setProfileCheckModalOpen(false)}
                                />
                            </Overlay>
                        )}
                        {filterModalOpen && <Overlay />}
                        {alarmInfo.requesterProfileId && (
                            <AlarmModal
                                messageType={alarmInfo.messageType}
                            />
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </TotalBabpoolPageContainer>
        </>
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
