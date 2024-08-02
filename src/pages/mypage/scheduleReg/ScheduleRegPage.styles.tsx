import { colors } from '@/assets/styles/theme';
import React from 'react';
import { styled } from 'styled-components';

export const ScheduleRegPageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
`;

export const AddPossibleTimeButton = styled.button<{ isExist: boolean }>`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: ${(props) =>
        props.isExist ? `1px solid ${colors.purple_light_40}` : `1px dashed ${colors.black}`};
    cursor: pointer;
`;


