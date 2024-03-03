import { colors } from '@/assets/styles/theme';
import React from 'react';
import { styled } from 'styled-components';

type DividerProps = {
    width?: string;
    height?: string;
    bgColor?: string;
}

export default function Divider({width='100%', height='1px', bgColor='black'}: DividerProps) {
    return <S_Divider width={width} height={height} bgColor={bgColor} />
}

const S_Divider = styled.div<DividerProps>`
    width: ${({width}) => width};
    height: ${({height}) => height};
    background-color: ${({bgColor}) => bgColor};
`

