import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import MainLayout from './layouts/MainLayout';
import NotFound404 from './pages/NotFound404';
import { ThemeProvider } from './context/ThemeContext';
import { Register } from './forms/Register';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Register />,
        },
        {
          path: 'register',
          element: <Register />,
        },
      ],
    },
    {
      path: '*', 
      element: <NotFound404 />,
    },
  ],
  {
    basename: '/fym-mearn46r2', // Repo Name
  },
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
