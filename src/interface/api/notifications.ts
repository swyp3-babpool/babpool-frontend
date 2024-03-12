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
