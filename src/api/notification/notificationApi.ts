import { CommonResponseType } from '@/interface/api/commonType';
import { get, post } from '../api';
import { SentBabAppointmentType, ReceivedBabAppointmentType } from '@/interface/api/notifications';

export const getSentBabAppointment = async () => {
    const res = (await get(`/api/appointment/list/send`)) as CommonResponseType<
        SentBabAppointmentType[]
    >;
    console.log(res);
    return res.data;
};

export const getReceivedBabAppointment = async () => {
    const res = (await get(`/api/appointment/list/received`)) as CommonResponseType<
        ReceivedBabAppointmentType[]
    >;
    console.log(res);
    return res.data;
};

export const appointmentRequest = async (reqBody: any) => {
    const res = (await post(`/api/appointment`, reqBody)) as CommonResponseType<any>;
    return res;
};
