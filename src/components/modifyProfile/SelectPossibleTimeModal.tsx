import React, { useEffect, useRef, useState } from 'react';
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
import Button from '@/components/common/button';
import { modifyProfileRequest, modifyTimeSchedule } from '@/api/profile/modifyProfileApi.ts';


type SelectPossibleTimeModalProps = {
    page: 'mypage' | 'appointment'
    isOpen: boolean;
    onClose: () => void;
    initialDates?: string[];
    selectedDates: string[];
    setSelectedDates: (dates: string[]) => void;
    refetchUserSchedule:any
};

export default function SelectPossibleTimeModal({
    page,
    isOpen,
    onClose,
    initialDates = [],
    selectedDates,
    setSelectedDates,
    refetchUserSchedule
 
}: SelectPossibleTimeModalProps) {    
  
    // 공통 사용
    const selectScheduleModalRef = useRef<HTMLDivElement>(null);
     const [selectedDate, setSelectedDate] = useState<string>(
        moment(new Date()).format('YYYY-MM-DD')
    );
    const [isSelectVerified, setIsSelectVerified] = useState(false);

    useOutsideClickModalClose({ ref: selectScheduleModalRef, isOpen: isOpen, closeModal: onClose });
    

  
    const [entries, setEntries] = useState<[string, string][]>([]);


    useEffect(() => {
        const entries: [string, string][] = page === 'mypage'
            ? Object.entries(SELECT_TIME_SCHEDULE)
            : initialDates.filter(dateTime => dateTime.startsWith(selectedDate))
                .map(dateTime => {
                    let hour = dateTime.substring(11, 13);
                    if (hour.startsWith('0')) {
                        hour = hour.substring(1);
                    }
                    const time = SELECT_TIME_SCHEDULE[hour];
                    return [hour, time];
                })
                .filter((entry): entry is [string, string] => entry[1] !== undefined)
                .sort((a, b) => Number(a[0]) - Number(b[0])); 

        setEntries(entries);
        checkSelected
    }, [page, selectedDate, initialDates]);

    const rows: [string, string][][] = [];
    for (let i = 0; i < entries.length; i += 4) {
        const rowItems = entries.slice(i, i + 4);
        rows.push(rowItems);
    }


    //선택된 날짜가 있으면 완료 버튼 활성화
    useEffect(() => {
        setIsSelectVerified(Object.keys(selectedDates || {}).length > 0);
    }, [selectedDates]);


    const checkSelected = (time: number) => {

        if (!selectedDates) return false;
        const isExist = selectedDates.some(
            (date) =>
                date.startsWith(`${selectedDate}T${time}`) ||
                date.startsWith(`${selectedDate}T0${time}`)
            );

    

        return isExist;
        };

    const handleSelectTime = (time: number) => {
       
        
        const dateTimeString = `${selectedDate}T${time}:00`;

        if (!selectedDates) {
            setSelectedDates([dateTimeString]);
            return;
        }

        const isExist = selectedDates.some(
            (date) =>
                date.startsWith(`${selectedDate}T${time}`) ||
                date.startsWith(`${selectedDate}T0${time}`)
            );

        if (isExist) {
            const filteredTimes = selectedDates.filter(
                (date) =>
                !date.startsWith(`${selectedDate}T${time}`) ||
                date.startsWith(`${selectedDate}T0${time}`)
            );

            setSelectedDates(filteredTimes);
        } else {
            if (time < 10) {
             
                setSelectedDates([...selectedDates, `${selectedDate}T0${time}:00`]);
            } else {
                setSelectedDates([...selectedDates, dateTimeString]);
            }
           
        }
    };


    //사용자 일정 수정 페이지 
    

    const handleTimeSubmit = () => {
        // addList: selectedDates에 있지만 initialDates에 없는 항목
        const addList = selectedDates.filter((date) => {
            const formattedDate = `${date.substring(0, 13)}`; // "2024-08-01T10" 형식으로 자르기
    return !initialDates.some(initialDate => `${initialDate.substring(0, 13)}` === formattedDate);});

        const currentDate = new Date();

        // delList: initialDates에 있지만 selectedDates에 없는 항목
        const delList = initialDates.filter((date) => {
    const formattedDate = date.substring(0, 13); // "YYYY-MM-DDTHH" 형식으로 자르기
    return !selectedDates.some(selectedDate => selectedDate.substring(0, 13) === formattedDate);
});

        const reqBody = {
            possibleDateTimeAddList: addList,
            possibleDateTimeDelList: delList,
        };

        modifyTimeSchedule(reqBody).then(async (res) => {
            if (res.code === 200) {
                window.alert('일정 업데이트가 완료되었습니다!');
                await refetchUserSchedule()
                onClose()
                
            } else if (res.code === 400) {
                console.log('에러발생🚨', res.message);
            }
        });
    };


    //밥약 신청 페이지 

     const handleAppointmentSubmit = () => {
         setSelectedDates(selectedDates)
         onClose();
    };
     



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
                    initialDates={initialDates}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                    page={page}
                />
            </CalendarContainer>
            <SelectScheduleContainer>
                <Txt variant="caption1">{`선호하는 시간대를 ${page === 'mypage' ? '모두' : '하나'} 선택해주세요`}</Txt>
                <SelectTimeContainer>
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex', width: '100%' }}>
                            {row.map(([startTime, time], itemIndex) => (
                                
                                <SelectTimeItem
                                    key={itemIndex}
                                    isSelected={checkSelected(Number(startTime))}
                                    onClick={() => handleSelectTime(Number(startTime))}
                                >
                                    <div>{time}</div>
                                </SelectTimeItem>
                            ))}
                        </div>
                    ))}
                </SelectTimeContainer>
                <ButtonContainer>
                    {page ==='mypage' && <Button
                        text="완료"
                        disabled={!isSelectVerified}
                        type={isSelectVerified ? 'accept' : 'refuse'}
                        onClick={ handleTimeSubmit }
                    />}
                </ButtonContainer>
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
    flex: 0 0 calc(25% - 7.5px);
    margin-right: 10px;
    background-color: ${(props) =>
        props.isSelected ? `${colors.purple_light_20}` : `${colors.white}`};
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    color: ${colors.white_40};
    font-size: 13px;

    /* 마지막 요소는 오른쪽 여백을 없애기 위해 margin-right를 0으로 설정합니다 */
    &:nth-child(4n) {
        margin-right: 0;
    }
`;
const ButtonContainer = styled.div`
    width: 100%;
    height: 48px;
`;
