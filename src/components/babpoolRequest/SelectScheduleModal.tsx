import React, { useRef } from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import { EmptyDiv } from '@/pages/Notification/NotificationDetailPage.styles';
import { ReactComponent as CloseIcon } from '@/assets/icons/ic_close.svg';
import { colors } from '@/assets/styles/theme';
import SelectTimeBox from './SelectTimeBox';
import useOutsideClickModalClose from '@/hooks/useOutsideClickModalClose';
import ScheduleCalendar from '../common/calendar/ScheduleCalendar';

type SelectScheduleModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SelectScheduleModal({ isOpen, onClose }: SelectScheduleModalProps) {

    const selectScheduleModalRef = useRef<HTMLDivElement>(null);

    useOutsideClickModalClose({ref: selectScheduleModalRef, isOpen: isOpen, closeModal: onClose})

    return (
        <SelectScheduleModalModalContainer open={isOpen} ref={selectScheduleModalRef}>
            <TitleBox>
                <EmptyDiv />
                <Txt variant="body">일정 선택</Txt>
                <IconBox onClick={onClose}>
                    <CloseIcon />
                </IconBox>
            </TitleBox>
            <CalendarContainer>
                <ScheduleCalendar onClose={onClose} />
            </CalendarContainer>
            <SelectScheduleContainer>
                <Txt variant="caption1">선호하는 시간대 1개를 선택해주세요</Txt>
                <SeleceTimeContainer>
                    <SelectTimeBox timeText="오후 05:00 ~ 오후 06:00" />
                    <SelectTimeBox timeText="오후 06:00 ~ 오후 07:00" />
                    <SelectTimeBox timeText="오후 08:00 ~ 오후 09:00" />
                    <SelectTimeBox timeText="오후 09:00 ~ 오후 10:00" />
                </SeleceTimeContainer>
            </SelectScheduleContainer>
        </SelectScheduleModalModalContainer>
    );
}

const SelectScheduleModalModalContainer = styled.div<{ open: boolean }>`
    width: 100%;
    height: auto;
    background-color: white;
    position: absolute;
    bottom: ${(props) => (props.open ? 0 : '-100%')};
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px 20px 0 0;
    z-index: 10;
    transition: all 0.5s ease;
`;

const TitleBox = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CalendarContainer = styled.div`
    width: 100%;
`;

const SelectScheduleContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 23px;
    padding: 30px 30px 22px 30px;
    background-color: ${colors.white_10};
`;

const SeleceTimeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: inherit;
`;

const IconBox = styled.div`
    cursor: pointer;
`;
