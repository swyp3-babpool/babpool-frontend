import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';

export const MyPageContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: scroll;
`;

export const ProfileContainer = styled.div`
    position: relative;
    width: 100%;
    height: 30%;
    min-height: 238px;
    background: linear-gradient(45deg, #9170f7 14.16%, #d2c3f9 85.67%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const ProfileModifyButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: ${colors.purple_light_10};
    z-index: 1;
    cursor: pointer;
    padding: 8px;
    gap: 7px;
`;

export const IconContainer = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RightIconContainer = styled.div`
    width: 7px;
    height: 12px;
    padding: 0 0 3px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ThickDevider = styled.div`
    width: 100%;
    height: 10px;
    background-color: ${colors.white_10};
`;

export const Devider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 1px;
    padding: 0 30px;
    background-color: ${colors.white_10};
`;

export const DeleteAccountButton = styled.button`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 20px 25px;
    cursor: pointer;
`;
