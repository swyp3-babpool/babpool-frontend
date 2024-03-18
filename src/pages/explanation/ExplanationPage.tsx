import Header from '@/components/common/header';
import { styled } from 'styled-components';
import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { alarmInfoState } from '@/atom/alarminfo';
import AlarmModal from '@/components/common/alarm/AlarmModal';

const C_FirstSection = React.lazy(() => import('@/components/explanation/C_FirstSection'));
const C_SecondSection = React.lazy(() => import('@/components/explanation/C_SecondSection'));
const C_ThirdSection = React.lazy(() => import('@/components/explanation/C_ThirdSection'));
const C_FourthSection = React.lazy(() => import('@/components/explanation/C_FourthSection'));

export default function ExplanationPage() {
    const alarmInfo = useRecoilValue(alarmInfoState);

    return (
        <Suspense fallback={null}>
            <ExplanationContainer>
                <Header text="밥풀이란?" destination="/" />
                <C_FirstSection />
                <C_SecondSection />
                <C_ThirdSection />
                <C_FourthSection />
                {(alarmInfo.messageType) && (
                    <AlarmModal
                        messageType={alarmInfo.messageType}
                    />
                )}
            </ExplanationContainer>
        </Suspense>
    );
}

export const ExplanationContainer = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;
