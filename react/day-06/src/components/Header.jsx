import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link, NavLink } from 'react-router';

const Header = () => {
  return (
    <header className='sticky top-0 z-10 w-full border-b bg-white shadow-sm p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='font-medium hover:text-blue-600'>
          <h1 className='text-xl font-bold'>FYM-MEA|RN46R2</h1>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className='flex gap-3'>
            <NavigationMenuItem>
              <NavLink
                to='/register'
                className={({ isActive }) =>
                  `font-medium ${isActive ? 'text-blue-600' : 'hover:text-blue-600'}`
                }>
                Register
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
