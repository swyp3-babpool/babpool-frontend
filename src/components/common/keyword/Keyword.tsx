import { colors } from '@/assets/styles/theme';
import React from 'react';
import { styled } from 'styled-components';
import { CheckboxContainer, CheckboxLabel, HiddenCheckBox } from '../checkbox/Checkbox';
import Txt from '../text';
import { INTEREST_KEYWORD } from '@/utils/constant';

type KeywordProps = {
    name: string;
    keywordGroup: keyof typeof INTEREST_KEYWORD;
    ischecked: boolean;
    disabled?: boolean;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        keywordGroup: keyof typeof INTEREST_KEYWORD
    ) => void;
};

export default function Keyword({
    name,
    keywordGroup,
    ischecked,
    disabled = false,
    onChange,
}: KeywordProps) {
    return (
        <CheckboxContainer>
            <CheckboxLabel>
                <HiddenCheckBox
                    type={'checkbox'}
                    name={name}
                    checked={ischecked}
                    disabled={disabled}
                    onChange={(e) => onChange(e, keywordGroup)}
                />
                <KeywordBox ischecked={ischecked}>
                    <Txt
                        variant={ischecked ? 'caption3' : 'caption2'}
                        color={ischecked ? colors.purple_light_40 : colors.purple_light_20}
                    >
                        {name}
                    </Txt>
                </KeywordBox>
            </CheckboxLabel>
        </CheckboxContainer>
    );
}

export const KeywordBox = styled.div<{ ischecked: boolean }>`
    padding: 4px 12px;
    border: 1px solid
        ${(props) => (props.ischecked ? colors.purple_light_40 : colors.purple_light_20)};
    border-radius: 30px;
    cursor: pointer;
`;
