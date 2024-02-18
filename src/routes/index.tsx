import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import SignInPage from '@/pages/signin/SignInPage';
import SignUpPage from '@/pages/signup/SignUpPage';
import NotificationPage from '@/pages/Notification/NotificationPage';

export default function RouteProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<HomePage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="notification" element={<NotificationPage />}></Route>
            </>
        )
    );

    return <RouterProvider router={router} />;
}
