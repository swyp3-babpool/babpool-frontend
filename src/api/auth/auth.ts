import { CommonResponseType } from "@/interface/api/commonType"
import { post } from "../api"
import { AuthResponseType, SignInRequestDataType, SignUpRequestDataType } from "@/interface/api/authType"

export const signUpRequest = async (requestBody: SignUpRequestDataType): Promise<CommonResponseType<AuthResponseType>> => {
    const res = await post(`/api/user/sign/up`, requestBody)
    console.log(res)
    return res
}

export const signInRequest = async (requestBody: SignInRequestDataType): Promise<CommonResponseType<AuthResponseType>> => {
    const res = await post(`/api/user/sign/in`, requestBody)
    console.log(res)
    return res
}

export const logoutRequest = async (): Promise<CommonResponseType<null>> => {
    const res = await post(`/api/user/sign/out`, {})
    return res
}

export const regenerateAccessTokenRequest = async (): Promise<CommonResponseType<string>> => {
    const res = await post(`api/token/access/refresh`, {})
    return res
}