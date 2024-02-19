import Button from '@/components/common/button';
import Header from '@/components/common/header';
import DivisionGroup from '@/components/signup/DivisionGroup';
import KeywordGroup from '@/components/signup/KeywordGroup';
import { useState } from 'react';
import { styled } from 'styled-components';

export interface SignUpInfo {
    division: string;
    keywordGroups: {
        university: string[]; // 대학생활
        exam: string[]; // 수험
        employment: string[]; // 취업
        graduateSchool: string[]; // 대학원
    };
}

export default function SignUpPage() {
    /**
     * 회원가입 요청 보낼 때
     * 1. oauth 로그인하면 먼저 회원의 이메일 정보가 저장된 후 구분, 키워드 데이터를 저장하는건지
     * 2. 회원가입 요청을 보낼 때 회원정보랑 구분, 키워드 데이터를 같이 보내서 회원가입 처리를 하는건지?
     * 3. 키워드 데이터는 대학생활, 수험 구분된 키워드별로 따로 배열로 보내야하는건지? 아니면 하나의 배열로 보내야하는건지?
     */

    const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
        division: '',
        keywordGroups: {
            university: [], // 대학생활
            exam: [], // 수험
            employment: [], // 취업
            graduateSchool: [], // 대학원
        },
    });

    return (
        <SignUpContainer>
            <Header text="회원가입" />
            <SignUpSection>
                <DivisionGroup signUpInfo={signUpInfo} setSignUpInfo={setSignUpInfo} />
                <KeywordGroup signUpInfo={signUpInfo} setSignUpInfo={setSignUpInfo} />
                <ButtonContainer>
                    <Button text="완료" onClick={() => {}} />
                </ButtonContainer>
            </SignUpSection>
        </SignUpContainer>
    );
}

export const SignUpContainer = styled.div`
    width: 100%;
    height: inherit;
    background-color: white;
`;

export const SignUpSection = styled.section`
    width: 100%;
    padding: 20px;
`;

export const ButtonContainer = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    position: sticky;
    display: grid;
    place-items: center;
    left: 50%;
    bottom: 0;
`;
