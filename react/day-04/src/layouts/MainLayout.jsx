import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col bg-slate-50'>
        <Header />
        <main className='container grow mx-auto p-4'>
          <Outlet /> {/* Placeholder for the injected component from Route */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
