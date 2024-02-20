import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Overlay from './components/common/overlay';
import Popup from './components/common/popup';
import Button from './components/common/button';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'; // 모달이 열릴 때 스크롤 비활성화
        } else {
            document.body.style.overflow = 'auto'; // 모달이 닫힐 때 스크롤 활성화
        }
    }, [isModalOpen]);

    return (
        <Wrapper isModalOpen={isModalOpen}>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div<{isModalOpen: boolean}>`
    width: 100%;
    min-width: 375px;
    max-width: 512px;
    background-color: white;
    height: 100vh;
    position: relative;
    overflow: ${props => props.isModalOpen ? 'hidden' : 'auto'};
`;
