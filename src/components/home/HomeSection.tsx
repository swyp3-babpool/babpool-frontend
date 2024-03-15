import styled from 'styled-components';
import Txt from '../common/text';
import C_Banner from '@/assets/banner/banner.png';
import C_Banner_2 from '@/assets/banner/banner2.png';
import { colors } from '@/assets/styles/theme';
import { CarouselProvider } from '../carousel/Carousel';
import { Link } from 'react-router-dom';
import { useNavigation } from '@/hooks/useNavigation';

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

    const { handleNavigate } = useNavigation();
    return (
        <HomeContainer>
            <CarouselContainer>
                <CarouselProvider>
                    <BannerImage
                        src={C_Banner}
                        alt="testBanner"
                        onClick={() => handleNavigate('/explanation')}
                    />
                    {/* TODO: 노션 디자인 완료되면 연결 */}
                    <LinkBox href="https://www.notion.so/yazii-village/cae8f69344654808a2e0ec2ac43426ee" target="_blank">
                        <BannerImage src={C_Banner_2} alt="testBanner" />
                    </LinkBox>
                </CarouselProvider>
            </CarouselContainer>
            <GroupSection>
                <CategoryTitle>
                    <Txt variant='h4'>밥풀러 카테고리</Txt>
                </CategoryTitle>
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

export const CategoryTitle = styled.div`
    width: 100%;
`;

export const GroupSection = styled.div`
    width: 100%;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 23px;
    margin-top: 25px;
`;

export const GroupContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
    place-items: center;
    justify-content: center;
`;

export const GroupBox = styled(Link)`
    width: 100%;
    aspect-ratio: 1 / 1;
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

export const LinkBox = styled.a``;
