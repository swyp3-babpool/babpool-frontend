import React from 'react';
import styled from 'styled-components';
import {ReactComponent as FilterArrowIcon} from '@/assets/icons/ic_filter_arrow.svg';
import Txt from '../common/text';
import { colors } from '@/assets/styles/theme';

type FilterBoxProps = {
    text: string;
    filterLength: number;
    onClick: () => void;
}

export default function FilterBox({text, filterLength, onClick}: FilterBoxProps) {
    console.log(filterLength)
    const isLength = filterLength > 0;
    return (
        <FilterBoxContainer isLength={isLength} onClick={onClick}>
            <Txt variant='caption2' color={isLength ? colors.purple_light_20 : ''}>{text}</Txt>
            {
                filterLength > 0 && <Txt variant='caption2' color={colors.purple_light_20}>{filterLength}</Txt>
            }
            <FilterArrowIcon />
        </FilterBoxContainer>
    );
}

const FilterBoxContainer = styled.div<{isLength: boolean}>`
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    border-radius: 30px;
    border: 1px solid ${colors.white_20};
    cursor: pointer;
`

