import { CommonResponseType } from "@/interface/api/commonType";
import { get } from "../api"
import { ProfilesType } from "@/interface/api/profileType";

export const getProfiles = async (params: any) => {
    const baseUrl = import.meta.env.VITE_BASE_URL; 
    console.log(baseUrl)
    const res = await get(`/api/profile/list`, {params}) as CommonResponseType<ProfilesType>
    return res.data;
}