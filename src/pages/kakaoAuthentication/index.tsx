import { post } from '@/api/api';
import { useNavigation } from '@/hooks/useNavigation';
import React, { useEffect, useState } from 'react';

export default function KakaoAuthenticationPage() {
    const params = new URL(document.URL).searchParams;
    const code = params.get('code');
    const { goHome } = useNavigation();

    const REQUEST_URL = import.meta.env.VITE_KAKAO_OAUTH_URL;
    // 카카오에서 인가코드를 리다이렉트 url로 받음
    // 받은 인가코드로 access token을 받아야함

    useEffect(() => {
        console.log(code);
        if(!code) return;

        const requestBody = {
            client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
            client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET,
            redirect_uri: import.meta.env.VITE_REDIRECT_URI,
            code,
            grant_type: 'authorization_code',
        };

        post(REQUEST_URL, requestBody, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        }).then((res) => {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const requestBody = {
                authPlatform: 'KAKAO',
                code,
            }
            post(
                `${baseUrl}/api/user/sign/in`,
                requestBody,
                {}
            )
                .then((res) => {
                    console.log(res.kakao_account);
                    goHome();
                })
        });
    }, [code]);

    return null;
}
