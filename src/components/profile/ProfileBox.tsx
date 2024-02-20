import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';
import Txt from '../common/text';
import ProfileDefaultIcon from '@/assets/icons/ic_profile_default.png';
type ProfileBoxProps = {
    url?: string;
    name?: string;
    group?: string;
    content?: string;
    padding?: string;
};

export default function ProfileBox({ url, name, group, content, padding }: ProfileBoxProps) {
    return (
        <div style={{ padding: padding ? padding : '0', width: '100%' }}>
            <Container>
                {!url ? (
                    <ImageDefaultContainer>
                        <ImageIcon src={ProfileDefaultIcon} />
                    </ImageDefaultContainer>
                ) : (
                    <Image src={url} />
                )}
                <InfoContainer>
                    <NameContainer>
                        <Txt variant="h5" color={colors.black}>
                            {name}
                        </Txt>
                        <Txt variant="caption1" color={colors.white_40}>
                            {group}
                        </Txt>
                    </NameContainer>
                    <Txt style={{ width: '100%' }} variant="caption2" color={colors.black}>
                        {content}
                    </Txt>
                </InfoContainer>
            </Container>
        </div>
    );
}

export const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
`;

export const ImageDefaultContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 13px;
    border-radius: 10px;
    background-color: ${colors.purple_light_30};
`;

export const ImageIcon = styled.img`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.img`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`;

export const InfoContainer = styled.div`
    width: 100%;
    height: 46px;
    padding: 2px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
`;

export const NameContainer = styled.div`
    width: 100%;
    height: 22px;
    padding-top: 2px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    gap: 12px;
`;
