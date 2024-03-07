import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import { ReactComponent as CloseIcon } from '@/assets/icons/ic_close.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/ic_check.svg';
import { ReactComponent as ActiveCheckIcon } from '@/assets/icons/ic_active_check.svg';
import { colors } from '@/assets/styles/theme';
import SelectTimeBox from '@/components/babpoolRequest/SelectTimeBox';
import useOutsideClickModalClose from '@/hooks/useOutsideClickModalClose';
import ScheduleCalendar from '../common/calendar/ScheduleCalendar';
import { EmptyDiv } from '@/pages/notification/NotificationPage.styles';
import PossibleTimeCalendar from '../common/calendar/PossibleTimeCalendar';
import { Col, Row } from '../common/flex/Flex';

type SelectPossibleTimeModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export interface TimeRange {
    [key: string]: string;
}

const timeRanges = {
    11: '오전 11:00 ~ 오후 12:00',
    12: '오후 12:00 ~ 오후 1:00',
    13: '오후 1:00 ~ 오후 2:00',
    14: '오후 2:00 ~ 오후 3:00',
    15: '오후 3:00 ~ 오후 4:00',
    16: '오후 4:00 ~ 오후 5:00',
    17: '오후 5:00 ~ 오후 6:00',
    18: '오후 6:00 ~ 오후 7:00',
};

export default function SelectPossibleTimeModal({ isOpen, onClose }: SelectPossibleTimeModalProps) {
    const selectScheduleModalRef = useRef<HTMLDivElement>(null);
    const [selectedDate, setSelectedDate] = useState<string>();
    const [selectedDates, setSelectedDates] = useState<TimeRange[]>([]);

    useOutsideClickModalClose({ ref: selectScheduleModalRef, isOpen: isOpen, closeModal: onClose });

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
                <PossibleTimeCalendar
                    onClose={onClose}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                />
            </CalendarContainer>
            <SelectScheduleContainer>
                <Txt variant="caption1">선호하는 시간대 총 3개를 선택해주세요</Txt>
                <Col style={{ width: 172 }} gap={12} alignItems="center" justifyContent="center">
                    {Object.entries(timeRanges).map(([startTime, timeRange]) => (
                        <Row
                            gap={10}
                            alignItems="center"
                            justifyContent="flex-start"
                            key={startTime}
                        >
                            <IconButton>
                                <CheckIcon />
                            </IconButton>

                            <Txt
                                style={{
                                    paddingTop: '3px',
                                }}
                                variant="caption1"
                            >
                                {timeRange}
                            </Txt>
                        </Row>
                    ))}
                </Col>
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
    padding: 16px 16px 10px;
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
    gap: 25px;
    padding: 30px 30px 8px;
    background-color: ${colors.white_10};
`;

const IconBox = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const IconButton = styled.div`
    width: 16px;
    height: 16px;
    cursor: pointer;
`;
