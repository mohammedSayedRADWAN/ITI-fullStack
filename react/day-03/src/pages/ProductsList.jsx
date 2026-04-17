import React from 'react';
import { useSearchParams, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PRODUCTS } from '@/data/products';

const ProductsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredProducts = categoryFilter 
    ? PRODUCTS.filter(p => p.category === categoryFilter)
    : PRODUCTS;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">
          Currently Browsing: {categoryFilter ? categoryFilter.toUpperCase() : 'All Products'}
        </h1>
        
        <div className="flex gap-2">
          <Button 
            variant={categoryFilter === null ? 'default' : 'outline'}
            onClick={() => setSearchParams({})}
          >
            All
          </Button>
          <Button 
            variant={categoryFilter === 'electronics' ? 'default' : 'outline'}
            onClick={() => setSearchParams({ category: 'electronics' })}
          >
            Electronics
          </Button>
          <Button 
            variant={categoryFilter === 'clothing' ? 'default' : 'outline'}
            onClick={() => setSearchParams({ category: 'clothing' })}
          >
            Clothing
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
            <div className="aspect-square overflow-hidden bg-muted">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-1">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="grow pb-4">
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-primary">${product.price}</p>
                <p className="text-sm text-muted-foreground line-through opacity-50">${(product.price * 1.2).toFixed(0)}</p>
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">{product.category}</p>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{product.description}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to={`/product/${product.id}`} className="w-full">
                <Button className="w-full group-hover:bg-primary transition-colors">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};


export default ProductsList;
