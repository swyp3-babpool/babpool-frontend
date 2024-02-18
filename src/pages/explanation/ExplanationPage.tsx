import { colors } from '@/assets/styles/theme';
import Header from '@/components/common/header';
import Txt from '@/components/common/text';
import { styled } from 'styled-components';
import WorthCard from '@/components/explanation/WorthCard';
import { HOW_TO_USE_LIST, WORTH_LIST } from '@/utils/constant';
import HowToUseCard from '@/components/explanation/HowToUseCard';

export default function ExplanationPage() {
    return (
        <ExplanationContainer>
            <Header text="밥풀이란?" />
            <FirstSection>
                <TitleBox>
                    <Txt style={{ fontWeight: 700, fontSize: '40px' }}>밥풀과 함께하는</Txt>
                    <Txt style={{ fontWeight: 700, fontSize: '40px' }}>즐거운 대학생활</Txt>
                </TitleBox>
                <div></div>
                <DescBox>
                    <Txt style={{ fontSize: '15px', fontWeight: 400, lineHeight: '24px' }}>
                        대학 내에서 학생들 간의 연결을 경험하고
                    </Txt>
                    <Txt style={{ fontSize: '15px', fontWeight: 400, lineHeight: '24px' }}>
                        더 행복하고 의미있는 대학생활을 꾸려가도록 도와주는
                    </Txt>
                    <Txt style={{ fontSize: '15px', fontWeight: 400, lineHeight: '24px' }}>
                        밥풀 서비스에 대해 알아보세요.
                    </Txt>
                </DescBox>
            </FirstSection>
            <SecondSection>
                <Txt
                    color={colors.white}
                    style={{ fontSize: '20px', fontWeight: 700, lineHeight: '30px' }}
                >
                    YOUR MEANINGFUL CAMPUS LIFE, OUR MISSION
                </Txt>
                <Txt
                    color={colors.white}
                    style={{
                        fontSize: '15px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        marginTop: '30px',
                    }}
                >
                    밥풀은 대학 구성원들을 위한 온라인 네트워킹 플랫폼이에요. 취업과 진로 준비에
                    필요한 정보뿐만 아니라 다양한 경험을 공유하며 학생들이 함께 성장할 수 있는
                    공간을 추구해요.
                </Txt>
                <Txt
                    color={colors.white}
                    style={{
                        fontSize: '15px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        marginTop: '16px',
                    }}
                >
                    학생들이 대학이라는 장소에서 서로에게 친절하고 따뜻한 관계를 이어갈 수 있도록
                    돕고 싶어요.
                </Txt>
            </SecondSection>
            <ThirdSection>
                <Txt style={{ fontSize: '20px', fontWeight: 700, lineHeight: '30px' }}>
                    밥풀은 유익한 가치를 전해요
                </Txt>
                <WorthCardContainer>
                    {WORTH_LIST.map((worth) => (
                        <WorthCard
                            key={worth.title}
                            title={worth.title}
                            desc={worth.desc}
                            sDesc={worth.sDesc && worth.sDesc}
                            imgSrc={worth.imgSrc}
                            alt={worth.title}
                        />
                    ))}
                </WorthCardContainer>
            </ThirdSection>
            <FourthSection>
                <Txt style={{ fontSize: '20px', fontWeight: 700, lineHeight: '30px' }}>
                    더 똑똑한 밥풀 사용법
                </Txt>
                <FourthSectionSubTitleBox>
                    <Txt variant="caption2">이 방법만 따라가도 더 많은 교내 구성원들과</Txt>
                    <Txt variant="caption2">밥 한 끼로 연결되는 따뜻한 경험을 할 수 있어요.</Txt>
                    <HowToUseCardContainer>
                        {HOW_TO_USE_LIST.map((card) => (
                            <HowToUseCard
                                key={card.title}
                                title={card.title}
                                desc={card.desc}
                                imgSrc={card.imgSrc}
                                alt={card.title}
                            />
                        ))}
                    </HowToUseCardContainer>
                </FourthSectionSubTitleBox>
            </FourthSection>
        </ExplanationContainer>
    );
}

export const ExplanationContainer = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
`;

export const TitleBox = styled.div`
    width: 100%;
    padding: 0 61px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FirstSection = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 80px 0;
`;

export const DescBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SecondSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 21px;
    background-color: ${colors.purple_light_40};
`;

export const ThirdSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 22px;
`;

export const WorthCardContainer = styled.div`
    width: 100%;
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto;
    place-items: center;
    overflow-y: auto;

    :nth-child(1) {
        grid-column: span 2;
    }
`;

export const FourthSection = styled.section`
    width: 100%;
    padding: 70px 19px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${colors.purple_light_10};
`;

export const FourthSectionSubTitleBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
`;

export const HowToUseCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
`;
