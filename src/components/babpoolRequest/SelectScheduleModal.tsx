import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import { ReactComponent as CloseIcon } from '@/assets/icons/ic_close.svg';
import { colors } from '@/assets/styles/theme';
import SelectTimeBox from './SelectTimeBox';
import useOutsideClickModalClose from '@/hooks/useOutsideClickModalClose';
import ScheduleCalendar from '../common/calendar/ScheduleCalendar';
import { EmptyDiv } from '@/pages/Notification/NotificationPage.styles';
import { useQuery } from '@tanstack/react-query';
import { getAvailableSchedule } from '@/api/babRequest/babRequestApi';
import { UserScheduleType } from '@/interface/api/babRequestType';
import { SELECT_TIME_SCHEDULE } from '@/utils/constant';

type SelectScheduleModalProps = {
    isOpen: boolean;
    userId: number;
    handleSelectSchedule: (selectedSchedule: UserScheduleType) => void;
    onClose: () => void;
};

export default function SelectScheduleModal({ isOpen, userId, handleSelectSchedule, onClose }: SelectScheduleModalProps) {
    const [possibleScheduleList, setPossibleScheduleList] = useState<UserScheduleType[]>([]);
    const selectScheduleModalRef = useRef<HTMLDivElement>(null);

    const {
        data: userSchedule,
        isLoading,
        isError,
    } = useQuery<UserScheduleType[]>({
        queryKey: [`/api/appointment/${userId}/datetime`, userId],
        queryFn: () => getAvailableSchedule(Number(userId)),
    });

    const handleSetPossibleSchedule = (scheduleList: UserScheduleType[]) => {
        setPossibleScheduleList(scheduleList);
    };

    useOutsideClickModalClose({ ref: selectScheduleModalRef, isOpen: isOpen, closeModal: onClose });

    return (
        !isLoading &&
        userSchedule && (
            <SelectScheduleModalModalContainer open={isOpen} ref={selectScheduleModalRef}>
                <TitleBox>
                    <EmptyDiv />
                    <Txt variant="body">일정 선택</Txt>
                    <IconBox onClick={onClose}>
                        <CloseIcon />
                    </IconBox>
                </TitleBox>
                <CalendarContainer>
                    <ScheduleCalendar
                        userSchedule={userSchedule}
                        handleSetPossibleSchedule={handleSetPossibleSchedule}
                        onClose={onClose}
                    />
                </CalendarContainer>
                <SelectScheduleContainer>
                    <Txt variant="caption1">선호하는 시간대 1개를 선택해주세요</Txt>
                    <SelectTimeContainer>
                        {possibleScheduleList.map((schedule) => (
                            <SelectTimeBox key={schedule.possibleTimeId} schedule={schedule} handleSelectSchedule={handleSelectSchedule} />
                        ))}
                    </SelectTimeContainer>
                </SelectScheduleContainer>
            </SelectScheduleModalModalContainer>
        )
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
    max-height: 345px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 23px;
    padding: 30px 30px 22px 30px;
    background-color: ${colors.white_10};
`;

const SelectTimeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: inherit;
`;

const IconBox = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;
