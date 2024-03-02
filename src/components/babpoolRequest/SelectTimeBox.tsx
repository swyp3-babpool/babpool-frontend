import React from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import { colors } from '@/assets/styles/theme';

type SelectTimeBoxProps = {
    timeText: string;
}

export default function SelectTimeBox({timeText}: SelectTimeBoxProps) {
    return (
        <SelectTimeBoxContainer>
            <Txt variant='caption3'>{timeText}</Txt>
        </SelectTimeBoxContainer>
    );
}

const SelectTimeBoxContainer = styled.div`
    width: 100%;
    height: 50px;
    padding: 15px 16px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
    background-color: white;
    &:hover {
        border: 2px solid ${colors.purple_light_40};
    }
`

