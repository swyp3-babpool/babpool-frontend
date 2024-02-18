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
