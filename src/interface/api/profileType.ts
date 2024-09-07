export type ProfileType = {
    profileId: number;
    userId: number;
    profileModifyDate: string;
    profileImageUrl: string;
    profileIntro: string;
    profileContents: string;
    profileContactPhone: string;
    profileContactChat: string;
    profileActiveFlag: boolean;
    keywordNameList: string[];
    userGrade: string;
    userNickname: string;
};

type SoltType = {
    direction: string;
    property: string;
    ignoreCase: boolean;
    nullHandling: string;
    ascending: boolean;
    descending: boolean;
};

type PageType = {
    pageNumber: number;
    pageSize: number;
    sort: SoltType[];
    offset: number;
    paged: boolean;
    unpaged: boolean;
};

export interface ProfilesType {
    content: ProfileType[];
    pageable: PageType;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: SoltType[];
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}
