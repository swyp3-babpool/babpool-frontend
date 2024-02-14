import React from 'react';
import styled from 'styled-components';
import { fontStyles } from '../../../assets/styles/theme';
import { colors } from '../../../assets/styles/theme';

interface TextProps {
    variant?: keyof typeof fontStyles;
    color?: string;
}

const Txt = styled.span<TextProps>`
    font-size: ${({ variant }) => (variant ? fontStyles[variant].fontSize : 'inherit')};
    font-weight: ${({ variant }) => (variant ? fontStyles[variant].fontWeight : 'inherit')};
    line-height: ${({ variant }) => (variant ? fontStyles[variant].lineHeight : 'inherit')};
    color: ${({ color }) => color || 'black'};
`;

export default Txt;
