import { colors } from '@/assets/styles/theme';
import Header from '@/components/common/header';
import Overlay from '@/components/common/overlay';
import ProfileBox from '@/components/profile/ProfileBox';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import FilterBox from '@/components/totalBabpool/FilterBox';
import FilterModal from '@/components/totalBabpool/FilterModal';
import PageNation from '@/components/totalBabpool/PageNation';
import Searchbar from '@/components/totalBabpool/Searchbar';
import { FILTER_CATEGORY, FilterCategoryType, INIT_INTEREST_KEYWORD, INTEREST_KEYWORD } from '@/utils/constant';
import React, { useEffect, useRef, useState } from 'react';
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
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [searchInfo, setSearchInfo] = useState<SearchInfoType>({
        searchText: '',
        division: ['1학년'],
        filterKeyword: {...INIT_INTEREST_KEYWORD, university: INTEREST_KEYWORD['university']},
    });

    const filterRef = useRef<SearchInfoType>(searchInfo);

    console.log(searchInfo)

    const [filterCategory, setFilterCategory] =
    useState<FilterCategoryType>(DEFAULT_FILTER_CATEGORY);

    // searchBar 검색어 변경
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }

    // 필터 모달 열기/닫기
    const handleSetFilterModal = (category: FilterCategoryType) => {
        setFilterModalOpen(!filterModalOpen);
        handleChangeCategory(category);
        filterRef.current = searchInfo;
    };


    return (
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
                    {new Array(2).fill(0).map((_, index) => (
                        <UserProfileBox key={index}> 
                            <ProfileBox
                                name="조민택"
                                content="안녕하세요. 한줄소개 테스트"
                                group="1학년"
                            />
                            <ProfileKeywords keywords={['대학', '취업', '멘토', '석사']} />
                        </UserProfileBox>
                    ))}
                </UserProfileContainer>
                <PageNation />

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
