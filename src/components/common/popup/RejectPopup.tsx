import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '@/assets/icons/ic_close.svg';
import Txt from '../text';
import { colors } from '@/assets/styles/theme';
import ProfileBox from '@/components/profile/ProfileBox';
import { Col } from '../flex/Flex';
import ProfileKeywords from '@/components/profile/ProfileKeywords';
import Button from '../button';
import { GetRejectDetailType } from '@/interface/mypageType';
import { getDetailReject } from '@/api/profile/mypageApi';
import { useQuery } from '@tanstack/react-query';
import { getDivisionName } from '@/utils/util';

type RejectPopupProps = {
    appointmentId: number;
    closePopup: () => void;
};

export default function RejectPopup({ appointmentId, closePopup }: RejectPopupProps) {
    const {
        data: rejectDetail,
        isError: isError,
        isLoading: isLoading,
    } = useQuery<GetRejectDetailType>({
        queryKey: [`/api/appointment/refuse/${appointmentId}`],
        queryFn: () => getDetailReject(appointmentId),
    });

    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);
    return (
        <PopupWrapper>
            <Col gap={30} justifyContent="center">
                <Col gap={20}>
                    <Col gap={16}>
                        <ProfileBox
                            url={rejectDetail?.receiverProfileImage}
                            name={rejectDetail?.receiverNickName}
                            group={getDivisionName(rejectDetail?.receiverGrade || '')}
                            content={rejectDetail?.receiverProfileIntro}
                        />
                        <ProfileKeywords keywords={rejectDetail?.keywords} />
                    </Col>

                    <QueryBox>
                        <Txt variant="caption1" color={colors.black}>
                            {rejectDetail?.message === '시간만료'
                                ? '[시간 만료]'
                                : rejectDetail?.message}
                        </Txt>
                    </QueryBox>
                </Col>
                <Col justifyContent="center" alignItems="center">
                    <ButtonContainer>
                        <Button text="확인" onClick={closePopup} />
                    </ButtonContainer>
                </Col>
            </Col>

            <IconBox onClick={closePopup}>
                <CloseButton />
            </IconBox>
        </PopupWrapper>
    );
}

export const QueryBox = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 8px;
    background-color: ${colors.white_10};
`;

export const PopupWrapper = styled.div`
    width: 339px;
    min-height: 318px;
    padding: 0px 12px 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #d2c3f9;
    border-radius: 20px;
    background-color: white;
`;

export const PopupTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 20px;
`;

export const ButtonContainer = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: absolute;
    bottom: 20px;
`;

export const CloseButton = styled(CloseIcon)``;

export const IconBox = styled.div`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
`;
