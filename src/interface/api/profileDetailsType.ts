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
    reviews: {
        appointmentId: number;
        reviewComment: string;
        reviewCreateDate: string;
        reviewId: number;
        reviewRate: string;
    }[];
}
