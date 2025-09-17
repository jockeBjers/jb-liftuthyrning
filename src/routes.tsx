import type { JSX } from "react";
import StartPage from "./pages/start/StartPage";
import AboutPage from "./pages/about-us/aboutPage";
import ProductPage from "./pages/products/ProductPage";
import ProductDetailsPage from "./pages/products/productDetailsPage/ProductDetailsPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import UserPage from "./pages/user/UserPage";
import AdminPage from "./pages/admin/AdminPage";


interface Route {
    element: JSX.Element;
    path: string;
    menuLabel?: string;
    loader?: Function;
}

const routes: Route[] = [
    { element: <StartPage />, path: '', menuLabel: 'Start' },
    { element: <ProductPage />, path: '/Products', menuLabel: 'Produkter', loader: async () => { const response = await fetch('/api/lifts'); return response.json(); } },
    { element: <AboutPage />, path: '/AboutUs', menuLabel: 'Om oss' },
    { element: <LoginPage />, path: '/Login', menuLabel: 'Logga in' },
    { element: <UserPage />, path: '/profile', menuLabel: 'Min sida' },
    {
        element: <AdminPage />, path: '/admin', menuLabel: 'Hemlig admin',
        loader: async () => {
            const lifts = await (await fetch('/api/lifts')).json();
            const fuels = await (await fetch('/api/fuels')).json();
            const lift_categories = await (await fetch('/api/lift_categories')).json();
            const orders = await (await fetch('/api/orders')).json();
            const orderItems = await (await fetch('/api/order_items')).json();
            const users = await (await fetch('/api/users')).json();
            const customerWithOrders = await (await fetch('/api/customerWithOrders')).json();
            return { lifts, fuels, lift_categories, orders, orderItems, users, customerWithOrders };
        }
    },

    {
        element: <ProductDetailsPage />, path: '/products/:id', loader: async ({ params }: { params: { id: string } }) => {
            const response = await fetch(`/api/lifts/${params.id}`); return response.json();
        }
    },
    { element: <RegisterPage />, path: '/register' }
];

export default routes;