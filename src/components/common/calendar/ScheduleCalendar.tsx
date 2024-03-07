import  { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { styled } from 'styled-components';
import { colors } from '@/assets/styles/theme';
import moment from 'moment';
import { Value } from 'node_modules/react-calendar/dist/cjs/shared/types';

type ScheduleCalendarProps = {
    onClose: () => void;
};

export default function ScheduleCalendar({onClose}: ScheduleCalendarProps) {
    const [date, setDate] = useState<Value>(new Date());
    const [selectedDate, setSelectedDate] = useState<Value>(null);

    const TEST_DATE = [moment(new Date()).format('YYYY-MM-DD'), '2024-03-03'];

    // 선택한 날짜에 대한 스타일을 정의하는 함수
    const tileContent = ({ date, view }: {date: any, view: any}) => {
       const selected = TEST_DATE.find((test) => test === moment(date).format('YYYY-MM-DD'));
        console.log( moment(date).format('YYYY-MM-DD'))
        if (view === 'month' && selected) {
            return <div className="circle">{`${date.getDate()}`}</div>;
        } else if (view === 'month' && selectedDate === date) {
            return <div className="user-selected">{`${date.getDate()}`}</div>;
        } else {
            return null;
        }
    };

    const handleDateChange = (date: Value) => {
        setSelectedDate(date);
    };

    return (
        <S_Calendar
            value={date}
            onChange={handleDateChange}
            calendarType="gregory"
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="year" // 10년단위 년도 숨기기
            tileContent={tileContent}
            formatDay={(locale, date) => moment(date).format('DD')} // 날짜 숫자만 표시
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
        font-size: 16px;
        font-weight: 600;
        line-height: 21px;
    }

    .react-calendar__navigation {
        margin-bottom: 0;
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

    .circle {
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
`;
