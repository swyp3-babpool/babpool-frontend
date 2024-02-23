import React from 'react';
import { styled } from 'styled-components';
import Txt from '../text';
import {ReactComponent as UserIcon} from '@/assets/icons/ic_user.svg';
import { colors } from '@/assets/styles/theme';

export default function Review() {
    return (
        <ReviewBox>
                <UserIcon />
            <ReviewTextBox>
                <Txt variant='caption1'>최고의 컨설팅을 해주셔서 감사합니다ㅠㅜ!!</Txt>
            </ReviewTextBox>
        </ReviewBox>
    );
}

const ReviewBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 9px;
`

const ReviewTextBox = styled.div`
    width: 100%;
    height: 42px;
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: ${colors.white_10};
    border-radius: 8px;
`