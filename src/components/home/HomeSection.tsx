import styled from 'styled-components';
import Txt from '../common/text';
import C_Banner from '@/assets/banner/banner.png';
import { colors } from '@/assets/styles/theme';

export default function HomeSection() {
    const MAIN_GROUP = ['대학생활', '취업', '대학원', '수험'];
    return (
        <HomeContainer>
            <BannerImage src={C_Banner} alt='testBanner' />
            <GroupSection>
                <GroupContainer>
                    {MAIN_GROUP.map((group, index) => {
                        return (
                            <GroupBox key={index}>
                                <Txt variant={'h3'} color={colors.purple_light_40}>
                                    {group}
                                </Txt>
                            </GroupBox>
                        );
                    })}
                </GroupContainer>
            </GroupSection>
        </HomeContainer>
    );
}

export const HomeContainer = styled.section`
    width: inherit;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

export const BannerImage = styled.img`
    width: inherit;
    height: 30%;
    min-height: 235px;
`;

export const GroupSection = styled.div`
    width: inherit;
    height: 70%;
    min-height: 400px;
    max-height: 500px;
    padding: 50px 38px;
    display: grid;
    place-items: center;
`;

export const GroupContainer = styled.div`
    width: inherit;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column: 1fr 1fr;
    grid-row: 1fr 1fr;
    gap: 20px;
    place-items: center;
    justify-content: center;
`;

export const GroupBox = styled.div`
width: 100%;
height: 100%;
    min-width: 140px;
    min-height: 160px;
    display: grid;
    place-items: center;
    border: 2px solid ${colors.purple_light_20};
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        transition: 0.2s;
    }
`;
