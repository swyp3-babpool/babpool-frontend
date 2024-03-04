import { CommonResponseType } from "@/interface/api/commonType";
import axios, { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from "axios"

interface CustomInstance extends AxiosInstance {
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse<CommonResponseType<any>>>;
    };
    getUri(config?: AxiosRequestConfig): string;
    request<T>(config: AxiosRequestConfig): Promise<T>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

const client: CustomInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {},
})

client.interceptors.request.use(req => {
    const token = localStorage.getItem('token')
    if (token) {
        req.headers['Authorization'] =  `Bearer ${token}`
    }
})

client.interceptors.response.use(res => {
    
})

export const get = async (url: string, params: any) => {
    const res = await client.get(url, params)
    return res.data
}
export const post = async (url: string, data: any, config?: any) => {
    const res = await client.post(url, data, config)
    return res.data
}