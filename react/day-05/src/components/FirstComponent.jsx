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
    <Card className='mb-2'>
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
