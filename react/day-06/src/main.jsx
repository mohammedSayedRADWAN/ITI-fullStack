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
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import Controlled from './forms/Controlled';
import { Register } from './forms/Register';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        // Root Route
        {
          index: true,
          element: <App />,
        },
        // Static Routes
        {
          path: 'login',
          element: <LoginForm />,
        },
        {
          path: 'signup',
          element: <SignupForm />,
        },

        {
          path: 'search',
          element: <QueryParameters />,
        },
        {
          path: 'users',
          element: <UsersPage />,
        },
        {
          path: 'register',
          element: <Register />,
        },

        // Dynamic Route
        {
          path: 'users/:id/',
          element: <UserDetailsPage />,
        },

        {
          path: 'path/:id/',
          element: <DynamicRoute />,
        },
      ],
    },
    {
      path: 'dashboard',
      element: <DashboardPage />,
    },

    // Not Found Page => Wildcard Route 404
    {
      path: '*', // Wildcard Route 404: match all unknown urls
      element: <NotFound404 />,
    },
  ],
  {
    basename: '/fym-mearn46r2', // Repo Name
  },
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
