import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/assets/styles/theme';
import Txt from '@/components/common/text';
import Header from '@/components/common/header';
import { Col, Row } from '@/components/common/flex/Flex';
import ProfileBox from '@/components/profile/ProfileBox';
import Button from '@/components/common/button';
import { RejectPageContainer } from './RejectPage.styles';

export default function RejectPage() {
    const navigate = useNavigate();
    return (
        <RejectPageContainer>
            <Header text="다음에요" />
        </RejectPageContainer>
    );
}
