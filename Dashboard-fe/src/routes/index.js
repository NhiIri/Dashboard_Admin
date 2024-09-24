import AdminPage from "../pages/AdminPage/AdminPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

export const routes = [
    {
        path: '/',
        page: AdminPage,
        isShowHeader: false,
        isPrivated: true
    },

    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },

   
    {
        path: '*',
        page: NotFoundPage
    }
]