import { CommonResponseType } from '@/interface/api/commonType';
import { get, post } from '../api';
import {
    SentBabAppointmentType,
    ReceivedBabAppointmentType,
    DetailBabAppointmentType,
} from '@/interface/api/notifications';

export const getSentBabAppointment = async () => {
    const res = (await get(`/api/appointment/list/send`)) as CommonResponseType<
        SentBabAppointmentType[]
    >;
    console.log(res);
    return res.data;
};

export const getReceivedBabAppointment = async () => {
    const res = (await get(`/api/appointment/list/receive`)) as CommonResponseType<
        ReceivedBabAppointmentType[]
    >;
    console.log(res);
    return res.data;
};

export const getDetailBabAppointment = async (appointmentId: number) => {
    const res = (await get(
        `/api/appointment/detail/${appointmentId}`
    )) as CommonResponseType<DetailBabAppointmentType>;
    console.log(res);
    return res.data;
};

export const appointmentAccept = async (reqBody: any) => {
    const res = (await post(`/api/appointment/accept`, reqBody)) as CommonResponseType<any>;
    return res;
};

export const appointmentReject = async (reqBody: any) => {
    const res = (await post(`/api/appointment/reject`, reqBody)) as CommonResponseType<any>;
    return res;
};

export const appointmentCancel = async (appointmentId: number) => {
    const res = (await post(
        `/api/appointment/cancel/${appointmentId}`,
        {}
    )) as CommonResponseType<any>;
    return res;
};
