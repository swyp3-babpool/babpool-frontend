import React from 'react';
import { styled } from 'styled-components';

type TextareaProps = {
    value: string;
    placeholder?: string;
    rows?: number;
    cols?: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({value, placeholder='', rows=10, cols=10, onChange}: TextareaProps) {
    return (
        <TextareaBox rows={rows} cols={cols} value={value} placeholder={placeholder} onChange={onChange}/>
    );
}

const TextareaBox = styled.textarea`
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
    padding: 16px;
    outline: none;
    resize: vertical;
`

