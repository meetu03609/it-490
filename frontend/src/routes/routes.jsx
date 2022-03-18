import Home from '../views/home';
import Login from '../views/login';
import Register from '../views/register';
import Auth from "../hoc/Auth";

const appRoutes = [
    {
        path: "/",
        title: "Home",
        component: Auth(Home)
    },
    {
        path: "/login",
        title: "Login",
        component: Login
    },
    {
        path: "/register",
        title: "Register",
        component: Register
    },
    {
        redirect: true,
        path: "*",
        to: "/",
        component: Auth(Home)
    }
];

export default appRoutes
