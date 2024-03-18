import { atom } from "recoil";

export type AlarmInfotype = {
    requesterProfileId: number | null;
    messageType: string | null;
    isAlarm: number;
};

export const INIT_ALARM_INFO: AlarmInfotype = {
    requesterProfileId: null,
    messageType: null,
    isAlarm: localStorage.getItem('isAlarm') ? Number(localStorage.getItem('isAlarm')) : 0,
}

export const alarmInfoState = atom<AlarmInfotype>({
    key: 'alarmInfoState',
    default: {
        requesterProfileId: null,
        messageType: null,
        isAlarm: localStorage.getItem('isAlarm') ? Number(localStorage.getItem('isAlarm')) : 0,
    }
})