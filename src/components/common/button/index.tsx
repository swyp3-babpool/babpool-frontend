import { colors } from '@/assets/styles/theme';
import styled from 'styled-components';
import Txt from '../text';

<<<<<<< Updated upstream
type ButtonProps = {text: string, width?: string, type?: 'accept' | 'refuse', disabled?:boolean, icon?: any, onClick: () => void}

export default function Button({text, width = '100%', type = 'accept', icon, disabled=false,  onClick}: ButtonProps) {
=======
type ButtonProps = {
    text: string;
    width?: string;
    type?: 'accept' | 'refuse';
    icon?: any;
    onClick: () => void;
};

export default function Button({
    text,
    width = '100%',
    type = 'accept',
    icon,
    onClick,
}: ButtonProps) {
>>>>>>> Stashed changes
    return (
        <ButtonWrapper width={width} type={type} disabled={disabled} onClick={onClick}>
            {icon && icon}
            <Txt variant="button" color={type === 'accept' ? 'white' : colors.purple_light_40}>
                {text}
            </Txt>
        </ButtonWrapper>
    );
}

export const ButtonWrapper = styled.button<{ width: string; type: string }>`
    width: ${(props) => props.width};
    min-width: 145px;
    max-width: 375px;
    height: 48px;
    background-color: ${(props) =>
        props.type === 'accept' ? colors.purple_light_40 : colors.purple_light_10};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
<<<<<<< Updated upstream
    cursor: ${props => props.type === 'accept' ? 'pointer' : 'default'};
`

export const ButtonText = styled.p<{type: string}>`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.type === 'accept' ? colors.white : colors.purple_light_40};
=======
    cursor: pointer;
>>>>>>> Stashed changes
`;

export const ButtonText = styled.p<{ type: string }>`
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) => (props.type === 'accept' ? colors.white : colors.purple_light_40)};
`;
