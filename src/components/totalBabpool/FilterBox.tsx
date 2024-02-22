import React from 'react';
import styled from 'styled-components';
import {ReactComponent as FilterArrowIcon} from '@/assets/icons/ic_filter_arrow.svg';
import Txt from '../common/text';
import { colors } from '@/assets/styles/theme';

type FilterBoxProps = {
    text: string;
    onClick: () => void;
}

export default function FilterBox({text, onClick}: FilterBoxProps) {
    return (
        <FilterBoxContainer onClick={onClick}>
            <Txt variant='caption2'>{text}</Txt>
            <FilterArrowIcon />
        </FilterBoxContainer>
    );
}

const FilterBoxContainer = styled.div`
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    border-radius: 30px;
    border: 1px solid ${colors.white_20};
    cursor: pointer;
`

