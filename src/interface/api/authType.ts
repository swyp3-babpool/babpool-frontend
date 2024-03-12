export interface AuthResponseType {
    userUuid: string;
    userGrade: string;
    accessToken: string;
    isRegistered: boolean;
}

export type SignUpRequestDataType = {
    userUuid: string;
    userGrade: string;
    keywords: number[];
};

export type SignInRequestDataType = {
    authPlatform: 'KAKAO' | 'GOOGLE' | 'NAVER',
    code: string,
};