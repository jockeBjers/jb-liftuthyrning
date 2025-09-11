import type { JSX } from "react";
import StartPage from "./pages/StartPage";
import EndPage from "./pages/EndPage";
import ProductPage from "./pages/Products/ProductPage";


interface Route {
    element: JSX.Element;
    path:string;
    menuLabel?: string;
}

const routes: Route[] = [
    {element: <StartPage />, path: '', menuLabel: 'Start'},
    {element: <ProductPage />, path: '/Products', menuLabel: 'Produkter'},
    {element: <EndPage />, path: '/AboutUs', menuLabel: 'Om oss'}
];

export default routes;