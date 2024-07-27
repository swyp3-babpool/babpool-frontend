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
import HistoryPage from '@/pages/mypage/history/HistoryPage';
import SendReviewPage from '@/pages/mypage/review/SendReviewPage';
import MyReceivedReviewsPage from '@/pages/mypage/review/MyReceivedReviews';
import DeleteAccountPage from '@/pages/deleteAccount/DeleteAccountPage';
import AuthRoute from '@/provider/AuthRoute';
import NotificationPage from '@/pages/notification/NotificationPage';
import NotificationDetailPage from '@/pages/notification/detail/NotificationDetailPage';
import AcceptPage from '@/pages/notification/accept/AcceptPage';
import RejectPage from '@/pages/notification/reject/RejectPage';
import ScheduleRegPage from '@/pages/mypage/scheduleReg/ScheduleRegPage';

export default function RouteProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route index element={<HomePage />} />
                <Route path="/auth/kakao/callback" element={<KakaoAuthenticationPage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup/:userId" element={<SignUpPage />} />
                <Route path="explanation" element={<ExplanationPage />} />
                <Route path="total" element={<TotalBabpoolPage />} />
                <Route path="total/profile/:userInfo/review" element={<AuthRoute><ReceivedReviewPage /></AuthRoute>} />
                <Route path="total/profile/:userId" element={<AuthRoute><ProfileDetailsPage /></AuthRoute>} />
                <Route
                    path="total/profile/:targetProfileIdAndName/request"
                    element={<AuthRoute><BabRequestPage /></AuthRoute>}
                />
                <Route path="notification" element={<AuthRoute><NotificationPage /></AuthRoute>} />
                <Route path="notification/:type" element={<AuthRoute><NotificationDetailPage /></AuthRoute>} />
                <Route path="accept" element={<AuthRoute><AcceptPage /></AuthRoute>} />
                <Route path="reject" element={<AuthRoute><RejectPage /></AuthRoute>} />
                <Route path="mypage" element={<AuthRoute><MyPage /></AuthRoute>} />
                <Route path="mypage/profile-modify" element={<AuthRoute><ModifyProfileCardPage /></AuthRoute>} />
                <Route path="mypage/schedule-reg" element={<AuthRoute><ScheduleRegPage /></AuthRoute>} />
                <Route
                    path="total/profile/:targetProfileIdAndName/request"
                    element={<BabRequestPage />}
                />
                <Route path="mypage/history" element={<AuthRoute><HistoryPage /></AuthRoute>} />
                <Route path="mypage/review" element={<AuthRoute><SendReviewPage /></AuthRoute>} />
                <Route path="mypage/my-received-reviews" element={<AuthRoute><MyReceivedReviewsPage /></AuthRoute>} />
                <Route path="deleteAccount" element={<AuthRoute><DeleteAccountPage /></AuthRoute>} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}
