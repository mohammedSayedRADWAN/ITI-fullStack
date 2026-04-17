import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card className='group flex flex-col overflow-hidden transition-all hover:shadow-lg'>
      <div className='aspect-square overflow-hidden bg-slate-100'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
      </div>
      <CardHeader className='pb-2'>
        <CardTitle className='line-clamp-1 text-lg'>{product.title}</CardTitle>
      </CardHeader>
      <CardContent className='grow'>
        <p className='line-clamp-2 text-sm text-muted-foreground'>{product.description}</p>
        <div className='mt-4'>
          <span className='text-xl font-bold'>${product.price}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className='w-full' 
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
