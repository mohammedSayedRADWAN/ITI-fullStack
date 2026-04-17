import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PRODUCTS } from '@/data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] p-4">
      <Card className="max-w-4xl w-full grid md:grid-cols-2 overflow-hidden border-none shadow-2xl">
        <div className="aspect-square md:aspect-auto relative overflow-hidden bg-muted">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-widest">{product.category}</p>
                <CardTitle className="text-3xl font-extrabold mt-1">{product.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grow space-y-6">
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-black text-primary">${product.price}</p>
              <p className="text-lg text-muted-foreground line-through opacity-50">${(product.price * 1.2).toFixed(0)}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Description</h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-muted">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  In Stock
                </div>
                <div className="flex items-center gap-1">
                  Free Shipping
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 p-6 pt-0">
            <Button size="lg" className="w-full text-lg h-12">Add to Cart</Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              Back to Products
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;

