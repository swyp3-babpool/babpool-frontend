import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';
import Txt from '../common/text';
import ProfileDefaultIcon from '@/assets/icons/ic_profile_default.png';
import ProfileDefaultPurpleIcon from '@/assets/icons/ic_profile_default_purple.png';

type NotificaionCardProps = {
    image?: string;
    name?: string;
    content?: string;
    reviewRequired?: boolean;
    type?: string;
    onClick?: () => void;
};

export default function NotificationCard({
    image,
    name,
    content,
    type,
    reviewRequired,
    onClick,
}: NotificaionCardProps) {
    const renderImage = () => {
        if (image) {
            return <Image src={image} />;
        }
        if (type !== 'WAITING' && !reviewRequired) {
            return (
                <ImageDefault color="purple">
                    <ImageIcon src={ProfileDefaultIcon} />
                </ImageDefault>
            );
        } else {
            return (
                <ImageDefault color="white">
                    <ImageIcon src={ProfileDefaultPurpleIcon} />
                </ImageDefault>
            );
        }
    };

    const renderBackground = () => {
        if (type !== 'WAITING' && !reviewRequired) {
            return colors.white;
        } else {
            return colors.purple_light_30;
        }
    };

    const renderContent = () => {
        if (type === 'WAITING' || reviewRequired) {
            return (
                <Txt variant="caption1" color={colors.white}>
                    {content}
                </Txt>
            );
        } else if (type === 'REJECT' || type === 'EXPIRE') {
            return (
                <Txt
                    style={{
                        borderRadius: 8,
                        backgroundColor: colors.white_10,
                        padding: '4px 6px',
                    }}
                    variant="caption1"
                    color={colors.purple_light_30}
                >
                    {content}
                </Txt>
            );
        } else {
            return (
                <Txt variant="caption1" color={colors.black}>
                    {content}
                </Txt>
            );
        }
    };

    return (
        <Container
            background={renderBackground()}
            onClick={onClick}
            disabled={onClick ? false : true}
            cursor={onClick ? 'pointer' : 'default'}
        >
            <SubContainer>
                {renderImage()}
                <InfoContainer>
                    <Txt
                        variant="button"
                        color={
                            type === 'WAITING' || reviewRequired
                                ? colors.white
                                : colors.purple_light_40
                        }
                    >
                        {name}
                    </Txt>
                    {renderContent()}
                </InfoContainer>
            </SubContainer>
        </Container>
    );
}

export const Container = styled.button<{ background: string; cursor: string }>`
    min-width: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: ${(props) => props.background};
    border-radius: 8px;
    border: 1px solid ${colors.purple_light_20};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => props.cursor};
`;

export const SubContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const ImageDefault = styled.div<{ color: 'white' | 'purple' }>`
    width: 63px;
    height: 63px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 19px 19px 20px 20px;
    background-color: ${(props) =>
        props.color === 'white' ? colors.white : colors.purple_light_30};
    border-radius: 50%;
`;

export const ImageIcon = styled.img`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.img`
    width: 63px;
    height: 63px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

export const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;
