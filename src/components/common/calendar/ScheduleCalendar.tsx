import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { styled } from 'styled-components';
import { colors } from '@/assets/styles/theme';
import moment, { MomentInput } from 'moment';
import { Value } from 'node_modules/react-calendar/dist/cjs/shared/types';
import { UserScheduleType } from '@/interface/api/babRequestType';
import { ReactComponent as NextIcon } from '@/assets/icons/ic_next.svg';
import { ReactComponent as PrevIcon } from '@/assets/icons/ic_prev.svg';
import { RequestInfoType } from '@/pages/babRequest/BabRequestPage';

type ScheduleCalendarProps = {
    userSchedule: UserScheduleType[];
    requestInfo: RequestInfoType;
    handleSetPossibleSchedule: (scheduleList: UserScheduleType[]) => void;
};

export default function ScheduleCalendar({
    userSchedule,
    requestInfo,
    handleSetPossibleSchedule,
}: ScheduleCalendarProps) {
    const [date, setDate] = useState<Value>(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    // 선택 가능한 날짜(일)
    const possibleDate = [
        ...new Set(userSchedule.map((schedule: UserScheduleType) => schedule.possibleDateTime)),
    ];


    // 선택한 날짜의 선택 가능한 스케줄 리스트
    const currentSeletedDateScheduleList = userSchedule.filter((schedule: UserScheduleType) => {
        return schedule.possibleDateTime === selectedDate;
    });


    // 선택한 날짜에 대한 스타일을 정의하는 함수
    const tileContent = ({ date, view }: { date: any; view: any }) => {
        const formatDate = moment(date).format('YYYY-MM-DD');
        const today = moment().format('YYYY-MM-DD');
        const selected = possibleDate.find((test) => test === formatDate);
        if (view === 'month' && selectedDate === formatDate && formatDate >= today) {
            return <div className="user-selected">{`${date.getDate()}`}</div>;
        } else if (view === 'month' && selected && formatDate >= today) {
            return <div className="highlight">{`${date.getDate()}`}</div>;
        } else {
            return null;
        }
    };

    const handleDateChange = (date: Value) => {
        const formatDate = moment(date as MomentInput).format('YYYY-MM-DD');
        const today = moment().format('YYYY-MM-DD');
        if(formatDate < today) return; 
        const userScheduleDates = userSchedule.map(
            (schedule: UserScheduleType) => schedule.possibleDateTime
        );
        const validateDate = userScheduleDates.includes(formatDate);
        if (validateDate) {
            setSelectedDate(formatDate);
        }
    };

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        const filterDate = userSchedule.filter((schedule: UserScheduleType) => schedule?.possibleDateTime >= today )
        console.log(filterDate)
        if(filterDate.length === 0) {
            return;
        }
        setSelectedDate(filterDate[0].possibleDateTime)
        setDate(new Date(filterDate[0].possibleDateTime))
    }, [])

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        const filterDate = userSchedule.filter((schedule: UserScheduleType) => schedule?.possibleDateTime >= today )
        console.log(filterDate)
        if(filterDate.length === 0) {
            return;
        }
        setSelectedDate(filterDate[0].possibleDateTime)
        setDate(new Date(filterDate[0].possibleDateTime))
    }, [requestInfo])

    useEffect(() => {
        handleSetPossibleSchedule(currentSeletedDateScheduleList);
    }, [selectedDate, requestInfo]);

    

    return (
        <S_Calendar
            value={date}
            onChange={handleDateChange}
            calendarType="gregory"
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="month" // 10년단위 년도 숨기기
            tileContent={tileContent}
            formatDay={(locale, date) => moment(date).format('DD')} // 날짜 숫자만 표시
            prevLabel={<PrevIcon />} // 이전 버튼을 왼쪽 화살표 아이콘으로 변경
            nextLabel={<NextIcon />} // 다음 버튼을 오른쪽 화살표 아이콘으로 변경
        />
    ); // 연도 이동 화살표를 없애 ;
}

const S_Calendar = styled(Calendar)`
    width: 100%;
    height: auto;
    border: none;
    .react-calendar {
        border-radius: 10px;
        border: 1px solid red; // 전체 틀: border, border-radius 조정
    }

    .react-calendar__navigation__label > span {
        // 달력 상단 년/월 글씨 커스텀
        color: black;
        font-size: 16px !important;
        font-weight: 600 !important;
        font-family: Pretendard !important;
        line-height: 21px !important;
        background: white !important;
    }

    .react-calendar__navigation__label {
        background: white !important;
        cursor: default !important;
        flex-grow: 0 !important;
    }

    .react-calendar__navigation {
        margin-bottom: 0;
        background-color: white !important;
        display: flex;
        justify-content: center;
    }

    /* 전체 폰트 컬러 */
    .react-calendar__month-view {
        abbr {
            color: ${colors.white_20};
            text-decoration: line-through;
        }
    }

    .react-calendar__tile--now {
        // 오늘 날짜 하이라이트 커스텀
        background: white;
        color: ${colors.white_20};
    }

    .react-calendar__month-view__weekdays__weekday {
        padding: 20px 10px;
        abbr {
            color: ${colors.white_50};
            font-family: Pretendard;
            font-size: 13px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
        }
    }

    .react-calendar__month-view__days__day {
        padding: 20px 10px;
    }

    .react-calendar__navigation {
        justify-content: center;
    }

    // 요일 밑줄 제거
    .react-calendar__month-view__weekdays abbr {
        text-decoration: none;
        font-weight: 800;
    }

    /* 일 날짜 간격 */
    .react-calendar__tile {
        padding: 14px 0;
        position: relative;
        cursor: default !important;
    }

    .react-calendar__month-view__weekdays__weekday {
        padding: 14px 0;
        position: relative;
    }

    .highlight {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-color: ${colors.purple_light_20};
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }

    .user-selected {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-color: ${colors.purple_light_40};
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        //hover 했을 때 색상 변경
        background: white;
    }

    .react-calendar__tile--active {
        background: white;
        color: white;
    }

    //disabled 된 날짜 배경색 없애기
    .react-calendar__tile:disabled {
        background: none;
    }

    .react-calendar__navigation button[disabled] {
        background: none;
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        //hover 했을 때 색상 변경
        background: none;
        color: inherit;
    }

    .react-calendar__navigation__label:hover,
    .react-calendar__navigation__label:focus,
    .react-calendar__navigation__arrow:hover,
    .react-calendar__navigation__arrow:focus {
        background-color: white !important;
        color: inherit; // hover 했을 때 색상 변경을 없애기 위해 기존 색상을 유지
    }
    s .react-calendar__tile--active {
        background: white;
        color: white;
    }

    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
        margin: 3px 3px 0 !important; // 화살표와 년도/월 사이의 간격을 조정
    }
`;
