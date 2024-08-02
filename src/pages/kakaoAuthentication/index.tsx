import { signInRequest } from '@/api/auth/auth';
import { searchInfoState } from '@/atom/searchInfoStore';
import { useNavigation } from '@/hooks/useNavigation';
import { SignInRequestDataType } from '@/interface/api/authType';
import { getDivisionName } from '@/utils/util';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export default function KakaoAuthenticationPage() {
    const params = new URL(document.URL).searchParams;
    const code = params.get('code');
    const { goHome, navigate } = useNavigation();
    const setSearchInfoState = useSetRecoilState(searchInfoState);

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
            if (res.code === 500) {
                alert('서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
                navigate('signin');
                console.error(res.message);
                return;
            }
            if (res.status === 'UNAUTHORIZED' && res.code === 401) {
                navigate(`/signup/${res.data.userId}`);
                return;
            }
            console.log(res.code);
            if (res.code === 200) {
                console.log('로그인 성공.');
                const accessToken = res.data.accessToken;
                const grade = [getDivisionName(res.data.userGrade)] as string[];
                localStorage.setItem('accessToken', String(accessToken));
                localStorage.setItem('userId', res.data.userId);
                setSearchInfoState((prev) => ({
                    ...prev,
                    division: grade,
                }));
            }
            goHome();
        });
    }, [code]);

    return null;
}
