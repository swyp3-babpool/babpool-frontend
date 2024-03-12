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
import ModifyProfileCardPage from '@/pages/mypage/ModifyProfileCardPage';
import RejectPage from '@/pages/Notification/RejectPage';
import NotificationPage from '@/pages/Notification/NotificationPage';
import NotificationDetailPage from '@/pages/Notification/NotificationDetailPage';
import AcceptPage from '@/pages/Notification/AcceptPage';
import AuthProvider from '@/provider/AuthRoute';
import AuthRoute from '@/provider/AuthRoute';

export default function RouteProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route index element={<HomePage />} />
                <Route path="/auth/kakao/callback" element={<KakaoAuthenticationPage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup/:uuid" element={<SignUpPage />} />
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
            </>
        )
    );

    return <RouterProvider router={router} />;
}
