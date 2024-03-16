import {
    GetMypageType,
    GetRejectDetailType,
    HistoryType,
    RejectHistoryType,
} from './../../interface/mypageType';
import { CommonResponseType } from '@/interface/api/commonType';
import { get, post } from '../api';

export const getMypageInfo = async () => {
    const res = (await get(`/api/user/mypage`)) as CommonResponseType<GetMypageType>;
    console.log(res);
    return res.data;
};

export const getAcceptHistory = async () => {
    const res = (await get(`/api/appointment/list/done`)) as CommonResponseType<HistoryType[]>;
    console.log(res);
    return res.data;
};

export const getRejectHistory = async () => {
    const res = (await get(`/api/appointment/list/refuse`)) as CommonResponseType<
        RejectHistoryType[]
    >;
    console.log(res);
    return res.data;
};

export const getDetailReject = async (appointmentId: number) => {
    const res = (await get(
        `/api/appointment/refuse/${appointmentId}`
    )) as CommonResponseType<GetRejectDetailType>;
    console.log(res);
    return res.data;
};
