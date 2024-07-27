export interface AuthResponseType {
    userId: string;
    userGrade: string;
    accessToken: string;
    isRegistered: boolean;
}

export type SignUpRequestDataType = {
    userId: string;
    userGrade: string;
    keywords: number[];
};

export type SignInRequestDataType = {
    authPlatform: 'KAKAO' | 'GOOGLE' | 'NAVER',
    code: string,
};