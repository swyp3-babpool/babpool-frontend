import React from 'react';
import Txt from '../common/text';
import { colors } from '@/assets/styles/theme';
import { styled } from 'styled-components';

export default function C_SecondSection() {
    return (
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
    );
}

export const SecondSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 21px;
    background-color: ${colors.purple_light_40};
`;
