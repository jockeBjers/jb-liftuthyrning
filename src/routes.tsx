import type { JSX } from "react";
import StartPage from "./pages/start/StartPage";
import AboutPage from "./pages/about-us/aboutPage";
import ProductPage from "./pages/products/ProductPage";
import ProductDetailsPage from "./pages/products/productDetailsPage/ProductDetailsPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import UserPage from "./pages/user/UserPage";
import AdminPage from "./pages/admin/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import OrderTab from "./pages/admin/orders/OrderTab";
import UserTab from "./pages/admin/users/UserTab";
import ProductTab from "./pages/admin/products/ProductTab";
import CategoryTab from "./pages/admin/categories/CategoryTab";
import AdminDashboard from "./pages/admin/AdminDashboard";

interface Route {
    element: JSX.Element;
    path: string;
    menuLabel?: string;
    loader?: Function;
    children?: Route[];
}

const routes: Route[] = [
    { element: <StartPage />, path: '', menuLabel: 'Start' },
    { element: <ProductPage />, path: '/Products', menuLabel: 'Produkter', loader: async () => { const response = await fetch('/api/lifts'); return response.json(); } },
    { element: <AboutPage />, path: '/AboutUs', menuLabel: 'Om oss' },
    { element: <LoginPage />, path: '/Login', menuLabel: 'Logga in' },
    {
        element: <ProtectedRoute>
            <UserPage />
        </ProtectedRoute>,
        path: '/profile', menuLabel: 'Min sida',
        loader: async () => {
            const orders = await (await fetch('/api/orders')).json();
            const orderItems = await (await fetch('/api/orderItems')).json();
            const lifts = await (await fetch('/api/lifts')).json();
            return { lifts, orders, orderItems };
        }
    },
    {
        element: <ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>,
        path: "/admin",
        children: [
            {path: "", element: <AdminDashboard />},
            {
                path: "orders",
                element: <OrderTab />,
                loader: async () => {
                    const orders = await (await fetch("/api/orders")).json();
                    const orderItems = await (await fetch("/api/orderItems")).json();
                    const lifts = await (await fetch("/api/lifts")).json();
                    const users = await (await fetch("/api/users")).json();
                    return { orders, orderItems, lifts, users };
                }
            },
            {
                path: "customers",
                element: <UserTab />,
                loader: async () => {
                    const users = await (await fetch("/api/users")).json();
                    const customerWithOrders = await (await fetch("/api/customerWithOrders")).json();
                    return { users, customerWithOrders };
                }
            },
            {
                path: "lifts",
                element: <ProductTab />,
                loader: async () => {
                    const liftDetails = await (await fetch("/api/liftDetails")).json();
                    return { liftDetails };
                }
            },
            {
                path: "categories",
                element: <CategoryTab />,
                loader: async () => {
                    const fuels = await (await fetch("/api/fuels")).json();
                    const liftCategories = await (await fetch("/api/liftCategories")).json();
                    return { fuels, liftCategories };
                }
            }
        ]
    },
    {
        element: <ProductDetailsPage />, path: '/products/:id', loader: async ({ params }: { params: { id: string } }) => {
            const response = await fetch(`/api/lifts/${params.id}`); return response.json();
        }
    },
    { element: <RegisterPage />, path: '/register' },
    { element: <NotFoundPage />, path: '*' }
];

export default routes;