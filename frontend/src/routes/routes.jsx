import Home from '../views/home';
import Login from '../views/login';
import Register from '../views/register';
import Auth from "../hoc/Auth";
import CreateProduct from "../views/create-product";
import Detail from "../views/detail";

const appRoutes = [
    {
        path: "/",
        title: "Home",
        component: Auth(Home)
    },
    {
        path: "/detail/:id",
        title: "Home",
        component: Auth(Detail)
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
