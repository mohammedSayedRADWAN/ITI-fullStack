import React from 'react';
import { NavLink, Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-6'>
          <Link to='/' className='flex items-center space-x-2'>
            <span className='text-xl font-bold text-slate-900'>Products App</span>
          </Link>
          <nav className='hidden md:flex items-center gap-6'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600'
                }`
              }>
              Products
            </NavLink>
          </nav>
        </div>

        <div className='flex items-center gap-4'>
          <nav className='flex items-center gap-4'>
            <NavLink
              to='/register'
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600'
                }`
              }>
              Register
            </NavLink>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600'
                }`
              }>
              Login
            </NavLink>
          </nav>

          <Link to='/cart' className='relative ml-2 transition-transform hover:scale-110'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-100'>
              <ShoppingCart className='h-5 w-5 text-slate-700' />
            </div>
            <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white'>
              4
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
