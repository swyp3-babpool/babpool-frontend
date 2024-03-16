import { GetMypageType, HistoryType, RejectHistoryType } from './../../interface/mypageType';
import { CommonResponseType } from '@/interface/api/commonType';
import { get, post } from '../api';
import { GetReviewType } from '@/interface/api/reviewType';

export const getReview = async (appointmentId: number) => {
    const res = (await get(`/api/review/${appointmentId}`)) as CommonResponseType<GetReviewType>;
    console.log(res);
    return res.data;
};

export const sendReview = async (reqBody: any) => {
    const res = (await post(`/api/review/create`, reqBody)) as CommonResponseType<any>;
    return res;
};
