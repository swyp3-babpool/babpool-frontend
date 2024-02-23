import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import HomePage from '@/pages/home/HomePage';
import SignInPage from '@/pages/signin/SignInPage';
import SignUpPage from '@/pages/signup/SignUpPage';
import NotificationPage from '@/pages/Notification/NotificationPage';
import NotificationDetailPage from '@/pages/Notification/NotificationDetailPage';
import ExplanationPage from '@/pages/explanation/ExplanationPage';
import TotalBabpoolPage from '@/pages/totalBabpool/TotalBabpoolPage';
import ProfileDetailsPage from '@/pages/profileDetails/ProfileDetailsPage';


export default function RouteProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<HomePage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="explanation" element={<ExplanationPage />} />
                <Route path='total' element={<TotalBabpoolPage />} />
                <Route path='total/profile/:userId' element={<ProfileDetailsPage />} />
                <Route path="notification" element={<NotificationPage />} />
                <Route path="notification/:type" element={<NotificationDetailPage />} />
            </>
        )
    );

    return <RouterProvider router={router} />;
}
