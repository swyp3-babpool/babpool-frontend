import { INIT_INTEREST_KEYWORD, INTEREST_KEYWORD } from "@/utils/constant";
import { atom } from "recoil";

export type AlarmInfotype = {
    requestProfileId: number | null;
    acceptMessage: string | null;
};

export const alarmInfoState = atom({
    key: 'alarmInfoState',
    default: {
        requestProfileId: null,
        acceptMessage: null,
    }
})