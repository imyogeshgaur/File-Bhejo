import { lazy } from "react";

const Authentication = lazy(()=>import("./common/Authentication"))
const Home = lazy(()=>import("./common/Home"))
const PasswordRoute = lazy(()=>import("./common/PasswordRoute"))

const allRoutes = [
    { path:"/", element:<Authentication />},
    { path:`/user/verify`, element:<Home />},
    { path:"/user/pdf", element:<PasswordRoute />}
]

export default allRoutes;