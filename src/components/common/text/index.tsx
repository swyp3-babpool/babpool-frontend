import styled from 'styled-components';
import { fontStyles } from '../../../assets/styles/theme';

interface TextProps {
    variant?: keyof typeof fontStyles;
    color?: string;
    styles?: any;
}

const Txt = styled.span<TextProps>`
    font-size: ${({ variant }) => (variant ? fontStyles[variant].fontSize : 'inherit')};
    font-weight: ${({ variant }) => (variant ? fontStyles[variant].fontWeight : 'inherit')};
    line-height: ${({ variant }) => (variant ? fontStyles[variant].lineHeight : 'inherit')};
    color: ${({ color }) => color || 'black'};
    ${({ styles }) => styles}
`;

export default Txt;
