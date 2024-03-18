import React from 'react';
import { styled } from 'styled-components';
import Txt from '../text';
import { colors } from '@/assets/styles/theme';
import { ReactComponent as CloseIcon } from '@/assets/icons/ic_close_white.svg';
import { useSetRecoilState } from 'recoil';
import { INIT_ALARM_INFO, alarmInfoState } from '@/atom/alarminfo';
import { useNavigation } from '@/hooks/useNavigation';

type AlarmModalProps = {
    messageType: string | null;
};

export default function AlarmModal({ messageType }: AlarmModalProps) {
    const setAlarmInfo = useSetRecoilState(alarmInfoState);

    const handleCloseModal = () => {
        setAlarmInfo(INIT_ALARM_INFO);
    };

    const { navigate } = useNavigation();

    const getState = (messageType: string | null) => {
        switch (messageType) {
            case 'APPOINTMENT_REQUESTED':
                return 'received';
            case 'APPOINTMENT_ACCEPTED':
                return 'sent';
            case 'APPOINTMENT_REJECTED':
                return 'history';
            default:
                return '';
        }
    };

    const handleNotificationCardClick = (e: any) => {
        e.stopPropagation();
        const state = getState(messageType);
        if (state) {
            navigate(state === 'history' ? '/mypage/history' : `/notification`, { state: { messageType: state } });
            setAlarmInfo(INIT_ALARM_INFO);
        }
    };

    return (
        <AlarmModalContainer onClick={handleNotificationCardClick}>
            <Txt variant="body" color={colors.white}>
                새로운 알림이 도착했어요!
            </Txt>
            <Txt variant="body" color={colors.white}>
                확인하기
            </Txt>
            <IconBox onClick={handleCloseModal}>
                <CloseIcon />
            </IconBox>
        </AlarmModalContainer>
    );
}

const AlarmModalContainer = styled.div`
    width: 291px;
    height: 81px;
    background-color: rgba(145, 112, 247, 0.8);
    border-radius: 10px;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 2%;
    z-index: 999;
    cursor: pointer;
`;

const IconBox = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 13px;
    right: 13px;
    cursor: pointer;
`;
