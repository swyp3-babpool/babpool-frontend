import { styled } from 'styled-components';
import { ReactComponent as BabpoolLogo } from '@/assets/logo/loginBabpoolLogo.svg';
import { ReactComponent as KakaoIcon } from '@/assets/icons/ic_kakao.svg';
import Txt from '@/components/common/text';
import Button from '@/components/common/button';
import { useNavigation } from '@/hooks/useNavigation';

export default function SignInPage() {
    
    const { navigate } = useNavigation();
    


    return (
        <SignInPageContainer>
            <BabpoolLogo />
            <TextBox>
                <Txt>간편하게 로그인하고</Txt>
                <Txt>밥풀만의 서비스를 이용해보세요!</Txt>
            </TextBox>
            <Button text='카카오 로그인' icon={<KakaoIcon /> } onClick={() => navigate('/')} />
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

export const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    font-size: 20px;
`;
