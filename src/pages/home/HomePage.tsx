import HomeHeader from '../../components/home/HomeHeader';
import { useState } from 'react';
import HomeMenu from '@/components/home/HomeMenu';
import styled from 'styled-components';
import HomeSection from '@/components/home/HomeSection';

export default function HomePage() {

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const handleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    return (
        <HomePageContainer>
            <HomeHeader isOpenMenu={isOpenMenu} handleMenu={handleMenu} />
            <HomeSection />
            <HomeMenu isOpenMenu={isOpenMenu} />
        </HomePageContainer>
    );
}

export const HomePageContainer = styled.section`
    width: inherit;
    height: inherit;
    position: relative;
    overflow: hidden;
`;