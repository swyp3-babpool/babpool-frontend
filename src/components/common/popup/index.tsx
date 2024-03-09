import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '@/assets/icons/ic_close.svg';
import Txt from '../text';

type PopupProps = {
    text: string; // 팝업 내용
    secondText?: string; // 팝업 내용
    button: React.ReactNode; // 팝업 버튼
    secondButton?: React.ReactNode; // 팝업 버튼
    closePopup: () => void;
};

export default function Popup({ text, secondText, button, secondButton, closePopup }: PopupProps) {
    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    return (
        <PopupWrapper>
            <PopupTextContainer>
                <Txt variant="h4">{text}</Txt>
                {secondText && <Txt variant="h4">{secondText}</Txt>}
            </PopupTextContainer>
            <ButtonContainer>
                {button}
                {secondButton && secondButton}
            </ButtonContainer>
            <IconBox onClick={closePopup}>
                <CloseButton />
            </IconBox>
        </PopupWrapper>
    );
}

export const PopupWrapper = styled.div`
    width: 335px;
    height: 200px;
    padding: 0 18px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #d2c3f9;
    border-radius: 20px;
    background-color: white;
    gap: 40px;
`;

export const PopupTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 20px;
`;

export const ButtonContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    gap: 12px;
    position: absolute;
    bottom: 20px;
`;

export const CloseButton = styled(CloseIcon)``;

export const IconBox = styled.div`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
`;
