import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card className='group flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 border-white/10 bg-card/50 backdrop-blur-sm'>
      <div className='relative aspect-[4/5] overflow-hidden bg-muted/50'>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end p-4">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-white text-xs font-bold">{product.rating || '4.5'}</span>
          </div>
        </div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      <CardHeader className='pb-2 pt-4 px-4'>
        <CardTitle className='line-clamp-1 text-lg font-bold tracking-tight group-hover:text-primary transition-colors'>
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className='grow px-4 pb-2'>
        <p className='line-clamp-2 text-xs text-muted-foreground/80 leading-relaxed'>
          {product.description}
        </p>
        <div className='mt-4 flex items-center justify-between'>
          <span className='text-2xl font-black text-indigo-600 dark:text-indigo-400'>
            ${product.price}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            instock
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className='w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold shadow-lg shadow-indigo-600/20 transition-all duration-300 active:scale-95 gap-2'
          onClick={() => dispatch(addToCart(product))}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
