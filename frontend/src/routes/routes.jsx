import Home from '../views/home';
import Login from '../views/login';
import Register from '../views/register';
import Auth from "../hoc/Auth";
import CreateProduct from "../views/create-product";

const appRoutes = [
    {
        path: "/",
        title: "Home",
        component: Auth(Home)
    },
    {
        path: "/create-product",
        title: "New Product",
        component: Auth(CreateProduct)
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
