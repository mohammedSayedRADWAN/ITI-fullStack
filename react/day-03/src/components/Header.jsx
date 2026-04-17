import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link, NavLink } from 'react-router';

const Header = () => {
  return (
    <header className='sticky top-0 z-10 w-full border-b bg-white shadow-sm p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* window.history.pushState(state, unused, url) */}
        {/* window.history.pushState("State Changed", "", "/") */}
        <NavLink
          to='/'
          className={({ isActive }) =>
            `font-medium ${isActive ? 'text-blue-600' : 'hover:text-blue-600 font-bold'}`
          }>
          <h1 className='text-xl font-bold'>FYM-MEA|RN46R2</h1>
        </NavLink>
        {/* Search Bar Section */}
        <div className='flex items-center gap-4'>
          <form className='relative w-full max-w-sm'>
            <Search className='absolute left-1.5 top-1.5 h-4 w-4 text-slate-500' />
            <Input
              type='search'
              placeholder='Search for users'
              className='pl-8 bg-slate-50 focus-visible:ring-blue-500'
            />
          </form>
        </div>
        <NavigationMenu>
          <NavigationMenuList className='flex gap-3'>
            <NavigationMenuItem>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`
                }>
                Home
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to='cart'
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`
                }>
                Cart
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
