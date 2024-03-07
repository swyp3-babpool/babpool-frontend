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

export default function RouteProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/kakao/callback" element={<KakaoAuthenticationPage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="explanation" element={<ExplanationPage />} />
                <Route path='total' element={<TotalBabpoolPage />} />
                <Route path='total/profile/:userId' element={<ProfileDetailsPage />} />
                <Route path='total/profile/:userId/review' element={<ReceivedReviewPage />} />
                <Route path="total" element={<TotalBabpoolPage />} />
                <Route path="total/profile/:userId" element={<ProfileDetailsPage />} />
                <Route path="total/profile/:userId/request" element={<BabRequestPage />} />
                <Route path="notification" element={<NotificationPage />} />
                <Route path="notification/:type" element={<NotificationDetailPage />} />
                <Route path="accept" element={<AcceptPage />} />
                <Route path="reject" element={<RejectPage />} />
                <Route path="mypage" element={<MyPage />} />
                <Route path="mypage/profile-modify" element={<ModifyProfileCardPage />} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}
