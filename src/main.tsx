import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../sass/index.scss';
import App from './App';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import routes from './routes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes as RouteObject[]
  },
]);

// Create the React root element
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);