import { signUpRequest } from '@/api/auth/auth';
import Button from '@/components/common/button';
import Header from '@/components/common/header';
import Overlay from '@/components/common/overlay';
import Popup from '@/components/common/popup';
import DivisionGroup from '@/components/signup/DivisionGroup';
import KeywordGroup from '@/components/signup/KeywordGroup';
import { useNavigation } from '@/hooks/useNavigation';
import { getDivisionId, getKeywordId } from '@/utils/util';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const { uuid } = useParams();
    const { handleNavigate } = useNavigation();

    const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
        division: '',
        keywordGroups: {
            university: [], // 대학생활
            exam: [], // 수험
            employment: [], // 취업
            graduateSchool: [], // 대학원
        },
    });

    const [completePopupOpen, setCompletePopupOpen] = useState(false);
    const [isSignUpError, setIsSignUpError] = useState(false);

    const handleSignUp = () => {
        // uuid가 없을 때 에러 발생
        if (!uuid) {
            setIsSignUpError(true);
        }
        const signUpRequestBody = {
            userUuid: uuid as string,
            userGrade: getDivisionId(signUpInfo.division) as string,
            keywords: Object.values(signUpInfo.keywordGroups).flat().map((keyword) => getKeywordId(keyword)),
        };
        console.log(signUpRequestBody)
        signUpRequest(signUpRequestBody)
        .then((res) => {
            if(res.code === 200) {
                console.log(res)
                setCompletePopupOpen(true);
                localStorage.setItem('accessToken', res.data.accessToken);
            }
        }).catch(console.error)
    };

    const signUpValidateCheck = () => {
        const { division, keywordGroups } = signUpInfo;
        const keywordArrays = Object.values(keywordGroups);
        const keywordTotalLength = keywordArrays.reduce((acc, curr) => acc + curr.length, 0);
        return division && keywordTotalLength > 0 ? true : false;
    };

    // uuid가 없을 경우 다시 로그인 페이지로 이동
    const handleErrorClose = () => {
        handleNavigate('/signin');
        setIsSignUpError(false);
    };

    return (
        <>
            <SignUpContainer>
                <Header text="회원가입" />
                <SignUpSection>
                    <DivisionGroup signUpInfo={signUpInfo} setSignUpInfo={setSignUpInfo} />
                    <KeywordGroup signUpInfo={signUpInfo} setSignUpInfo={setSignUpInfo} />
                    <ButtonContainer>
                        <Button
                            text="완료"
                            disabled={!signUpValidateCheck()}
                            type={signUpValidateCheck() ? 'accept' : 'refuse'}
                            onClick={handleSignUp}
                        />
                    </ButtonContainer>
                </SignUpSection>
            </SignUpContainer>
            {completePopupOpen && (
                <Overlay>
                    <Popup
                        text="회원가입을 완료했어요!"
                        secondText="프로필카드를 작성하러 가볼까요?"
                        button={<Button text="바로가기" onClick={() => handleNavigate('/mypage/profile-modify')} />}
                        secondButton={
                            <Button text="나중에" type="refuse" onClick={() => handleNavigate('/')} />
                        }
                        closePopup={() => setCompletePopupOpen(false)}
                    />
                </Overlay>
            )}
            {isSignUpError && (
                <Overlay>
                    <Popup
                        text="잘못된 접근입니다"
                        secondText="다시 로그인해주세요."
                        button={<Button text="확인" onClick={handleErrorClose} />}
                        closePopup={() => setCompletePopupOpen(false)}
                    />
                </Overlay>
            )}
        </>
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
