import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';

export const ReviewPageContainer = styled.div`
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

export const ReviewButton = styled.button<{ selected: boolean }>`
    width: 100%;
    aspect-ratio: 97/81;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.selected ? colors.purple_light_30 : colors.white)};
    border: 1px solid ${colors.purple_light_20};
    border-radius: 8px;
    cursor: pointer;
`;

export const Devider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.white_10};
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

export const ReviewInput = styled.textarea`
    width: 100%;
    height: 145px;
    box-sizing: border-box;
    background-color: ${colors.white};
    border: 1px solid ${colors.black};
    overflow: auto;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${colors.black};
    border-radius: 8px;
    padding: 16px;
    resize: none;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${colors.white_20};
    }
`;
