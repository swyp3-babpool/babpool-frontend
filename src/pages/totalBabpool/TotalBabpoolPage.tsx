import { colors } from '@/assets/styles/theme';
import Header from '@/components/common/header';
import ProfileBox from '@/components/profile/ProfileBox';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import FilterBox from '@/components/totalBabpool/FilterBox';
import Searchbar from '@/components/totalBabpool/Searchbar';
import React from 'react';
import styled from 'styled-components';

export default function TotalBabpoolPage() {
    return (
        <TotalBabpoolPageContainer>
            <Header text='밥풀 전체보기' />
            <SearchBarContainer>
                <Searchbar value='' placeHolder='검색하기' onChange={() => {}} />
            </SearchBarContainer>
            <FilterContainer>
                <FilterBox text='구분' onClick={() => {}} />
                <FilterBox text='관심 키워드' onClick={() => {}} />
            </FilterContainer>
            <UserProfileContainer>
                <UserProfileBox>
                    <ProfileBox name='조민택' content='안녕하세요. 한줄소개 테스트' group='1학년'  />
                    <ProfileKeywords keywords={['대학', '취업', '멘토', '석사']} /> 
                </UserProfileBox>
                <UserProfileBox>
                    <ProfileBox name='조민택' content='안녕하세요. 한줄소개 테스트' group='1학년'  />
                    <ProfileKeywords keywords={['대학', '취업', '멘토', '석사']} /> 
                </UserProfileBox>
                <UserProfileBox>
                    <ProfileBox name='조민택' content='안녕하세요. 한줄소개 테스트' group='1학년'  />
                    <ProfileKeywords keywords={['대학', '취업', '멘토', '석사']} /> 
                </UserProfileBox>
                <UserProfileBox>
                    <ProfileBox name='조민택' content='안녕하세요. 한줄소개 테스트' group='1학년'  />
                    <ProfileKeywords keywords={['대학', '취업', '멘토', '석사']} /> 
                </UserProfileBox>
            </UserProfileContainer>
        </TotalBabpoolPageContainer>
    );
}

const TotalBabpoolPageContainer = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: white;
`

const SearchBarContainer = styled.div`
    width: 100%;
    padding: 15px 20px;
`

const FilterContainer = styled.div`
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 8px;
`

const UserProfileContainer = styled.section`
    width: 100%;
    height: auto;
    padding: 0 20px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const UserProfileBox = styled.div`
    width: 100%;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid ${colors.purple_light_20};
    border-radius: 8px;
`
