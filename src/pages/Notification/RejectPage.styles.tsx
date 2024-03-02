import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';

export const RejectPageContainer = styled.div`
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
