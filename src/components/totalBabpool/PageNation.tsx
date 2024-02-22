import { colors } from '@/assets/styles/theme';
import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ic_left.svg';
import { ReactComponent as ArrowRight } from '@/assets/icons/ic_right.svg';

export default function PageNation() {
    const PageArr = new Array(7).fill(0);
    return (
        <PageNationContainer>
            {PageArr.map((_, index) =>
                index === 0 ? (
                    <PageButton key={index}>
                        <ArrowLeft />
                    </PageButton>
                ) : index === 4 ? (
                    <span key={index}>...</span>
                ) : index === PageArr.length - 1 ? (
                    <PageButton key={index}>
                        <ArrowRight />
                    </PageButton>
                ) : index === PageArr.length - 2 ? (
                    <PageButton key={index} isActive={false}>
                        <span>{10}</span>
                    </PageButton>
                ) : (
                    <PageButton key={index} isActive={false}>
                        <span>{index}</span>
                    </PageButton>
                )
            )}
        </PageNationContainer>
    );
}

const PageNationContainer = styled.div`
    width: 100%;
    height: 81px;
    bottom: 0;
    background-color: white;
    padding: 0 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;
const PageButton = styled.button<{ isActive?: boolean }>`
    width: 30px;
    height: 30px;
    border: 1px solid ${colors.white_20};
    border-radius: 4px;
    background-color: ${(props) => (props.isActive ? colors.purple_light_40 : colors.white)};
`;
