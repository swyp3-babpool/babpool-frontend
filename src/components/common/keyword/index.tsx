import { colors } from '@/assets/styles/theme';
import React from 'react';
import { styled } from 'styled-components';
import { CheckboxContainer, HiddenCheckBox } from '../checkbox/SignUpCheckbox';
import Txt from '../text';

type KeywordProps = { name: string; isChecked: boolean; disabled?: boolean; onChange: () => void };

export default function Keyword({ name, isChecked, disabled = false, onChange }: KeywordProps) {
    return (
        <CheckboxContainer>
            <HiddenCheckBox
                type={'checkbox'}
                name={name}
                checked={isChecked}
                disabled={disabled}
                onChange={onChange}
            />
            <KeywordBox isChecked={isChecked}>
                <Txt
                    variant={isChecked ? 'caption3' : 'caption2'}
                    color={isChecked ? colors.purple_light_40 : colors.purple_light_20}
                >
                    {name}
                </Txt>
            </KeywordBox>
        </CheckboxContainer>
    );
}

export const KeywordBox = styled.div<{ isChecked: boolean }>`
    padding: 4px 12px;
    border: 1px solid
        ${(props) => (props.isChecked ? colors.purple_light_40 : colors.purple_light_20)};
    border-radius: 30px;
    cursor: pointer;
    &:hover {
        background: ${colors.purple_light_30};
        span {
            color: ${colors.white};
        }
    }
`;
