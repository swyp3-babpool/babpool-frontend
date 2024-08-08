import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Txt from '../common/text';
import { ReactComponent as CloseIcon } from '@/assets/icons/ic_close.svg';
import { colors } from '@/assets/styles/theme';
import SelectTimeBox from './SelectTimeBox';
import useOutsideClickModalClose from '@/hooks/useOutsideClickModalClose';
import ScheduleCalendar from '../common/calendar/ScheduleCalendar';
import { EmptyDiv } from '@/pages/notification/NotificationPage.styles';
import { useQuery } from '@tanstack/react-query';
import { getAvailableSchedule } from '@/api/babRequest/babRequestApi';
import { UserScheduleType } from '@/interface/api/babRequestType';
import { RequestInfoType } from '@/pages/babRequest/BabRequestPage';
import SelectPossibleTimeModal from '@/components/modifyProfile/SelectPossibleTimeModal';
import { useNavigation } from '@/hooks/useNavigation';

type SelectScheduleModalProps = {
    isOpen: boolean;
    userId: number;
    requestInfo: RequestInfoType;
    handleSelectSchedule: (selectedSchedule: string[]) => void;
    onClose: () => void;
};

export default function SelectScheduleModal({
    isOpen,
    userId,
    requestInfo,
    handleSelectSchedule,
    onClose,
}: SelectScheduleModalProps) {
    const [possibleScheduleList, setPossibleScheduleList] = useState<string[]>([]);
    const selectScheduleModalRef = useRef<HTMLDivElement>(null);
     const alertShownRef = useRef(false); // alert 표시 여부를 추적하는 ref

    const {
        data: userSchedule,
        isLoading,
        isError,
    } = useQuery<UserScheduleType[]>({
        queryKey: [`/api/possible/datetime/${userId}`, userId],
        queryFn: () => getAvailableSchedule(Number(userId)),
    });
      const { goBack } = useNavigation();

    
    const handleSetPossibleSchedule = (scheduleList: UserScheduleType[]) => {

        const filterScheduleList = scheduleList.filter((schedule: UserScheduleType) => {
            console.log(schedule)
            return schedule.possibleDateTimeStatus === 'Available';
        });
        setPossibleScheduleList(filterScheduleList ? filterScheduleList.map((item) => item.possibleDateTime) : []);
       if (filterScheduleList.length === 0 && !alertShownRef.current) {
        // alert("가능한 시간이 없습니다!");
        // alertShownRef.current = true; // alert이 표시되었음을 기록
        // goBack(); 
    }
    };

    useEffect(() => {
    handleSetPossibleSchedule(userSchedule ? userSchedule : []);
  }, [userSchedule]);
   
    useOutsideClickModalClose({ ref: selectScheduleModalRef, isOpen: isOpen, closeModal: onClose });

    return (
        !isLoading &&
        isOpen && (
             <SelectPossibleTimeModal
                                page={'appointment'}
                                selectedDates={possibleScheduleList}
                                setSelectedDates={handleSelectSchedule}
                                isOpen={isOpen}
                                onClose={onClose}
                          />        
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
    flex-wrap: wrap;
    gap: 16px;
    background-color: inherit;
`;

const IconBox = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

const NoTimeBox = styled.div`
    width: 100%;
    display: grid;
    place-items: center;
`;
