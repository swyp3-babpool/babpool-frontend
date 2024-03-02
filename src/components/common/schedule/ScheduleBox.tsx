import React from 'react';
import { styled } from 'styled-components';
import Txt from '../text';
import { ReactComponent as FilterIcon } from '@/assets/icons/ic_filter_arrow.svg';

type ScheduleBoxProps = {
    defaultText: string;
    selectText?: string;
    onClick?: () => void;
};

export default function ScheduleBox({ defaultText, selectText, onClick }: ScheduleBoxProps) {
    return (
        <ScheduleBoxContainer onClick={onClick}>
            {selectText ? (
                <Txt variant="caption1">{selectText}</Txt>
            ) : (
                <Txt variant="caption1">{defaultText}</Txt>
            )}
            <FilterIcon />
        </ScheduleBoxContainer>
    );
}

const ScheduleBoxContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
`;
