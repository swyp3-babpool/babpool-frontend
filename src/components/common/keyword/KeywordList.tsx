import React from 'react';
import { styled } from 'styled-components';
import Keyword from './Keyword';
import { INTEREST_KEYWORD } from '@/utils/constant';
import { KeywordType } from '@/components/signup/KeywordGroup';
import Txt from '../text';
import { getKeywordGroupTitle } from '@/utils/util';

type KeywordListProps = {
    margin?: string;
    handleCheck: (keywordGroup: KeywordType, keyword: string) => boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, keywordGroup: KeywordType) => void;
};

export default function KeywordList({ handleCheck, handleChange, margin }: KeywordListProps) {
    const KEYWORD_LIST = Object.keys(INTEREST_KEYWORD) as KeywordType[];

    return (
        <KeywordListContainer margin={margin}>
            {KEYWORD_LIST.map((keywordGroup) => (
                <KeywordGroupBox key={keywordGroup}>
                    <Txt variant="caption1">{getKeywordGroupTitle(keywordGroup)}</Txt>
                    <S_KeywordList>
                        {INTEREST_KEYWORD[keywordGroup].map((keyword) => {
                            const ischecked = handleCheck(keywordGroup, keyword);

                            return (
                                <Keyword
                                    key={keyword}
                                    name={keyword}
                                    keywordGroup={keywordGroup}
                                    ischecked={ischecked}
                                    onChange={handleChange}
                                />
                            );
                        })}
                    </S_KeywordList>
                </KeywordGroupBox>
            ))}
        </KeywordListContainer>
    );
}

export const KeywordGroupBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin-top: 24px;
`;

export const KeywordListContainer = styled.div<{ margin?: string }>`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin-bottom: ${(props) => (props.margin ? props.margin : '42px')};
`;

export const S_KeywordList = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;
