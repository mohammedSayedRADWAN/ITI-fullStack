import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
      <ShoppingCart size={64} className="mb-4" />
      <h1 className="text-2xl font-semibold">Your Cart is Empty</h1>
      <p className="mt-2 text-slate-500">Add some products to see them here!</p>
    </div>
  );
};

export default Cart;
