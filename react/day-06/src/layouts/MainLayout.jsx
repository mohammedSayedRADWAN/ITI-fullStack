import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/context/ThemeContext';
import React, { use } from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
  // Store Read Value inside Component
  const { theme, setTheme } = use(ThemeContext);

  return (
    <>
      <div
        className='min-h-screen flex flex-col bg-slate-50'
        style={{
          background: theme === 'light' ? '#fff' : '#333',
          color: theme === 'light' ? '#000' : '##fff',
        }}>
        <Header />
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </Button>
        <main className='container grow mx-auto p-10 max-w-3xl'>
          <Outlet /> {/* Placeholder for the injected component from Route */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
