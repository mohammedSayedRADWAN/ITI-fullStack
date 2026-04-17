import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { LoginForm } from './components/login-form';
import { TooltipProvider } from '@/components/ui/tooltip';
import MainLayout from './layouts/MainLayout';
import NotFound404 from './pages/NotFound404';
import { SignupForm } from './components/signup-form';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Root Route
      {
        index: true,
        element: <ProductsList />,
      },
      // Static Routes
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'register',
        element: <SignupForm />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      // Dynamic Route
      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
    ],
  },

  // Not Found Page => Wildcard Route 404
  {
    path: '*', // Wildcard Route 404: match all unknown urls
    element: <NotFound404 />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>,
);
