import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const Cart = () => {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center'>
      <div className='flex h-24 w-24 items-center justify-center rounded-full bg-slate-100'>
        <ShoppingCart className='h-12 w-12 text-slate-400' />
      </div>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold'>Your cart is empty</h1>
        <p className='text-muted-foreground'>Looks like you haven't added anything to your cart yet.</p>
      </div>
      <Link to='/'>
        <Button size='lg'>Start Shopping</Button>
      </Link>
    </div>
  );
};

export default Cart;
