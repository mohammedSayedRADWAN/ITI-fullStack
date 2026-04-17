import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/cartSlice';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center'>
        <div className='flex h-24 w-24 items-center justify-center rounded-full bg-slate-100'>
          <ShoppingCart className='h-12 w-12 text-slate-400' />
        </div>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold'>Your cart is empty</h1>
          <p className='text-muted-foreground'>Start adding some products!</p>
        </div>
        <Link to='/'>
          <Button size='lg'>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <h1 className='text-3xl font-bold mb-8'>Your Shopping Cart</h1>
      <div className='space-y-4'>
        {cartItems.map((item) => (
          <Card key={item.id} className='overflow-hidden'>
            <CardContent className='p-4'>
              <div className='flex gap-4 items-center'>
                <div className='h-20 w-20 shrink-0 overflow-hidden rounded-md border'>
                  <img src={item.thumbnail} alt={item.title} className='h-full w-full object-contain' />
                </div>
                <div className='flex flex-1 flex-col'>
                  <div className='flex justify-between items-start'>
                    <h3 className='font-bold text-lg'>{item.title}</h3>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className='text-destructive hover:bg-destructive/10'
                    >
                      <Trash2 className='h-5 w-5' />
                    </Button>
                  </div>
                  <p className='text-lg font-semibold'>${item.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cart;
