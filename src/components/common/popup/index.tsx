import React from 'react';
import styled from 'styled-components';

type PopupProps = {
    desc: string; // 팝업 내용
    button: React.ReactNode; // 팝업 버튼
};

export default function Popup({ desc, button }: PopupProps) {
    return (
        <PopupWrapper>
            <PopupText>{desc}</PopupText>
            {button}
            <CloseButton src="/icon/ic_close.svg" alt="닫기 버튼" width={40} height={40} />
        </PopupWrapper>
    );
}

export const PopupWrapper = styled.div`
    width: 335px;
    height: 190px;
    padding: 0 18px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #D2C3F9;
    border-radius: 20px;
    background-color: white;
    gap: 40px;
`;

export const PopupText = styled.p`
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
`;

export const CloseButton = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;
