import Login from "../components/GoogleLoginComponent/Login";
import AdminAccountPage from "../pages/AdminAccountPage/AdminAccountPage";
import AdminCategoryPage from "../pages/AdminCategoryPage/AdminCategoryPage";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboardPage";
import AdminProductPage from "../pages/AdminProductPage/AdminProductPage";
import AdminUserPage from "../pages/AdminUserPage/AdminUserPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const routes = [
  {
    path: "/",
    page: AdminDashboard,
    isShowSideMenu: true,
  },
  {
    path: "/login/oauth",
    page: Login,
  },

  {
    path: "/admin-category",
    page: AdminCategoryPage,
    isShowSideMenu: true,
  },

  {
    path: "/admin-product",
    page: AdminProductPage,
    isShowSideMenu: true,
  },

  {
    path: "/admin-user",
    page: AdminUserPage,
    isShowSideMenu: true,
  },

  {
    path: "/admin-account",
    page: AdminAccountPage,
    isShowSideMenu: true,
  },

  {
    path: "*",
    page: NotFoundPage,
  },
];
