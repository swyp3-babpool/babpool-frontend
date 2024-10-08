import { CommonResponseType } from '@/interface/api/commonType';
import axios, {
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { logoutRequest, regenerateAccessTokenRequest } from './auth/auth';
import { noPossibleDateAlarm } from '@/atom/alarminfo';
import { useSetRecoilState } from 'recoil';

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
export const client: CustomInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true, // cors origin 에러 방지
    timeout: 10000,
    headers: {},
});

client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');

        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        }

        // 토큰이 있을 경우 헤더에 추가
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // 로컬식별키 헤더에 추가
        if (import.meta.env.VITE_HTTP_HEADER_X_BABPOOL_LOCAL_FRONT) {
            config.headers['x-babpool-local-front'] =
                import.meta.env.VITE_HTTP_HEADER_X_BABPOOL_LOCAL_FRONT;
        }

        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

client.interceptors.response.use(
    (res) => {
        if (res.data.code === 401 && res.data.message === '기간이 만료된 토큰') {
            regenerateAccessTokenRequest().then((response) => {
                if (response.code === 200) {
                    console.log('토큰 재발급 성공');
                    localStorage.setItem('accessToken', response.data);
                    res.config.headers['Authorization'] = `Bearer ${response.data}`;
                    return client(res.config);
                }
                if (response.code === 401 || response.code === 404) {
                    logoutRequest().then((res) => {
                        console.log('리프레시 토큰이 만료되서 로그아웃 처리되었습니다.');
                        localStorage.removeItem('accessToken');
                    });
                }
            });
        }
        return res;
    },
    (error) => {
        // 에러 형식에 따른 분기처리
        console.error(error);
        return Promise.reject(error);
    }
);

export function setupResponseInterceptor(setNoPossibleDateAlarm: (arg0: boolean) => void) {
    client.interceptors.response.use(
        (response) => response,
        (error) => {
            if (
                error.response?.status === 404 &&
                error.response.data?.message === '밥약 가능한 일정이 존재하지 않습니다.'
            ) {
                setNoPossibleDateAlarm(true); // 가능한 일정이 없을 경우 상태를 true로 변경
            }
            return Promise.reject(error);
        }
    );
}

export const get = async (url: string, params?: any) => {
    const res: AxiosResponse<any> = await client.get(url, params);
    return res.data;
};
export const post = async (url: string, data: any, config?: any) => {
    const res: AxiosResponse<any> = await client.post(url, data, config);
    return res.data;
};
