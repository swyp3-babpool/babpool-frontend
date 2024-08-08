import { CommonResponseType } from '@/interface/api/commonType';
import { get, post } from '../api';
import {
    GetModifyProfilePossibleTimeType,
    ModifyProfileType,
} from '@/interface/api/modifyProfileType';

export const getModifyProfile = async () => {
    const res = (await get(`/api/profile/default`)) as CommonResponseType<ModifyProfileType>;
    console.log(res);
    return res.data;
};

export const getModifyProfileAvailableSchedule = async (profileId: string) => {
    const res = (await get(`/api/possible/datetime/${profileId}`)) as CommonResponseType<
        GetModifyProfilePossibleTimeType[]
    >;
    console.log(res);
    return res.data;
};

export const modifyProfileRequest = async (reqBody: any) => {
    const res = (await post(`/api/profile/update`, reqBody)) as CommonResponseType<any>;
    return res;
};

export const modifyTimeSchedule = async (reqBody: any) => {
    const res = (await post(`/api/possible/datetime`, reqBody)) as CommonResponseType<any>;
    return res;
};
