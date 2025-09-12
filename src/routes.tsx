import type { JSX } from "react";
import StartPage from "./pages/start/StartPage";
import AboutPage from "./pages/about-us/aboutPage";
import ProductPage from "./pages/products/ProductPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";

interface Route {
    element: JSX.Element;
    path: string;
    menuLabel?: string;
}

const routes: Route[] = [
    { element: <StartPage />, path: '', menuLabel: 'Start' },
    { element: <ProductPage />, path: '/Products', menuLabel: 'Produkter' },
    { element: <AboutPage />, path: '/AboutUs', menuLabel: 'Om oss' },
    { element: <ProductDetailsPage />, path: '/products/:id' }
];

export default routes;