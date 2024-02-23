import React, { useEffect } from 'react';

export default function KakaoAuthenticationPage() {
    const params = new URL(document.URL).searchParams;
    const code = params.get('code');

    useEffect(() => {
        
    }, [])

    return null
}

