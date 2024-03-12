import { useNavigation } from '@/hooks/useNavigation';
import React, { useEffect } from 'react';

export default function AuthRoute({ children }: { children: React.ReactNode }) {
    const { authCheck } = useNavigation();

    useEffect(() => {
        authCheck();
    }, []);

    return <>{children}</>;
}
