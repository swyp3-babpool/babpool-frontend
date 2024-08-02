import { ReactNode, useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar, { TileContentFunc } from 'react-calendar';
import { styled } from 'styled-components';
import { colors } from '@/assets/styles/theme';
import moment from 'moment';
import { Value } from 'node_modules/react-calendar/dist/cjs/shared/types';
import { ReactComponent as NextIcon } from '@/assets/icons/ic_next.svg';
import { ReactComponent as PrevIcon } from '@/assets/icons/ic_prev.svg';
import { TimeRange } from '@/interface/api/modifyProfileType';
type PossibleTimeCalendarProps = {
    onClose: () => void;
    initialDates: string[];
    selectedDate?: string;
    setSelectedDate: (date: string) => void;
    selectedDates?: string[];
    setSelectedDates: (dates: string[]) => void;
};
export default function PossibleTimeCalendar({
    onClose,
    selectedDate,
    setSelectedDate,
    selectedDates,
    setSelectedDates,
}: PossibleTimeCalendarProps) {
    const [date, setDate] = useState<Value>(new Date());
    const [tileContent, setTileContent] = useState<TileContentFunc | undefined>(undefined);

    const handleDateChange = (date: Value) => {
        const selected = Array.isArray(date) ? date[0] : date;
        setSelectedDate(moment(selected).format('YYYY-MM-DD'));
    };

    const tileClassName = ({ date, view }: { date: any; view: any }) => {
        const today = moment().startOf('day');
        const currentDay = moment(date);

        if (view === 'month' && currentDay.isBefore(today)) {
            return 'strikethrough';
        } else {
            return null;
        }
    };

    useEffect(() => {
        setTileContent(() => {
            return ({ date, view }: { date: any; view: any }) => {
                const formattedDate = moment(date).format('YYYY-MM-DD');
                // console.log("콘솔 작동중!!!!🚨", "selectedDates는", selectedDates  )
                const selected = selectedDate === formattedDate;
                const dateOnlyArray =
                    selectedDates && Array.isArray(selectedDates)
                        ? selectedDates.map((dateTime) => dateTime.split('T')[0])
                        : [];

                const existingDate = dateOnlyArray.includes(formattedDate);
                if (view === 'month' && selected) {
                    return <div className="circle">{`${date.getDate()}`}</div>;
                } else if (view === 'month' && existingDate) {
                    return <div className="highlight">{`${date.getDate()}`}</div>;
                } else {
                    return null;
                }
            };
        });
    }, [selectedDates, selectedDate]);

    return (
        <S_Calendar
            value={date}
            onChange={handleDateChange}
            calendarType="gregory"
            minDate={new Date()}
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="month" // 10년단위 년도 숨기기
            tileContent={tileContent}
            tileClassName={tileClassName}
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
        }
    }

    .react-calendar__tile--now {
        // 오늘 날짜 하이라이트 커스텀
        background: white !important;
        color: ${colors.white_20}!important;
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

    .strikethrough {
        content: '';
        text-decoration: line-through;
        color: ${colors.white_20};
    }

    // 요일 글씨 커스텀
    .react-calendar__month-view__weekdays__weekday {
        padding: 20px 10px;

        abbr {
            color: ${colors.white_50};
            font-family: Pretendard;
            font-size: 13px;
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
