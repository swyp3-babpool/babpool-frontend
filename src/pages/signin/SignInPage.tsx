import { styled } from 'styled-components';
import { ReactComponent as BabpoolLogo } from '@/assets/logo/loginBabpoolLogo.svg';
import { ReactComponent as KakaoIcon } from '@/assets/icons/ic_kakao.svg';
import Txt from '@/components/common/text';
import Button from '@/components/common/button';
import { useNavigation } from '@/hooks/useNavigation';
import { KAKAO_AUTH_URL } from '@/utils/config';

export default function SignInPage() {
    const { navigate } = useNavigation();

    return (
        <SignInPageContainer>
            <BabpoolLogo />
            <TextBox>
                <Txt>간편하게 로그인하고</Txt>
                <Txt>밥풀만의 서비스를 이용해보세요!</Txt>
            </TextBox>
            <ButtonBox>
                <Button
                    text="카카오 로그인"
                    icon={<KakaoIcon />}
                    type="link"
                    url={KAKAO_AUTH_URL}
                />
            </ButtonBox>
        </SignInPageContainer>
    );
}

export const SignInPageContainer = styled.section`
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
`;

export const ButtonBox = styled.div`
    width: 100%;
    max-width: 375px;
`;

export const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 20px;
`;
