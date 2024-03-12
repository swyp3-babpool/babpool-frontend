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

export const getModifyProfileAvailableSchedule = async (profileId: number) => {
    const res = (await get(`/api/appointment/${profileId}/datetime`)) as CommonResponseType<
        GetModifyProfilePossibleTimeType[]
    >;
    console.log(res);
    return res.data;
};

export const modifyProfileRequest = async (reqBody: any) => {
    const res = (await post(`/api/profile/update`, reqBody)) as CommonResponseType<any>;
    return res;
};
