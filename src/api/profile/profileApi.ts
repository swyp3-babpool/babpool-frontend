import { CommonResponseType } from '@/interface/api/commonType';
import { get } from '../api';
import { ProfilesType } from '@/interface/api/profileType';
import { ReviewCountType } from '@/interface/api/profileDetailsType';
import { loginCheck } from '@/utils/validate';

export const getProfiles = async (params: any) => {
    const res = (await get(`/api/profile/list`, { params })) as CommonResponseType<ProfilesType>;
    return res.data;
};

export const getUserProfile = async (userId: string) => {
    const res = (await get(`/api/profile/detail/${userId}`)) as CommonResponseType<any>;
    console.log(res);
    return res.data;
};

export const getReviewList = async (params: any) => {
    const res = (await get('/api/review/list', {
        params,
    })) as CommonResponseType<any>;
    console.log(res);
    return res.data;
};

export const getReviewCounts = async (userId: string) => {
    const res = (await get(`/api/review/${userId}/count`)) as CommonResponseType<ReviewCountType>;
    console.log(res);
    return res.data;
};

export const getUserGrade = async () => {
    if(!loginCheck()) {
        return;
    }
    const res = (await get(`/api/user/grade`)) as CommonResponseType<any>;
    console.log(res);
    return res.data;
}

export const getisRegistrationProfile = async () => {
    if(!loginCheck()) {
        return;
    }
    const res = (await get(`/api/profile/registration/check`)) as CommonResponseType<any>;
    console.log(res);
    return res.data;
}
