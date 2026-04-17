import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { clearCart, removeFromCart } from '@/store/redux/cartSlice';

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Cart ({cartItems.length} items)</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item) => {
                <li key={item.id}>
                  <span>
                    {item.name} - EGP{item.price}
                  </span>
                  <Button onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </Button>
                </li>;
              })}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          {cartItems.length > 0 && (
            <Button onClick={() => dispatch(clearCart())}>Clear Cart</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ShoppingCart;
