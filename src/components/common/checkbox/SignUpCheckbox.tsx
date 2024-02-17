import { styled } from 'styled-components';
import {ReactComponent as CheckIcon} from '@/assets/icons/ic_checkbox.svg';
import {ReactComponent as ActiveCheckIcon} from '@/assets/icons/ic_active_checkbox.svg';
import Txt from '../text';

type CheckboxProps = {
    label: string;
    isChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SignUpCheckbox({ label, isChecked, onChange }: CheckboxProps) {
    return (
        <CheckboxContainer>
            <CheckboxLabel>
                <HiddenCheckBox type="checkbox" name={label} checked={isChecked} onChange={onChange} />
                <StyledCheckBox>
                    {isChecked ? <ActiveCheckIcon /> : <CheckIcon />}
                </StyledCheckBox>
                <Txt variant='caption1'>{label}</Txt>
            </CheckboxLabel>
        </CheckboxContainer>
    );
}

export const CheckboxContainer = styled.div`
	display: inline-block;
	vertical-align: middle;
`;

export const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StyledCheckBox = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
`;

export const HiddenCheckBox = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;
