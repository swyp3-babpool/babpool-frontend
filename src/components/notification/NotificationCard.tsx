import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';
import Txt from '../common/text';

type NotificaionCardProps = {
    image?: string;
    name?: string;
    content?: string;
    isHistory?: boolean;
};

export default function NotificationCard({
    image,
    name,
    content,
    isHistory,
}: NotificaionCardProps) {
    return (
        <Container>
            <Image src={image} />
            <Divider />
            <InfoContainer>
                <Txt variant="body" color={colors.purple_light_40}>
                    {name}
                </Txt>
                <Txt variant="body">{content}</Txt>
            </InfoContainer>
        </Container>
    );
}

export const Container = styled.div`
    min-width: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: white;
    border-radius: 8px;
    border: 1px solid ${colors.purple_light_20};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const Image = styled.img`
    width: 100%;
    height: 63%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.purple_light_20};
`;

export const InfoContainer = styled.div`
    width: 100%;
    height: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
