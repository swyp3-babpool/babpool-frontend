import { INIT_INTEREST_KEYWORD, INTEREST_KEYWORD } from '@/utils/constant';
import { atom } from 'recoil';

export type SearchInfoType = {
    searchText: string;
    division: string[];
    filterKeyword: {
        university: string[]; // 대학생활
        exam: string[]; // 수험
        employment: string[]; // 취업
        graduateSchool: string[]; // 대학원
    };
    page: number;
    lastProfileId?: string;
    lastProfileModifyDate?: string;
};

export const INIT_SEARCH_INFO = {
    searchText: '',
    division: [] as string[],
    filterKeyword: INIT_INTEREST_KEYWORD,
    prevFilterKeyword: INIT_INTEREST_KEYWORD,
    page: 0,
    lastProfileId: '',
    lastProfileModifyDate: '',
};

export const searchInfoState = atom({
    key: 'searchInfoState',
    default: INIT_SEARCH_INFO,
});

export const noPossibleDateAlarm = atom<boolean>({
    key: 'noPossibleDateAlarm', // Recoil에서 고유한 key
    default: false, // 초기값
});
