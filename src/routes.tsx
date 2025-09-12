import type { JSX } from "react";
import StartPage from "./pages/start/StartPage";
import EndPage from "./pages/EndPage";
import ProductPage from "./pages/Products/ProductPage";
import ProductDetailsPage from "./pages/Products/ProductDetailsPage";

interface Route {
    element: JSX.Element;
    path: string;
    menuLabel?: string;
}

const routes: Route[] = [
    { element: <StartPage />, path: '', menuLabel: 'Start' },
    { element: <ProductPage />, path: '/Products', menuLabel: 'Produkter' },
    { element: <EndPage />, path: '/AboutUs', menuLabel: 'Om oss' },
    { element: <ProductDetailsPage />, path: '/products/:id' }
];

export default routes;