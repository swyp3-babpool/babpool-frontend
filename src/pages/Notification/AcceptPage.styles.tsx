import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';

export const AcceptPageContainer = styled.div`
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

export const IconContainer = styled.div`
    width: 50px;
    height: 50px;
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
    width: 100%;
    height: 1px;
    background-color: ${colors.white_10};
`;

export const QueryBox = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 8px;
    background-color: ${colors.white_10};
`;

export const ButtonContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 0px 30px 40px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
`;
