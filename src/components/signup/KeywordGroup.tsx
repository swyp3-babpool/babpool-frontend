import { colors } from '@/assets/styles/theme';
import React from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import { INTEREST_KEYWORD } from '@/utils/constant';
import { SignUpInfo } from '@/pages/signup/SignUpPage';
import KeywordList from '../common/keyword/KeywordList';

type KeywordGroupProps = {
    margin?: string;
    signUpInfo: SignUpInfo;
    setSignUpInfo: React.Dispatch<React.SetStateAction<SignUpInfo>>;
};

export type KeywordType = keyof typeof INTEREST_KEYWORD;

export default function KeywordGroup({ signUpInfo, setSignUpInfo, margin }: KeywordGroupProps) {
  
    
    const keywordArrays = Object.values(signUpInfo.keywordGroups);
    const keywordTotalLength = keywordArrays.reduce((acc, curr) => acc + curr.length, 0);

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        keywordGroup: keyof typeof INTEREST_KEYWORD
    ) => {
       
        const { name } = e.target;
        const isSelected = signUpInfo.keywordGroups[keywordGroup].includes(name);
        if (isSelected) {
            setSignUpInfo((prev) => ({
                ...prev,
                keywordGroups: {
                    ...prev.keywordGroups,
                    [keywordGroup]: prev.keywordGroups[keywordGroup].filter(
                        (keyword) => keyword !== name
                    ),
                },
            }));
        } else {
            if (validateCheck()) {
                setSignUpInfo((prev) => ({
                    ...prev,
                    keywordGroups: {
                        ...prev.keywordGroups,
                        [keywordGroup]: [...prev.keywordGroups[keywordGroup], name],
                    },
                }));
            }
        }
    };

    const validateCheck = () => {
        // console.log(keywordTotalLength); // 총 길이 출력
        return keywordTotalLength < 10;
    };

    const handleCheck = (keywordGroup: KeywordType, keyword: string) => {
        return signUpInfo.keywordGroups[keywordGroup].includes(keyword);
    };

    return (
        <KeywordGroupContainer margin={margin}>
            <Txt variant="h5">관심 키워드*</Txt>
            <Txt
                variant="caption2"
                color={colors.white_30}
                style={{ marginTop: '8px', marginBottom: '1rem' }}
            >
                관심 키워드를 최대 10개까지 선택해주세요 ({keywordTotalLength}/10개)
            </Txt>
            <KeywordList
                margin={margin}
                handleCheck={handleCheck}
                handleChange={handleCheckboxChange}
            />
        </KeywordGroupContainer>
    );
}

export const KeywordGroupContainer = styled.div<{ margin?: string }>`
    width: inherit;
    margin-top: ${(props) => (props.margin ? props.margin : '40px')};
    display: flex;
    flex-direction: column;
    position: relative;
`;
