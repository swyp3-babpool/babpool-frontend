import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';

export const NotificationPageContainer = styled.div`
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

export const TabBarTextContainer = styled.div`
    width: 100%;
    padding: 25px 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TabBarContainer = styled.div`
    width: 100%;
    height: 1px;
    padding: 12px 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
`;

export const TabBar = styled.div<{ selected: boolean }>`
    width: 50%;
    height: ${(props) => (props.selected ? '2px' : '1px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => (props.selected ? colors.purple_light_40 : colors.white_30)};
`;

export const GridContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    gap: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
    overflow-y: auto;
`;
