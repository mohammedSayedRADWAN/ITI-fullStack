import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '@/store/cartSlice';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { t } = useLanguage();

  if (cartItems.length === 0) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center'>
        <div className='flex h-24 w-24 items-center justify-center rounded-full bg-slate-100'>
          <ShoppingCart className='h-12 w-12 text-slate-400' />
        </div>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold'>{t('emptyCart')}</h1>
          <p className='text-muted-foreground'>{t('startShopping')}!</p>
        </div>
        <Link to='/'>
          <Button size='lg'>{t('startShopping')}</Button>
        </Link>
      </div>
    );
  }

  const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div className='py-12 max-w-5xl mx-auto px-4'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-8'>
        <div>
            <h1 className='text-6xl font-black tracking-tighter text-primary'>
                {t('cart')}
            </h1>
            <p className="text-sm text-slate-500 font-bold mt-2 uppercase tracking-widest opacity-70">
                {cartItems.length} items currently in your bag
            </p>
        </div>
        <div className='bg-accent px-10 py-6 rounded-[2.5rem] text-white shadow-2xl shadow-green-500/30 flex flex-col items-end border-4 border-white dark:border-slate-800'>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">{t('total')}</span>
            <div className='text-5xl font-black tracking-tighter'>${total.toFixed(2)}</div>
        </div>
      </div>
      <div className='grid gap-8'>
        {cartItems.map((item) => (
          <Card key={item.id} className='overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-[2.5rem] group border-4'>
            <CardContent className='p-8'>
              <div className='flex flex-col sm:flex-row gap-10 items-center'>
                <div className='h-40 w-40 shrink-0 overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-black p-8 border-2 border-slate-100 dark:border-slate-800 shadow-inner group-hover:scale-105 transition-transform duration-500'>
                  <img src={item.thumbnail} alt={item.title} className='h-full w-full object-contain' />
                </div>
                <div className='flex flex-1 flex-col w-full'>
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <h3 className='font-black text-3xl tracking-tight group-hover:text-primary transition-colors'>{item.title}</h3>
                      <p className='text-xs font-black uppercase tracking-widest text-primary/40 mt-3 bg-primary/5 w-fit px-4 py-1 rounded-full'>{item.category}</p>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className='text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-2xl h-14 w-14 transition-all'
                    >
                      <Trash2 className='h-7 w-7' />
                    </Button>
                  </div>
                  
                  <div className='flex justify-between items-end mt-8'>
                    <div className='text-4xl font-black text-primary tracking-tighter'>${item.price}</div>
                    
                    <div className='flex items-center gap-6 bg-slate-50 dark:bg-black p-3 rounded-[1.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm'>
                      <Button
                        variant='ghost'
                        size='icon'
                        disabled={item.quantity <= 1}
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className='h-12 w-12 rounded-xl hover:bg-white shadow-sm transition-all text-primary disabled:opacity-30'
                      >
                        <Minus className='h-6 w-6' />
                      </Button>
                      <span className='w-12 text-center font-black text-3xl tracking-tighter'>{item.quantity || 1}</span>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className='h-12 w-12 rounded-xl hover:bg-white shadow-sm transition-all text-accent'
                      >
                        <Plus className='h-6 w-6' />
                      </Button>
                    </div>
                  </div>
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
