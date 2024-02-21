import { colors } from '@/assets/styles/theme';
import Header from '@/components/common/header';
import Overlay from '@/components/common/overlay';
import ProfileBox from '@/components/profile/ProfileBox';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import FilterBox from '@/components/totalBabpool/FilterBox';
import FilterModal from '@/components/totalBabpool/FilterModal';
import Searchbar from '@/components/totalBabpool/Searchbar';
import { FILTER_CATEGORY, FilterCategoryType } from '@/utils/constant';
import React, { useState } from 'react';
import styled from 'styled-components';

export default function TotalBabpoolPage() {
    const DEFAULT_FILTER_CATEGORY = FILTER_CATEGORY[0];
    const [filterModalOpen, setFilterModalOpen] = useState(false);

    const [filterCategory, setFilterCategory] =
        useState<FilterCategoryType>(DEFAULT_FILTER_CATEGORY);

    const handleChangeCategory = (category: FilterCategoryType) => {
        setFilterCategory(category);
    };

    const handleSetFilterModal = (category: FilterCategoryType) => {
        setFilterModalOpen(!filterModalOpen);
        handleChangeCategory(category);
    };
    return (
        <>
            <TotalBabpoolPageContainer>
                <Header text="밥풀 전체보기" />
                <SearchBarContainer>
                    <Searchbar value="" placeHolder="검색하기" onChange={() => {}} />
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
                <UserProfileContainer>
                    <UserProfileBox>
                        <ProfileBox
                            name="조민택"
                            content="안녕하세요. 한줄소개 테스트"
                            group="1학년"
                        />
                        <ProfileKeywords keywords={['대학', '취업', '멘토', '석사']} />
                    </UserProfileBox>
                    <UserProfileBox>
                        <ProfileBox
                            name="조민택"
                            content="안녕하세요. 한줄소개 테스트"
                            group="1학년"
                        />
                        <ProfileKeywords keywords={['대학', '취업', '멘토', '석사']} />
                    </UserProfileBox>
                    <UserProfileBox>
                        <ProfileBox
                            name="조민택"
                            content="안녕하세요. 한줄소개 테스트"
                            group="1학년"
                        />
                        <ProfileKeywords keywords={['대학', '취업', '멘토', '석사']} />
                    </UserProfileBox>
                    <UserProfileBox>
                        <ProfileBox
                            name="조민택"
                            content="안녕하세요. 한줄소개 테스트"
                            group="1학년"
                        />
                        <ProfileKeywords keywords={['대학', '취업', '멘토', '석사']} />
                    </UserProfileBox>
                </UserProfileContainer>
                <FilterModal
                    open={filterModalOpen}
                    filterCategory={filterCategory}
                    handleChangeCategory={handleChangeCategory}
                    handleSetFilterModal={handleSetFilterModal}
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
    height: auto;
    padding: 0 20px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
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
