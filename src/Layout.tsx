import React from 'react';
import styled from 'styled-components';

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    min-width: 375px;
    max-width: 550px;
    margin: 0 auto;
`

