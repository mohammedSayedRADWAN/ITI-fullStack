import { cn } from '@/lib/utils';
import { NavLink, Link } from 'react-router';
import { ShoppingCart, Sun, Moon, Languages } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useThemeStore } from '@/store/useThemeStore';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { language, toggleLanguage, t } = useLanguage();
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-500",
      theme === 'light' 
        ? 'bg-white/80 border-slate-200 shadow-sm' 
        : 'bg-slate-950/80 border-white/5 shadow-2xl shadow-purple-500/10'
    )}>
      <div className='container mx-auto flex h-20 items-center justify-between px-6'>
        <div className='flex items-center gap-8'>
          <Link to='/' className='flex items-center space-x-3 group'>
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <span className='text-3xl font-black tracking-tighter text-primary px-1'>
              {t('productsApp')}
            </span>
          </Link>
          <div className="h-6 w-[2px] bg-slate-200 hidden lg:block mx-4" />
          <p className='text-sm font-bold text-muted-foreground hidden lg:block'>
            {t('welcome')}
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 px-1.5 py-1.5 rounded-2xl gap-2 border border-slate-200 dark:border-slate-800">
            {/* Theme Toggle */}
            <Button variant='ghost' size='icon' onClick={toggleTheme} className="rounded-xl hover:bg-white shadow-sm transition-all duration-500">
              {theme === 'light' ? <Moon className='h-5 w-5 text-primary' /> : <Sun className='h-5 w-5 text-accent' />}
            </Button>

            {/* Language Toggle */}
            <Button variant='ghost' size='icon' onClick={toggleLanguage} className='rounded-xl hover:bg-white shadow-sm transition-all duration-500 gap-2 px-3 w-auto'>
              <Languages className='h-4 w-4 text-primary' />
              <span className='text-xs font-black uppercase tracking-widest text-primary'>{language}</span>
            </Button>
          </div>

          {/* Cart Badge */}
          <Link to='/cart' className='group relative p-3.5 rounded-2xl bg-primary text-white shadow-xl hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1'>
            <ShoppingCart className='h-5 w-5' />
            {cartItems.length > 0 && (
              <span className='absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-black text-white shadow-md border-2 border-white animate-bounce'>
                {cartItems.length}
              </span>
            )}
          </Link>
          
          <nav className='flex items-center gap-2 ml-4'>
            <NavLink to='/login' className={({ isActive }) => cn(
              'px-6 py-2.5 text-sm font-black rounded-2xl transition-all duration-300',
              isActive ? 'bg-primary text-white shadow-lg shadow-purple-500/20' : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 shadow-sm transition-all'
            )}>
              {t('login')}
            </NavLink>
            <NavLink to='/signup' className={({ isActive }) => cn(
              'px-6 py-2.5 text-sm font-black rounded-2xl transition-all duration-300',
              isActive ? 'bg-primary text-white shadow-lg shadow-purple-500/20' : 'text-white bg-slate-900 hover:bg-slate-800 shadow-lg'
            )}>
              {t('signup')}
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
