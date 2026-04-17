import React from 'react';
import { Outlet } from 'react-router';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useThemeStore } from '@/store/useThemeStore';

const MainLayout = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className='min-h-screen flex flex-col transition-colors duration-300'
      style={{
        background: theme === 'light' ? '#fff' : '#1a1a1a',
        color: theme === 'light' ? '#000' : '#fff',
      }}>
      <Header />
      <main className='container grow mx-auto p-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
