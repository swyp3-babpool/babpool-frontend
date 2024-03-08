import { colors } from '@/assets/styles/theme';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '@/assets/icons/ic_search.svg';

type SearchbarProps = {
    value: string;
    placeHolder?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function Searchbar({ value, placeHolder = '', inputRef, onChange, onKeyDown }: SearchbarProps) {
    return (
        <SearchbarBox>
            <IconBox>
                <SearchIcon />
            </IconBox>
            <SearchbarInput value={value} placeholder={placeHolder} ref={inputRef} onChange={onChange} onKeyDown={onKeyDown} />
        </SearchbarBox>
    );
}

const SearchbarBox = styled.div`
    width: 100%;
    height: 40px;
    padding: 9px 16px;
    border: 1px solid ${colors.white_50};
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 2px;
`;

const SearchbarInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    &::placeholder {
        color: ${colors.white_20};
        font-size: 14px;
        line-height: 22px;
        position: relative;
        top: -1px;
    }
`;

export const IconBox = styled.div`
    display: grid;
    place-items: center;
    cursor: pointer;
`;
