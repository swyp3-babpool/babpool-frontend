import { signInRequest } from '@/api/auth/auth';
import { useNavigation } from '@/hooks/useNavigation';
import { SignInRequestDataType } from '@/interface/api/authType';
import React, { useEffect } from 'react';

export default function KakaoAuthenticationPage() {
    const params = new URL(document.URL).searchParams;
    const code = params.get('code');
    const { goHome, navigate } = useNavigation();

    // 카카오에서 인가코드를 리다이렉트 url로 받음
    // 받은 인가코드로 access token을 받아야함

    useEffect(() => {
        if (!code) return;
        const requestBody: SignInRequestDataType = {
            authPlatform: 'KAKAO',
            code,
        };
        signInRequest(requestBody).then((res) => {
            console.log(res);
            const accessToken = res.data.accessToken;
            if (res.status === 'UNAUTHORIZED' && res.code === 401) {
                navigate(`/sign/in?uuid=${res.data.userUuid}`);
                return;
            }
            console.log(res.code)
            if (res.code === 200) {
                console.log('로그인 성공.')
                localStorage.setItem('accessToken', String(accessToken));
            }
            goHome();
        });
    }, [code]);

    return null;
}
