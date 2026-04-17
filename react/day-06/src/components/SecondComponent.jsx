import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCounterStore } from '@/store/zustand/useCounterStore';
import { Button } from './ui/button';

const SecondComponent = () => {
  // Consume Data from Zustand Store
  const count = useCounterStore((state) => state.count);

  const increment = useCounterStore((state) => state.increment);

  const decrement = useCounterStore((state) => state.decrement);

  const reset = useCounterStore((state) => state.reset);

  // Single Object using Destructuring
  // const { count, increment, decrement, reset } = useCounterStore((state) => ({
  //   count: state.count,
  //   increment: state.increment,
  //   decrement: state.decrement,
  //   reset: state.reset,
  // }));

  return (
    <Card className='mx-auto w-full max-w-sm mb-5'>
      <CardHeader>
        <CardTitle>Second Component</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Count {count}</p>
      </CardContent>
      <CardFooter>
        <Button size='sm' className='w-full' onClick={increment}>
          Increment
        </Button>
      </CardFooter>
      <CardFooter>
        <Button variant='outline' size='sm' className='w-full' onClick={reset}>
          Reset
        </Button>
      </CardFooter>
      <CardFooter>
        <Button size='sm' className='w-full' onClick={decrement}>
          Decrement
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecondComponent;
