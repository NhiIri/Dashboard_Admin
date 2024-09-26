import AdminCategoryPage from "../pages/AdminCategoryPage/AdminCategoryPage";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboardPage";
import AdminProductPage from "../pages/AdminProductPage/AdminProductPage";
import AdminUserPage from "../pages/AdminUserPage/AdminUserPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

export const routes = [
    {
        path: '/',
        page: AdminDashboard,
        isShowHeader: false
    },

    {
        path: '/admin-category',
        page: AdminCategoryPage,
        isShowHeader: false
    },

    {
        path: '/admin-product',
        page: AdminProductPage,
        isShowHeader: false
    },

    {
        path: '/admin-user',
        page: AdminUserPage,
        isShowHeader: false
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