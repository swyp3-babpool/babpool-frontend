import { colors } from '@/assets/styles/theme';
import styled from 'styled-components';
import Txt from '../text';

type ButtonProps = {
    text: string;
    width?: string;
    type?: 'accept' | 'refuse' | 'link';
    disabled?: boolean;
    icon?: any;
    url?: string;
    onClick?: () => void;
};

export default function Button({
    text,
    width = '100%',
    type = 'accept',
    icon,
    url,
    disabled = false,
    onClick = () => {},
}: ButtonProps) {
    return (
        <ButtonWrapper width={width} type={type} disabled={disabled} onClick={onClick}>
            {type === 'link' ? (
                <LinkButtonText href={url}>
                    {icon && icon}
                    <Txt variant="button" color={colors.white}>
                        {text}
                    </Txt>
                </LinkButtonText>
            ) : (
                <>
                    {icon && icon}
                    <Txt
                        variant="button"
                        color={type === 'accept' ? 'white' : colors.purple_light_40}
                    >
                        {text}
                    </Txt>
                </>
            )}
        </ButtonWrapper>
    );
}

export const ButtonWrapper = styled.button<{ width: string; type: string }>`
    width: ${(props) => props.width};
    min-width: 145px;
    height: 48px;
    background-color: ${(props) =>
        props.type === 'accept' || props.type === 'link'
            ? colors.purple_light_40
            : colors.purple_light_10};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    cursor: ${(props) => (props.type === 'accept' ? 'pointer' : 'default')};
`;

export const ButtonText = styled.p<{ type: string }>`
    font-size: 1rem;
    font-weight: 500;
    color: ${(props) =>
        props.type === 'accept' || props.type === 'link' ? colors.white : colors.purple_light_40};
`;

const LinkButtonText = styled.a`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;
