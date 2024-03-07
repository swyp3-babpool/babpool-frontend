import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';

export const ModifyProfilePageContainer = styled.div`
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

export const ImageDefaultContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 23px;
    border-radius: 20px;
    background-color: ${colors.purple_light_30};
`;

export const ImageContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`;

export const ImageIcon = styled.img`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.img`
    position: relative;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`;

export const ModifyProfileImgButton = styled.button`
    position: absolute;
    bottom: -7px;
    right: -11px;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.white};
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.12));
    border-radius: 50%;
    cursor: pointer;
`;

export const NickNameInput = styled.input`
    width: 38.4%;
    height: 36px;
    padding: 7px 12px;
    border-radius: 8px;
    border: 1px solid ${colors.black};
    background-color: ${colors.white};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${colors.white_90};
    box-sizing: border-box;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${colors.white_20};
    }
`;

export const SummaryIntroduceInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 9px 16px;
    border-radius: 8px;
    border: 1px solid ${colors.black};
    background-color: ${colors.white};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${colors.black};
    box-sizing: border-box;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${colors.white_20};
    }
`;

export const IntroduceInput = styled.textarea`
    width: 100%;
    height: 145px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid ${colors.black};
    background-color: ${colors.white};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${colors.black};
    box-sizing: border-box;
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

export const InputWrapper = styled.div`
    position: relative;
    flex-shrink: 0;
    width: 57.7%;
`;

export const ContactInput = styled.input`
    flex-shrink: 0;
    width: 100%;
    height: 36px;
    padding: 7px 8px;
    background-color: ${colors.white};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${colors.black};
    box-sizing: border-box;
    resize: none;
    border: none;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${colors.white_20};
    }
`;

export const UnderLine = styled.div`
    position: absolute;
    bottom: 2px;
    width: 100%;
    height: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.purple_light_30};
    border-radius: 2px;
    gap: 8px;
`;

export const AddPossibleTimeButton = styled.button`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px dashed var(--black, #000);
    cursor: pointer;
`;

export const ButtonContainer = styled.div`
    width: 100%;
    height: 48px;
`;
