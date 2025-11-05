import { ACCOUNT_TYPE } from '../utils/constants'

export const sidebarLinks = [
    {
        id: 1,
        name: "My Profile",
        path: "/dashboard/my-profile",
        icons: "VscAccount"
    },
    {
        id: 2,
        name: "Dashboard",
        path: "/dashboard/instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
        icons: "VscDashboard"
    },
    {
        id: 3,
        name: "My Courses",
        path: "/dashboard/my-courses",
        type: ACCOUNT_TYPE.INSTRUCTOR,
        icons: "VscVm"
    },
    {
        id: 4,
        name: "Add Course",
        path: "/dashboard/add-courses",
        type: ACCOUNT_TYPE.INSTRUCTOR,
        icons: "VscAdd"
    },
    {
        id: 5,
        name: "Enrolled Courses",
        path: "/dashboard/enrolled-courses",
        type: ACCOUNT_TYPE.STUDENT,
        icons: "VscMortarBoard"
    },
    {
        id: 6,
        name: "My Wishlist",
        path: "/dashboard/my-wishlist",
        type: ACCOUNT_TYPE.STUDENT,
        icons: "VscHeart"
    },
    {
        id: 7,
        name: "Purchase History",
        path: "/dashboard/purchase-history",
        type: ACCOUNT_TYPE.STUDENT,
        icons: "VscHistory"
    },
]