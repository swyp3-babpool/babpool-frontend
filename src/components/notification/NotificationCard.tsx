import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';
import Txt from '../common/text';
import ProfileDefaultIcon from '@/assets/icons/ic_profile_default.png';
import ProfileDefaultPurpleIcon from '@/assets/icons/ic_profile_default_purple.png';
import exp from 'constants';

type NotificaionCardProps = {
    image?: string;
    name?: string;
    content?: string;
    type?: 'complete' | 'reject' | 'accept' | 'waiting';
    onClick?: () => void;
};

export default function NotificationCard({
    image,
    name,
    content,
    type,
    onClick,
}: NotificaionCardProps) {
    const renderImage = () => {
        if (image) {
            return <Image src={image} />;
        }
        if (type === 'accept' || type === 'complete') {
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
        if (type === 'accept' || type === 'complete') {
            return colors.white;
        } else {
            return colors.purple_light_30;
        }
    };

    const renderFontColor = () => {
        if (type !== 'accept' && type !== 'complete') {
            return colors.white;
        }
    };

    return (
        <Container background={renderBackground()} onClick={onClick}>
            <SubContainer>
                {renderImage()}
                <InfoContainer>
                    <Txt
                        variant="body"
                        color={renderFontColor() ? renderFontColor() : colors.purple_light_40}
                    >
                        {name}
                    </Txt>
                    <Txt
                        variant="body"
                        color={renderFontColor() ? renderFontColor() : colors.black}
                    >
                        {content}
                    </Txt>
                </InfoContainer>
            </SubContainer>
        </Container>
    );
}

export const Container = styled.div<{ background: string }>`
    min-width: 0;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: ${(props) => props.background};
    border-radius: 8px;
    border: 1px solid ${colors.purple_light_20};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SubContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 25px 48px 20px;
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
