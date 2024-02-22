import { DIVISION } from '@/utils/constant';
import React from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import Checkbox from '@/components/common/checkbox/Checkbox';
import { colors } from '@/assets/styles/theme';
import { SignUpInfo } from '@/pages/signup/SignUpPage';

type DivisionGroupProps = {
    signUpInfo: SignUpInfo;
    setSignUpInfo: React.Dispatch<React.SetStateAction<SignUpInfo>>;
};

export default function DivisionGroup({ signUpInfo, setSignUpInfo }: DivisionGroupProps) {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        console.log(e);
        setSignUpInfo((prev) => ({ ...prev, division: name }));
    };

    return (
        <DivisionGroupContainer>
            <Txt variant="h5">구분*</Txt>
            <Txt variant="caption2" color={colors.white_30} style={{ marginTop: '8px' }}>
                해당하시는 그룹 1개를 선택해주세요
            </Txt>
            <CheckboxList>
                {DIVISION.map((division) => (
                    <Checkbox
                        key={division}
                        label={division}
                        isChecked={signUpInfo.division === division}
                        onChange={handleCheckboxChange}
                    />
                ))}
            </CheckboxList>
        </DivisionGroupContainer>
    );
}

export const DivisionGroupContainer = styled.div`
    width: inherit;
    height: auto;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
`;

export const CheckboxList = styled.div`
    width: 100%;
    height: auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
