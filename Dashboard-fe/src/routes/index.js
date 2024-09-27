import AdminAccountPage from "../pages/AdminAccountPage/AdminAccountPage";
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
        isShowSideMenu: true
    },

    {
        path: '/admin-category',
        page: AdminCategoryPage,
        isShowSideMenu: true
    },

    {
        path: '/admin-product',
        page: AdminProductPage,
        isShowSideMenu: true
    },

    {
        path: '/admin-user',
        page: AdminUserPage,
        isShowSideMenu: true
    },
    {
        path: '/admin-account',
        page: AdminAccountPage,
        isShowSideMenu: true
    },

    {
        path: '/sign-in',
        page: SignInPage,
        isShowSideMenu: false
    },



    {
        path: '/sign-up',
        page: SignUpPage,
        isShowSideMenu: false
    },
   
    {
        path: '*',
        page: NotFoundPage
    }
]