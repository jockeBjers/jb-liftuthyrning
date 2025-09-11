import type { JSX } from "react";
import StartPage from "./pages/StartPage";
import EndPage from "./pages/EndPage";


interface Route {
    element: JSX.Element;
    path:string;
    menuLabel?: string;
}

const routes: Route[] = [
    {element: <StartPage />, path: '', menuLabel: 'Start'},
    {element: <EndPage />, path: '/endPage', menuLabel: 'END'}
];

export default routes;