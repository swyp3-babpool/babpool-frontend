import styled from 'styled-components';
import Txt from '../common/text';
import C_Banner from '@/assets/banner/banner.png';
import C_Banner_2 from '@/assets/banner/banner2.png';
import { colors } from '@/assets/styles/theme';
import { CarouselProvider } from '../carousel/Carousel';
import { Link } from 'react-router-dom';

export default function HomeSection() {
    const MAIN_GROUP = [
        {
            text: '대학생활',
            url: 'total?groupName=university',
        },
        {
            text: '취업',
            url: 'total?groupName=employment',
        },
        {
            text: '대학원',
            url: 'total?groupName=graduateSchool',
        },
        {
            text: '수험',
            url: 'total?groupName=exam',
        },
    ];
    return (
        <HomeContainer>
            <CarouselContainer>
                <CarouselProvider>
                    <BannerImage src={C_Banner} alt="testBanner" />
                    <BannerImage src={C_Banner_2} alt="testBanner" />
                </CarouselProvider>
            </CarouselContainer>
            <GroupSection>
                <GroupContainer>
                    {MAIN_GROUP.map((group, index) => {
                        return (
                            <GroupBox key={index} to={group.url}>
                                <Txt variant={'h3'} color={colors.purple_light_40}>
                                    {group.text}
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

const CarouselContainer = styled.div`
    width: 100%;
    padding: 0 20px;
    border-radius: 10px;
`;

export const BannerImage = styled.img`
    width: inherit;
    height: 30%;
    min-height: 235px;
    border-radius: 10px;
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

export const GroupBox = styled(Link)`
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
        background-color: ${colors.purple_light_20};
        transition: 0.2s;

        & ${Txt} {
            color: white; // 흰색으로 변경
        }
    }
`;
