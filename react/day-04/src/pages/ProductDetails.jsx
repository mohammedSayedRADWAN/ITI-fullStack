import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Star, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='py-20 text-center'>
        <h2 className='text-2xl font-bold'>Product not found</h2>
        <Link to='/'>
          <Button className='mt-4'>Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <Link to='/'>
        <Button variant='ghost' className='mb-6 -ml-4 gap-2'>
          <ChevronLeft className='h-4 w-4' />
          Back to List
        </Button>
      </Link>

      <div className='grid gap-10 lg:grid-cols-2'>
        <div className='overflow-hidden rounded-xl border bg-white p-4 shadow-sm'>
          <img
            src={product.images[0] || product.thumbnail}
            alt={product.title}
            className='h-full w-full object-contain max-h-[500px]'
          />
        </div>

        <div className='flex flex-col gap-6'>
          <div className='space-y-2'>
            <Badge variant='outline' className='uppercase tracking-widest'>
              {product.category}
            </Badge>
            <h1 className='text-4xl font-bold'>{product.title}</h1>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                <span className='font-bold'>{product.rating}</span>
              </div>
              <span className='text-muted-foreground'>|</span>
              {product.stock === 0 ? (
                <Badge variant='destructive'>Out of stock</Badge>
              ) : (
                <Badge className='bg-green-600 hover:bg-green-700'>In stock ({product.stock} available)</Badge>
              )}
            </div>
          </div>

          <div className='space-y-4'>
            <div className='text-3xl font-bold'>${product.price}</div>
            <p className='text-lg leading-relaxed text-slate-600'>{product.description}</p>
          </div>

          <div className='flex flex-wrap gap-4 pt-4'>
            <Button size='lg' className='h-14 gap-2 px-8' disabled={product.stock === 0}>
              <ShoppingCart className='h-5 w-5' />
              Add to Cart
            </Button>
            <Button size='lg' variant='outline' className='h-14 px-8'>
              Add to Wishlist
            </Button>
          </div>

          <div className='mt-6 border-t pt-6'>
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div className='flex flex-col'>
                <span className='font-semibold text-slate-500'>Brand</span>
                <span>{product.brand}</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-semibold text-slate-500'>SKU</span>
                <span>{product.sku}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
