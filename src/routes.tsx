import type { JSX } from "react";
import StartPage from "./pages/start/StartPage";
import AboutPage from "./pages/about-us/aboutPage";
import ProductPage from "./pages/products/ProductPage";
import ProductDetailsPage from "./pages/products/productDetailsPage/ProductDetailsPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";

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
    {
        element: <ProductDetailsPage />, path: '/products/:id', loader: async ({ params }: { params: { id: string } }) => {
            const response = await fetch(`/api/lifts/${params.id}`); return response.json();
        }
    },
    { element: <RegisterPage />, path: '/register' }
];

export default routes;