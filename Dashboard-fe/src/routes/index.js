import AdminAccountPage from "../pages/AdminAccountPage/AdminAccountPage"
import AdminCategoryPage from "../pages/AdminCategoryPage/AdminCategoryPage"
import AdminDashboard from "../pages/AdminDashboard/AdminDashboardPage"
import AdminProductPage from "../pages/AdminProductPage/AdminProductPage"
import AdminUserPage from "../pages/AdminUserPage/AdminUserPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"

export const routes = [
  {
    path: "/",
    page: AdminDashboard,
  },

  {
    path: "/admin-category",
    page: AdminCategoryPage,
  },

  {
    path: "/admin-product",
    page: AdminProductPage,
  },

  {
    path: "/admin-user",
    page: AdminUserPage,
  },

  {
    path: "/admin-account",
    page: AdminAccountPage,
  },

  {
    path: "*",
    page: NotFoundPage,
  },
]
