import { colors } from '@/assets/styles/theme';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as DropDownIcon } from '@/assets/icons/ic_down_arrow.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/ic_select.svg';

type SelectInputProps = {
    optionData: { key: number; value: string }[];
    initialValue: string;
    onValueChange?: (value: string) => void;
};

export default function SelectInput({ optionData, initialValue, onValueChange }: SelectInputProps) {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [showOptions, setShowOptions] = useState(false);

    const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLLIElement;
        const newValue = target.dataset.value || '';
        setCurrentValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <SelectBox show={showOptions} onClick={() => setShowOptions((prev) => !prev)}>
            <Label>{currentValue}</Label>
            <SelectOptions count={optionData.length} show={showOptions}>
                {optionData.map((data) => (
                    <Option
                        key={data.key}
                        data-value={data.value}
                        onClick={handleOnChangeSelectValue}
                        selected={currentValue === data.value}
                    >
                        {data.value}
                        <CheckIcon />
                    </Option>
                ))}
            </SelectOptions>
            <DropDown>
                <DropDownIcon style={{ transform: showOptions ? 'none' : 'rotate(180deg)' }} />
            </DropDown>
        </SelectBox>
    );
}

const SelectBox = styled.div<{ show: boolean }>`
    position: relative;
    width: 38.4%;
    height: 36px;
    padding: 8px 12px 6px;
    border-radius: 8px;
    background-color: #ffffff;
    border: 1px solid ${(props) => (props.show ? colors.purple_light_20 : colors.black)};
    align-self: center;
    cursor: pointer;
`;

const DropDown = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 12px;
    width: 13px;
    height: 10px;
    top: 50%;
    transform: translateY(-50%);
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: ${colors.white_90};
`;
const SelectOptions = styled.ul<{ show: boolean; count: number }>`
    z-index: 1;
    position: absolute;
    list-style: none;
    left: 0;
    width: 100%;
    overflow: hidden;
    margin: 12px 0 0;
    height: ${(props) => props.count * 34 + 16}px;
    max-height: ${(props) => (props.show ? 'none' : '0')};
    padding: ${(props) => (props.show ? '8px 2px' : '0')};
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.12);
    background-color: ${colors.white};
    color: ${colors.white_90};
`;
const Option = styled.li<{ selected: boolean }>`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between; // CheckIcon을 오른쪽에 위치시키기 위해
    font-size: 14px;
    padding: 6px 12px;
    height: 34px;
    font-weight: 400;
    border-radius: 2px;
    &:hover {
        background-color: ${colors.white_10};
    }
    svg {
        display: ${(props) => (props.selected ? 'block' : 'none')};
    }
`;
