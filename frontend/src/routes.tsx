import { lazy } from "react";

const Authentication = lazy(()=>import("./common/Authentication"))
const Home = lazy(()=>import("./common/Home"))
const PasswordRoute = lazy(()=>import("./common/PasswordRoute"))
const MergeFile = lazy(()=>import("./common/MergeFile"))

const allRoutes = [
    { path:"/", element:<Authentication />},
    { path:`/user/verify`, element:<Home />},
    { path:"/user/pdf", element:<PasswordRoute />},
    { path:"/file/merge", element:<MergeFile/>}
]

export default allRoutes;