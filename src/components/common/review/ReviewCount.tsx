import Txt from '../text';
import { colors } from '@/assets/styles/theme';
import { styled } from 'styled-components';

export default function ReviewCount({ text, count }: { text: string; count: number }) {
    return (
        <ReviewCountBox>
            <Txt variant="h5" color={colors.purple_light_40}>
                {text}
            </Txt>
            <Txt variant="caption1">{count}회</Txt>
        </ReviewCountBox>
    );
}

const ReviewCountBox = styled.div`
    width: 100%;
    height: auto;
    padding: 20px 14px;
    aspect-ratio: 97 / 91;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid ${colors.purple_light_20};
    border-radius: 8px;
`;
