export interface ProfileDetailsType {
    name: string;
    grade: string;
    contents: string;
    intro: string;
    keywords: string[];
    profileImg: string;
    reviewCount: {
        best: number;
        good: number;
        bad: number;
    };
    reviews: ReviewType[];
}

export type ReviewCountType = {
    bestCount: number;
    greatCount: number;
    badCount: number;
}

export type ReviewType = {
    appointmentId: number;
    reviewComment: string;
    reviewCreateDate: string;
    reviewId: number;
    reviewRate: string;
};
