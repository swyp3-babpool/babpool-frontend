import HomeHeader from '../../components/home/HomeHeader';
import { useEffect, useState } from 'react';
import HomeMenu from '@/components/home/HomeMenu';
import styled from 'styled-components';
import HomeSection from '@/components/home/HomeSection';
import { useSetRecoilState } from 'recoil';
import { searchInfoState } from '@/atom/searchInfoStore';
import { INIT_INTEREST_KEYWORD } from '@/utils/constant';

export default function HomePage() {

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const setSearchInfo = useSetRecoilState(searchInfoState)

    const handleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    useEffect(() => {
        setSearchInfo((prev) => ({...prev, page: 0, searchText: '', prevFilterKeyword: INIT_INTEREST_KEYWORD}))
    }, [])

    return (
        <HomePageContainer>
            <HomeHeader isOpenMenu={isOpenMenu} handleMenu={handleMenu} />
            <HomeSection />
            <HomeMenu isOpenMenu={isOpenMenu} handleMenu={handleMenu}  />
        </HomePageContainer>
    );
}

export const HomePageContainer = styled.section`
    width: inherit;
    height: inherit;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
`;