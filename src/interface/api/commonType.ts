export interface CommonResponseType<T> {
    timeStamp: string;
    code: number;
    status: string;
    message: string;
    data: T;
}