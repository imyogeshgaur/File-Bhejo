import { lazy } from "react";
import Authentication from "./common/Authentication";
import Home from "./common/Home";
import PasswordRoute from "./common/PasswordRoute";
const token = localStorage.getItem("jwt")
console.log(token)
const allRoutes = [
    { path:"/", element:<Authentication />},
    { path:`/user/verify`, element:<Home />},
    { path:"/user/pdf", element:<PasswordRoute />}

]

export default allRoutes;