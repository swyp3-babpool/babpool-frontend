import { CommonResponseType } from "@/interface/api/commonType";
import axios, { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { error } from "console";

interface CustomInstance extends AxiosInstance {
    interceptors: {
        request: AxiosInterceptorManager<InternalAxiosRequestConfig<any>>;
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
    withCredentials: true, // cors origin 에러 방지
    timeout: 10000,
    headers: {},
})

client.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken')
    config.headers['Content-Type'] = 'application/json'
    // 토큰이 있을 경우 헤더에 추가
    if (token) {
        config.headers['Authorization'] =  `Bearer ${token}`
    }
    return config
},
    error => {
        return Promise.reject(error)
    }
)

client.interceptors.response.use(
    res => {
    
    return res
},
    error => {
        // 에러 형식에 따른 분기처리
        return Promise.reject(error)
    }
)

export const get = async (url: string, params?: any) => {
    const res: AxiosResponse<any> = await client.get(url, params)
    return res.data
}
export const post = async (url: string, data: any, config?: any) => {
    const res: AxiosResponse<any> = await client.post(url, data, config)
    return res.data
}