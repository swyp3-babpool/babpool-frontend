import { colors } from '@/assets/styles/theme';
import React from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import Keyword from '../common/keyword';
import { INTEREST_KEYWORD } from '@/utils/constant';
import { SignUpInfo } from '@/pages/signup/SignUpPage';
import { getKeywordGroupTitle } from '@/utils/util';

type KeywordGroupProps = {
    signUpInfo: SignUpInfo;
    setSignUpInfo: React.Dispatch<React.SetStateAction<SignUpInfo>>;
};


export type KeywordType = (keyof typeof INTEREST_KEYWORD)

export default function KeywordGroup({ signUpInfo, setSignUpInfo }: KeywordGroupProps) {
    const KEYWORD_LIST = Object.keys(INTEREST_KEYWORD) as KeywordType[];

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
        console.log(signUpInfo);
    };

    const validateCheck = () => {
        const keywordArrays = Object.values(signUpInfo.keywordGroups);

        // 배열의 길이를 합산
        const totalLength = keywordArrays.reduce((acc, curr) => acc + curr.length, 0);

        console.log(totalLength); // 총 길이 출력
        return totalLength < 10;
    };

    return (
        <KeywordGroupContainer>
            <Txt variant="h5">관심 키워드*</Txt>
            <Txt
                variant="caption2"
                color={colors.white_30}
                style={{ marginTop: '8px', marginBottom: '1rem' }}
            >
                관심 키워드를 최대 10개까지 선택해주세요
            </Txt>
            <KeywordListContainer>
                {KEYWORD_LIST.map((keywordGroup) => (
                    <KeywordGroupBox>
                        <Txt variant="caption1">{getKeywordGroupTitle(keywordGroup)}</Txt>
                        <KeywordList>
                            {INTEREST_KEYWORD[keywordGroup].map((keyword) => {
                                const ischecked =
                                    signUpInfo.keywordGroups[keywordGroup].includes(keyword);
                                return (
                                    <Keyword
                                        name={keyword}
                                        keywordGroup={keywordGroup}
                                        ischecked={ischecked}
                                        onChange={handleCheckboxChange}
                                    />
                                );
                            })}
                        </KeywordList>
                    </KeywordGroupBox>
                ))}
            </KeywordListContainer>
        </KeywordGroupContainer>
    );
}

export const KeywordGroupContainer = styled.div`
    width: inherit;
    height: auto;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const KeywordGroupBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 24px;
`;

export const KeywordListContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 42px;
`;

export const KeywordList = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;
