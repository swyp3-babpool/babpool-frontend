import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import { ReactComponent as CloseIcon } from '@/assets/icons/ic_close.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/ic_check.svg';
import { ReactComponent as ActiveCheckIcon } from '@/assets/icons/ic_active_check.svg';
import { colors } from '@/assets/styles/theme';
import useOutsideClickModalClose from '@/hooks/useOutsideClickModalClose';
import PossibleTimeCalendar from '../common/calendar/PossibleTimeCalendar';
import { Col, Row } from '../common/flex/Flex';
import { EmptyDiv } from '@/pages/notification/NotificationPage.styles';
import { Value } from 'node_modules/react-calendar/dist/esm/shared/types';
import moment from 'moment';
import { TimeRange } from '@/interface/api/modifyProfileType';
import { SELECT_TIME_SCHEDULE } from '@/utils/constant';

type SelectPossibleTimeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedDates?: TimeRange;
    setSelectedDates: (dates: TimeRange) => void;
};

export default function SelectPossibleTimeModal({
    isOpen,
    onClose,
    selectedDates,
    setSelectedDates,
}: SelectPossibleTimeModalProps) {
    const selectScheduleModalRef = useRef<HTMLDivElement>(null);
    const [selectedDate, setSelectedDate] = useState<string>(
        moment(new Date()).format('YYYY-MM-DD')
    );

    const handleCheckIcon = (time: number) => {
        if (!selectedDates) return false;
        const isExist = selectedDates[selectedDate]?.includes(time);
        return isExist;
    };

    const handleSelectTime = (time: number) => {
        console.log(`time은 ${time}`);
        if (!selectedDates) {
            setSelectedDates({ [selectedDate]: [time] });
            return;
        }

        const isExist = selectedDates?.[selectedDate]?.includes(time);
        if (isExist) {
            const filteredTimes = selectedDates[selectedDate].filter((t) => t !== time);
            if (filteredTimes.length === 0) {
                const { [selectedDate]: _, ...rest } = selectedDates;
                setSelectedDates(rest);
            } else {
                setSelectedDates({
                    ...(selectedDates || {}),
                    [selectedDate]: filteredTimes,
                });
            }
        } else {
            setSelectedDates({
                ...(selectedDates || {}),
                [selectedDate]: [...((selectedDates && selectedDates[selectedDate]) || []), time],
            });
        }
        console.log(selectedDates);
    };

    const entries = Object.entries(SELECT_TIME_SCHEDULE);

    // entries 배열을 4개씩 나누어 rows 배열에 저장합니다.
    const rows = [];
    for (let i = 0; i < entries.length; i += 4) {
        const rowItems = entries.slice(i, i + 4);
        rows.push(rowItems);
    }

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
                <Txt variant="caption1">선호하는 시간대를 모두 선택해주세요</Txt>
                <SelectTimeContainer>
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex', width: '100%' }}>
                            {row.map(([startTime, time], itemIndex) => (
                                <SelectTimeItem
                                    key={itemIndex}
                                    isSelected={handleCheckIcon(Number(startTime))}
                                    onClick={() => handleSelectTime(Number(startTime))}
                                >
                                    <div>{time}</div>
                                </SelectTimeItem>
                            ))}
                            {/* 마지막 줄이 3개일  경우, 빈 아이템을 추가하여 4개의 크기를 유지합니다 */}
                            {row.length < 4 && (
                                <SelectTimeItem
                                    isSelected={handleCheckIcon(Number(0))}
                                    style={{ visibility: 'hidden' }}
                                />
                            )}
                        </div>
                    ))}
                </SelectTimeContainer>
                {/* <Col
                    style={{ width: '100%', minWidth: 176, display: 'grid' }}
                    gap={12}
                    alignItems="center"
                    justifyContent="center"
                >
                    {Object.entries(SELECT_TIME_SCHEDULE).map(([startTime, timeRange]) => (
                        <Row
                            gap={10}
                            alignItems="center"
                            justifyContent="flex-start"
                            key={startTime}
                        >
                            <IconButton onClick={() => handleSelectTime(Number(startTime))}>
                                {handleCheckIcon(Number(startTime)) ? (
                                    <ActiveCheckIcon />
                                ) : (
                                    <CheckIcon />
                                )}
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
                </Col> */}
            </SelectScheduleContainer>
        </SelectScheduleModalModalContainer>
    );
}

const SelectScheduleModalModalContainer = styled.div<{ open: boolean }>`
    max-width: 512px;
    min-width: 375px;
    width: 100vw;
    height: auto;
    background-color: white;
    position: fixed; // 변경된 부분
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px 20px 0 0;
    z-index: 10;
    transform: translateY(${(props) => (props.open ? '0' : '100%')});
    transition: transform 0.5s ease;
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
    height: 230px;
    overflow-y: scroll;
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

const SelectTimeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    background-color: inherit;
`;
const SelectTimeItem = styled.div<{ isSelected: boolean }>`
    flex: 1 0 calc(25% - 16px); /* 1/4 크기로 나누기 */
    background-color: ${(props) =>
        props.isSelected ? `${colors.purple_light_20}` : `${colors.white}`};
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    color: ${colors.white_40};
    margin-right: 10px; /* 오른쪽 여백 설정 */

    font-size: 13px;

    /* 마지막 요소는 오른쪽 여백을 없애기 위해 margin-right를 0으로 설정합니다 */
    &:last-child {
        margin-right: 0;
    }
`;
