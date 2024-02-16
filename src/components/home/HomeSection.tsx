import styled from 'styled-components';
import Txt from '../common/text';
import C_Banner from '@/assets/banner/testBanner.jpg';
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
                                <Txt variant={'h3'} color={colors.blue_light_40}>
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
`;

export const GroupSection = styled.div`
    width: inherit;
    height: 70%;
    padding: 50px 38px;
    display: grid;
    place-items: center;
`;

export const GroupContainer = styled.div`
    width: inherit;
    height: 100%;
    display: grid;
    grid-template-columns: 140px 140px;
    grid-template-rows: 160px 160px;
    grid-column: 1fr 1fr;
    grid-row: 1fr 1fr;
    gap: 20px;
    place-items: center;
    justify-content: center;
`;

export const GroupBox = styled.div`
    width: 140px;
    height: 160px;
    display: grid;
    place-items: center;
    border: 1px solid ${colors.blue_light_20};
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        transition: 0.2s;
    }
`;
