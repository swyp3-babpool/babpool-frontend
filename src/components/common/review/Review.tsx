import React from 'react';
import { styled } from 'styled-components';
import Txt from '../text';
import { ReactComponent as UserIcon } from '@/assets/icons/ic_user.svg';
import { colors } from '@/assets/styles/theme';

export default function Review({ text }: { text: string }) {
    return (
        <ReviewBox>
            <UserIcon />
            <ReviewTextBox>
                <Txt variant="caption1">{text}</Txt>
            </ReviewTextBox>
        </ReviewBox>
    );
}

const ReviewBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 9px;
`;

const ReviewTextBox = styled.div`
    width: 100%;
    height: auto;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: ${colors.white_10};
    border-radius: 8px;
`;
