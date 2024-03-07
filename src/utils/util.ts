import { KeywordType } from '@/components/signup/KeywordGroup';

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
        case '1학년': return 'FIRST_GRADE'
        case '2학년': return 'SECOND_GRADE'
        case '3학년': return 'THIRD_GRADE'
        case '4학년': return 'FOURTH_GRADE'
        case '졸업생': return 'GRADUATE'
        case '대학원생': return 'POST_GRADUATE'
    }
}

export const getDivisionName = (division: string) => {
    switch (division) {
        case 'FIRST_GRADEFIRST_GRADE': return '1학년'
        case 'SECOND_GRADE': return '2학년'
        case 'THIRD_GRADE': return '3학년'
        case 'FOURTH_GRADE': return '4학년'
        case 'GRADUATE': return '졸업생'
        case 'POST_GRADUATE': return '대학원생'
    }
}

export const getKeywordId = (keyword: string) => {
    switch (keyword) {
        case '전공': return 1
        case '편입생': return 2
        case '자취': return 3
        case '동아리': return 4
        case '스터디': return 5
        case '대외활동': return 6
        case '유학생': return 7
        case '네트워킹': return 8
        case '공직': return 9
        case '기사': return 10
        case '스터디': return 11
        case '전문직': return 12
        case '대기업': return 13
        case '스타트업': return 14
        case '진로탐색': return 15
        case '자기소개/이력서': return 16
        case '포트폴리오': return 17
        case '인턴': return 18
        case '해외취업': return 19
        case '면접': return 20
        case '창업': return 21
        case '석사': return 22
        case '박사': return 23
        case '대학원 준비': return 24
        default: return 0
    }
}