import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import HomePage from '../pages/home/HomePage';

export default function RouteProvider() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<HomePage />}>

            </Route>
        )
    )
    
    return (
        <RouterProvider router={router} />
    );
}

