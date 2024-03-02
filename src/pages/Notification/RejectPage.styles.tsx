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

export const InputContainer = styled.div`
    width: 100%;
    height: 145px;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px;
    background-color: ${colors.white};
    border: 1px solid ${colors.black};
    border-radius: 8px;
`;

export const RejectInput = styled.textarea`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    border: none;
    resize: none;
    overflow: auto;
    font-size: 14px;
    font-weight: 400;
    color: ${colors.black};

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${colors.white_20};
    }
`;