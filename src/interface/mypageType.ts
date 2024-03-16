export type GetMypageType = {
    profileId: number;
    name: string;
    profileImg: string;
    grade: string;
    intro: string;
    keywords: string[];
    reviewCount: ReviewType;
    histories: HistoryType[];
};

export interface ReviewType {
    best: number;
    good: number;
    bad: number;
}

export type HistoryType = {
    appointmentId: number;
    appointmentReceiverProfileId: number;
    appointmentReceiverUserNickname: string;
    appointmentReceiverProfileImageUrl: string;
    appointmentStatus: string;
    appointmentFixDateTime: string;
    reviewRequired: string;
};

export type RejectHistoryType = {
    appointmentId: number;
    appointmentReceiverProfileId: number;
    appointmentReceiverUserNickname: string;
    appointmentReceiverProfileImageUrl: string;
    appointmentStatus: string;
    refuseCreateDate: string;
    refuseType: string;
};
