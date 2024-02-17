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
            {/* <Overlay>
                <Popup
                    desc="회원가입을 완료했어요!"
                    button={<Button text="확인" onClick={() => {}} />}
                />
            </Overlay> */}
            {/* <Overlay>
                <Popup
                    text="밥약을 요청했어요!!"
                    button={<Button text="확인" onClick={() => {}} />}
                />
            </Overlay> */}
            {isModalOpen && (
                <Overlay>
                    <Popup
                        text="회원가입을 완료했어요!"
                        secondText="프로필카드를 작성하러 가볼까요?"
                        button={<Button text="바로가기" onClick={() => {}} />}
                        secondButton={<Button text="나중에" type="refuse" onClick={() => {}} />}
                    />
                </Overlay>
            )}
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
