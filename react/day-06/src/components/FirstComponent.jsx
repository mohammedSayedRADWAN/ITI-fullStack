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

const FirstComponent = () => {
  // Consume Data from Zustand Store
  const count = useCounterStore((state) => state.count);

  return (
    <Card className='mx-auto w-full max-w-sm mb-5'>
      <CardHeader>
        <CardTitle>FirstComponent</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Count {count}</p>
      </CardContent>
    </Card>
  );
};

export default FirstComponent;
