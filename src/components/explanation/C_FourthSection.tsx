import React from 'react';
import Txt from '../common/text';
import { styled } from 'styled-components';
import { HOW_TO_USE_LIST } from '@/utils/constant';
import HowToUseCard from './HowToUseCard';
import { colors } from '@/assets/styles/theme';

export default function C_FourthSection() {
    return (
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
    );
}

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
