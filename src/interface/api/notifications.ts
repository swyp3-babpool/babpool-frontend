export interface SentBabAppointmentType {
    appointmentId: number;
    appointmentReceiverProfileId: number;
    appointmentReceiverUserNickname: string;
    appointmentReceiverProfileImageUrl: string;
    appointmentStatus: string;
    appointmentCreateDate: string;
    appointmentFixDateTime: string;
}

export interface ReceivedBabAppointmentType {
    appointmentId: number;
    appointmentSenderProfileId: number;
    appointmentSenderUserNickname: string;
    appointmentSenderProfileImageUrl: string;
    appointmentStatus: string;
    appointmentCreateDate: string;
    appointmentFixDateTime: string;
}

export interface DetailBabAppointmentType {
    userNickName: string;
    userGrade: string;
    profileIntro: string;
    profileImgUrl: string;
    keywords: string[];
    lastingTime: LastingTime;
    possibleDateTimes: PossibleTime[];
    question: string;
}

interface LastingTime {
    hour: number;
    minute: number;
}

interface PossibleTime {
    possibleTimeId: number;
    possibleDateId: number;
    possibleDate: string;
    possibleTimeStart: number;
}
