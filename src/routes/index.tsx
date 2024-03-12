import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import HomePage from '@/pages/home/HomePage';
import SignInPage from '@/pages/signin/SignInPage';
import SignUpPage from '@/pages/signup/SignUpPage';
import ExplanationPage from '@/pages/explanation/ExplanationPage';
import TotalBabpoolPage from '@/pages/totalBabpool/TotalBabpoolPage';
import KakaoAuthenticationPage from '@/pages/kakaoAuthentication';
import ProfileDetailsPage from '@/pages/profileDetails/ProfileDetailsPage';
import ReceivedReviewPage from '@/pages/receivedReview/ReceivedReviewPage';
import BabRequestPage from '@/pages/babRequest/BabRequestPage';
import MyPage from '@/pages/mypage/Mypage';
import ModifyProfileCardPage from '@/pages/mypage/modifyProfile/ModifyProfileCardPage';
import RejectPage from '@/pages/notification/reject/RejectPage';
import NotificationPage from '@/pages/notification/NotificationPage';
import NotificationDetailPage from '@/pages/notification/detail/NotificationDetailPage';
import AcceptPage from '@/pages/notification/accept/AcceptPage';
import HistoryPage from '@/pages/mypage/history/HistoryPage';
import SendReviewPage from '@/pages/mypage/review/SendReviewPage';
import MyReceivedReviewsPage from '@/pages/mypage/review/MyReceivedReviews';
import DeleteAccountPage from '@/pages/deleteAccount/DeleteAccountPage';

export default function RouteProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/kakao/callback" element={<KakaoAuthenticationPage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup/:uuid" element={<SignUpPage />} />
                <Route path="explanation" element={<ExplanationPage />} />
                <Route path='total' element={<TotalBabpoolPage />} />
                <Route path='total/profile/:userId' element={<ProfileDetailsPage />} />
                <Route path='total/profile/:userInfo/review' element={<ReceivedReviewPage />} />
                <Route path="total" element={<TotalBabpoolPage />} />
                <Route path="total/profile/:userId" element={<ProfileDetailsPage />} />
                <Route path="total/profile/:userId/review" element={<ReceivedReviewPage />} />
                <Route path="total" element={<TotalBabpoolPage />} />
                <Route path="total/profile/:userId" element={<ProfileDetailsPage />} />
                <Route
                    path="total/profile/:targetProfileIdAndName/request"
                    element={<BabRequestPage />}
                />
                <Route path="notification" element={<NotificationPage />} />
                <Route path="notification/:type" element={<NotificationDetailPage />} />
                <Route path="accept" element={<AcceptPage />} />
                <Route path="reject" element={<RejectPage />} />
                <Route path="mypage" element={<MyPage />} />
                <Route path="mypage/profile-modify" element={<ModifyProfileCardPage />} />
                <Route path="mypage/history" element={<HistoryPage />} />
                <Route path="mypage/review" element={<SendReviewPage />} />
                <Route path="mypage/my-received-reviews" element={<MyReceivedReviewsPage />} />
                <Route path="deleteAccount" element={<DeleteAccountPage />} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}
