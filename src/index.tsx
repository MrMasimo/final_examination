import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import NewPage from "./pages/NewPage";
import ErrorPage from "./pages/ErrorPage";
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import {AuthProvider, useAuthContext} from "./context/authContext";
import './normalize.css';
import CustomNewsPage from "./pages/CustomNewsPage";
import WriteNewsPage from "./pages/WriteNewsPage";
import { Provider } from 'react-redux'
import {store} from "./store";

const PrivateRoute = ({children}: {children: React.ReactElement}) => {
    const { isLogin } = useAuthContext()
    if (!isLogin) {
        return <Navigate to="/login"/>
    }

    return children
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/news",
                element: <PrivateRoute><NewPage /></PrivateRoute>,
            },
            {
                path: "/custom-news",
                element: <PrivateRoute><CustomNewsPage /></PrivateRoute>,
            },
            {
                path: "/write-news",
                element: <PrivateRoute><WriteNewsPage /></PrivateRoute>,
            },
            {
                path: "/registration",
                element: <RegistrationPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </Provider>
);
