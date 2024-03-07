import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';
import Txt from '../common/text';

type ProfileKeywordsProps = {
    keywords?: string[];
    padding?: string;
    color?: string;
};

export default function ProfileKeywords({ keywords, padding, color }: ProfileKeywordsProps) {
    return (
        <div style={{ padding: padding ? padding : '0', width: '100%' }}>
            <Container>
                {keywords?.slice(0, 3).map((keyword, index) => (
                    <KeywordBox key={index} color={color}>
                        <Txt variant="caption2" color={color ? color : colors.purple_light_40}>
                            {keyword}
                        </Txt>
                    </KeywordBox>
                ))}
                {keywords && keywords?.length > 3 && (
                    <KeywordBox color={color}>
                        <Txt variant="caption2" color={color ? color : colors.purple_light_40}>
                            +{keywords.length - 3}
                        </Txt>
                    </KeywordBox>
                )}
            </Container>
        </div>
    );
}

export const KeywordBox = styled.div<{ color: string | undefined }>`
    padding: 4px 12px 2px 12px;
    border: 1px solid ${(props) => (props.color ? props.color : colors.purple_light_40)};
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const Container = styled.div`
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
`;
