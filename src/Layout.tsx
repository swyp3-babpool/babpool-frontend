import React from 'react';
import styled from 'styled-components';
import Overlay from './components/common/overlay';
import Popup from './components/common/popup';
import Button from './components/common/button';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Wrapper>
            {children}
            {/* <Overlay>
                <Popup
                    desc="회원가입을 완료했어요!"
                    button={<Button desc="확인" onClick={() => {}} />}
                />
            </Overlay> */}
            {/* <Overlay>
                <Popup
                    desc="밥약을 요청했어요!!"
                    button={<Button desc="확인" onClick={() => {}} />}
                />
            </Overlay> */}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    min-width: 375px;
    max-width: 512px;
    height: 100vh;
    position: relative;
`;
