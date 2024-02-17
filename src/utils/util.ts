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
