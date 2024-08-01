import { get } from './../api/api';
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

export const getMonthFormatDate = (date: Date | string) => {
    const day = new Date(date).getDay();
    const formatDate = moment(date).locale('ko').format('MM/DD');
    return `${formatDate} (${WEEKS[day]})`;
};
