import { CommonResponseType } from '@/interface/api/commonType';
import { get, post } from '../api';
import { UserScheduleType } from '@/interface/api/babRequestType';

export const getAvailableSchedule = async (profileId: number) => {
    const res = (await get(`/api/possible/datetime/${profileId}`)) as CommonResponseType<
        UserScheduleType[]
    >;
    return res.data;
};

export const appointmentRequest = async (reqBody: any) => {
    const res = (await post(`/api/appointment`, reqBody)) as CommonResponseType<any>;
    return res;
};
