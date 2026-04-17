import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router';
import { Users, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FirstComponent from './components/FirstComponent';
import SecondComponent from './components/SecondComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  incrementByFive,
  incrementByValue,
  reset,
} from './store/redux/counterSlice';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const App = () => {
  // const [count, setCount] = useState(0);
  const [role] = useState('Admin');

  const navigate = useNavigate();

  const handleNavigation = () => {
    if (role == 'Admin') {
      navigate('dashboard');
    } else {
      navigate('login');
    }
  };

  const location = useLocation();

  // Read from Store: State -> the specific slice key -> the value
  const count = useSelector((state) => state.counter.value);

  // Get the dispatch function to send actions
  const dispatch = useDispatch();

  return (
    <>
      <section className='bg-muted/30 pb-6 px-6'>
        <div className='max-w-5xl mx-auto text-center space-y-8'>
          <Badge variant='secondary' className='px-3 py-1 text-sm mb-4'>
            <Star className='w-4 h-4 mr-2 text-yellow-500' />
            V3.0 is now live
          </Badge>
          <h1 className='text-5xl md:text-4xl font-extrabold tracking-tight text-primary'>
            Fayoum - MEA|RN46R2
          </h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Hello ITIans, This is a template for React v19.2 using Vite v8 (JavaScript),
            Shadcn, React Router v7 in Data Mode, Redux Toolkit, and Zustand
          </p>
        </div>
      </section>
      {/* <Button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}>
        <p className='text-center'>Count: {count}</p>
      </Button> */}

      <Button variant='outline' className='ms-4' onClick={handleNavigation}>
        Redirect
      </Button>

      <Link to={`search?q=${count}`} className='ms-4'>
        <Button>Send Data</Button>
      </Link>

      <Button
        variant='outline'
        className='ms-4'
        onClick={() => {
          navigate(`search?q=${role}`);
        }}>
        Navigate + Data
      </Button>

      <div className='mt-4'>
        Using useLocation():
        <ol>
          <li>Path: {location.pathname}</li>
          <li>Query Parameters: {location.search}</li>
        </ol>
      </div>

      <h1 className='text-center text-3xl font-extrabold text-balance'>Zustand</h1>
      <FirstComponent />
      <SecondComponent />

      <h1 className='text-center text-3xl font-extrabold text-balance'>Redux Toolkit</h1>
      <Card className='mb-2'>
        <CardHeader>
          <CardTitle>FirstComponent</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Count {count}</p>
        </CardContent>
        <CardFooter>
          <Button size='sm' className='w-full' onClick={() => dispatch(increment())}>
            Increment
          </Button>
        </CardFooter>
        <CardFooter>
          <Button
            size='sm'
            className='w-full'
            variant='outline'
            onClick={() => dispatch(decrement())}>
            Decrement
          </Button>
        </CardFooter>
        <CardFooter>
          <Button size='sm' className='w-full' onClick={() => dispatch(reset())}>
            Reset
          </Button>
        </CardFooter>
        <CardFooter>
          <Button
            size='sm'
            className='w-full'
            variant='outline'
            onClick={() => dispatch(incrementByFive())}>
            Increment By Five
          </Button>
        </CardFooter>
        <CardFooter>
          <Button
            size='sm'
            className='w-full'
            onClick={() => dispatch(incrementByValue(15))}>
            Increment By Value (15)
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default App;

// CSR => Frontend Control URL,

// Send Data From Frontend to Backend
// 1. Inside Body

// 2. Inside URL

// 2.1 As Path Parameters ✅
// Example: https://api.escuelajs.co/api/v1/users/:id

// 2.2 As Query Parameters ✅
// Example: https://www.google.com/search?q=baby+shark&source=hp
