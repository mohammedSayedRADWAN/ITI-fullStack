import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      </div>
    );
  }

  return (
    <div className='space-y-8 py-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Welcome to our shopping website</h1>
        <p className='text-muted-foreground'>Start browsing our amazing products below.</p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product) => (
          <Card key={product.id} className='group flex flex-col overflow-hidden transition-all hover:shadow-lg'>
            <div className='relative aspect-square overflow-hidden bg-slate-100'>
              <img
                src={product.thumbnail}
                alt={product.title}
                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute top-2 left-2'>
                {product.stock === 0 ? (
                  <Badge variant='destructive' className='rounded-full px-3'>
                    Out of stock
                  </Badge>
                ) : (
                  <Badge className='bg-green-600 hover:bg-green-700 rounded-full px-3'>
                    In stock
                  </Badge>
                )}
              </div>
            </div>
            <CardHeader className='pb-2'>
              <div className='flex items-start justify-between gap-2'>
                <CardTitle className='line-clamp-1 text-lg'>{product.title}</CardTitle>
                <div className='flex items-center gap-1 shrink-0'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <span className='text-sm font-medium'>{product.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className='grow'>
              <p className='line-clamp-2 text-sm text-muted-foreground'>{product.description}</p>
              <div className='mt-4 flex items-center justify-between'>
                <span className='text-xl font-bold'>${product.price}</span>
              </div>
            </CardContent>
            <CardFooter className='pt-0'>
              <div className='flex w-full gap-2'>
                <Link to={`/product/${product.id}`} className='flex-1'>
                  <Button variant='outline' className='w-full'>
                    Details
                  </Button>
                </Link>
                <Button className='flex-1' disabled={product.stock === 0}>
                  Add to Cart
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
