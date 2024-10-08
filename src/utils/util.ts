import { KeywordType } from '@/components/signup/KeywordGroup';
import moment from 'moment';
import 'moment/locale/ko';
import { WEEKS } from './constant';

export const getDateTime = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
    const hour = dateObj.getHours();
    const period = hour < 12 ? '오전' : '오후';
    const hour12 = hour <= 12 ? hour : hour - 12;
    return `${month}/${day}(${dayOfWeek}) ${period} ${hour12}-${hour12 !== 12 ? hour12 + 1 : 1}시`;
};

export const getDate = (date: string, hour: number) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
    const hour2 = hour + 1;
    const period1 = hour < 12 ? '오전' : '오후';
    const period2 = hour2 < 12 ? '오전' : '오후';
    const hour1by12 = hour % 12 === 0 ? 12 : hour % 12;
    const hour2by12 = hour2 % 12 === 0 ? 12 : hour2 % 12;
    return `${month}/${day}(${dayOfWeek}) ${period1} ${hour1by12}:00 ~ ${period2} ${hour2by12}:00`;
};

// 날짜와 시간을 포맷팅하는 함수
export function formatDateTime(dateTimeString: string) {
    // 입력된 ISO 형식의 날짜를 moment 객체로 변환
    const date = moment(dateTimeString);

    // 1. 날짜 포맷 설정 - 월/일(요일)
    const englishDay = date.format('ddd'); // 요일을 영어 약어로 추출
    const koreanDay = getKoreanDay(englishDay); // 영어 요일을 한국어로 변환
    const formattedDate = date.format(`M/D(${koreanDay})`); // 월/일(요일) 포맷

    // 2. 시간 포맷 설정 - 오전/오후 시:분
    const formattedTime = date.format('A hh:mm');
    const finalFormattedTime = formattedTime.replace('AM', '오전').replace('PM', '오후');

    // 3. 최종 포맷 조합
    return `${formattedDate} ${finalFormattedTime}`;
}

function getKoreanDay(englishDay: string) {
    // 영어 요일 약어와 한국어 요일 약어 매핑
    const daysMap: { [key: string]: string } = {
        'Sun': '일',
        'Mon': '월',
        'Tue': '화',
        'Wed': '수',
        'Thu': '목',
        'Fri': '금',
        'Sat': '토'
    };

    // 매핑된 한국어 요일 반환
    return daysMap[englishDay] || undefined;
}

export const getReviewType = (reviewType: string) => {
    switch (reviewType) {
        case 'best':
            return '최고예요';
        case 'good':
            return '좋아요';
        case 'bad':
            return '별로예요';
        default:
            return '';
    }
};

export const getReviewTypeToServer = (reviewType: string) => {
    switch (reviewType) {
        case '최고예요':
            return 'BEST';
        case '좋아요':
            return 'GREAT';
        case '별로예요':
            return 'BAD';
        default:
            return '';
    }
};

export const getKeywordGroupTitle = (keywordGroup: KeywordType) => {
    switch (keywordGroup) {
        case 'university':
            return '대학생활';
        case 'exam':
            return '수험';
        case 'employment':
            return '취업';
        case 'graduateSchool':
            return '대학원';
        default:
            return '';
    }
};

export const getDivisionId = (division: string) => {
    switch (division) {
        case '1학년':
            return 'FIRST_GRADE';
        case '2학년':
            return 'SECOND_GRADE';
        case '3학년':
            return 'THIRD_GRADE';
        case '4학년':
            return 'FOURTH_GRADE';
        case '졸업생':
            return 'GRADUATE';
        case '대학원생':
            return 'POST_GRADUATE';
    }
};

export const getDivisionName = (divisionId: string) => {
    switch (divisionId) {
        case 'FIRST_GRADE':
            return '1학년';
        case 'SECOND_GRADE':
            return '2학년';
        case 'THIRD_GRADE':
            return '3학년';
        case 'FOURTH_GRADE':
            return '4학년';
        case 'GRADUATE':
            return '졸업생';
        case 'POST_GRADUATE':
            return '대학원생';
    }
};

export const getKeywordId = (keyword: string) => {
 switch (keyword) {
    case '전공':
        return '598340246278506499';
    case '편입생':
        return '598340246278506500';
    case '자취':
        return '598340246278506501';
    case '동아리':
        return '598340246278506502';
    case '스터디':
        return '598340246282702823';
    case '대외활동':
        return '598340246282702824';
    case '유학생':
        return '598340246282702825';
    case '네트워킹':
        return '598340246282702826';
    case '공직':
        return '598340246282702827';
    case '기사':
        return '598340246286893150';
    case '스터디':
        return '598340246286893151';
    case '전문직':
        return '598340246286893152';
    case '대기업':
        return '598340246286893153';
    case '스타트업':
        return '598340246291091010';
    case '진로탐색':
        return '598340246299478613';
    case '자기소개/이력서':
        return '598340246299478614';
    case '포트폴리오':
        return '598340246299478615';
    case '인턴':
        return '598340246303671397';
    case '해외취업':
        return '598340246307867864';
    case '면접':
        return '598340246312059814';
    case '창업':
        return '598340246312059815';
    case '석사':
        return '598340246316256184';
    case '박사':
        return '598340246320448759';
    case '대학원 준비':
        return '598340246320448760';
    default:
        return '0';
}

}


export const getMonthFormatDate = (date: Date | string) => {
    const day = new Date(date).getDay();
    const formatDate = moment(date).locale('ko').format('MM/DD');
    return `${formatDate} (${WEEKS[day]})`;
};

export const getMonthFormatMonth = (date: Date | string) => {
     const month = new Date(date).getMonth() + 1;
   
    return month;
};

export function getHour(date: Date | string) {
    const hour = new Date(date).getHours();
    return hour;
}
