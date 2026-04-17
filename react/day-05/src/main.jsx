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
import DashboardPage from './pages/DashboardPage';
import DynamicRoute from './pages/DynamicRoute';
import QueryParameters from './pages/QueryParameters';
import UsersPage from './pages/UsersPage';
import UserDetailsPage from './pages/UserDetailsPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { LanguageProvider } from './context/LanguageContext';
import ProductsList from './pages/ProductsList';
import Cart from './pages/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProductsList />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'signup',
        element: <SignupForm />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'users/:id/',
        element: <UserDetailsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound404 />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </LanguageProvider>
    </Provider>
  </StrictMode>,
);
