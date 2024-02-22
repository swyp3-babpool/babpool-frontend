import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';

export const NotificationDetailPageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
`;

export const NotificationDetailPageSection = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${colors.white};
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
`;

export const Header = styled.div`
    width: 100%;
    height: 43px;
    padding: 11px 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ProfileInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const Col = styled.div<{ gap: string }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${(props) => props.gap};
`;

export const PossibleTimeBox = styled.div`
    width: 100%;
    padding: 15px 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    border: 1px solid ${colors.purple_light_30};
`;

export const QueryBox = styled.div`
    width: 100%;
    height: 145px;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 8px;
    background-color: ${colors.white_10};
`;

export const BackButton = styled.button`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const EmptyDiv = styled.div`
    width: 24px;
    height: 24px;
`;

export const ButtonContainer = styled.div<{ type?: string }>`
    width: 100%;
    padding: 0px 20px 40px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    gap: ${(props) => (props.type === 'received' ? '0px' : '12px')};
`;
