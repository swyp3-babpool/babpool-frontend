export interface TimeRange {
    [key: string]: number[];
}

export interface KeywordType {
    대학생활: string[];
    수험: string[];
    취업: string[];
    대학원: string[];
}

export interface ModifyProfileType {
    userNickName: string;
    userGrade: string;
    imgUrl: string;
    profileIntro: string;
    profileContents: string;
    profileContactPhone: string;
    profileContactChat: string;
    keywords: KeywordType;
}

export interface GetModifyProfilePossibleTimeType {
    profileId: number;
    possibleTimeId: number;
    possibleDateId: number;
    possibleDate: string;
    possibleTime: number;
}
