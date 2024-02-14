import styled from 'styled-components';

type ButtonProps = {desc: string, width?: string, onClick: () => void}

export default function Button({desc, width = '100%', onClick}: ButtonProps) {
    return (
        <ButtonWrapper width={width} onClick={onClick}>
            <ButtonText>{desc}</ButtonText>
        </ButtonWrapper>
    );
}

export const ButtonWrapper = styled.button<{ width?: string }>`
    width: ${props => props.width};
    height: 48px;
    background-color: #9170F7;
    display: grid;
    place-items: center;
    border-radius: 8px;
    cursor: pointer;
`

export const ButtonText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: white;
`;

