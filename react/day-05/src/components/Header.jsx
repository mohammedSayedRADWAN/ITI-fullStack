import React from 'react';
import { NavLink, Link } from 'react-router';
import { ShoppingCart, Sun, Moon, Languages } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useThemeStore } from '@/store/useThemeStore';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { language, toggleLanguage } = useLanguage();
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
      theme === 'light' ? 'bg-white/95 border-gray-200' : 'bg-zinc-900/95 border-zinc-800 text-white'
    }`}>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-6'>
          <Link to='/' className='flex items-center space-x-2'>
            <span className='text-xl font-bold'>Products App</span>
          </Link>
          <p className='text-sm text-muted-foreground hidden lg:block'>
            {language === 'en' ? 'Welcome' : 'مرحباً'}
          </p>
        </div>

        <div className='flex items-center gap-2'>
          {/* Theme Toggle */}
          <Button variant='ghost' size='icon' onClick={toggleTheme}>
            {theme === 'light' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
          </Button>

          {/* Language Toggle */}
          <Button variant='ghost' size='icon' onClick={toggleLanguage} className='gap-1'>
            <Languages className='h-5 w-5' />
            <span className='text-xs uppercase'>{language}</span>
          </Button>

          {/* Cart Badge */}
          <Link to='/cart' className='relative ml-2 p-2'>
            <ShoppingCart className='h-5 w-5' />
            {cartItems.length > 0 && (
              <span className='absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm'>
                {cartItems.length}
              </span>
            )}
          </Link>
          
          <nav className='flex items-center gap-4 ml-4'>
            <NavLink to='/login' className='text-sm font-medium hover:text-primary transition-colors'>
              Login
            </NavLink>
            <NavLink to='/signup' className='text-sm font-medium hover:text-primary transition-colors'>
              Signup
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
