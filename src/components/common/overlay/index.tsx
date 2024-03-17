import React from 'react';
import styled from 'styled-components';

export default function Overlay({
    children,
    onClick,
}: {
    children?: React.ReactNode;
    onClick?: () => void;
}) {
    return <OverayWrapper onClick={onClick}>{children}</OverayWrapper>;
}

export const OverayWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(122, 122, 122, 0.7);
    display: grid;
    place-items: center;
`;
