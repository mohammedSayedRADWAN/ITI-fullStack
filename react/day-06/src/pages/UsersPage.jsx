import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

import { Link } from 'react-router';
import { instance } from './AxiosInstance';

import { Users, ArrowRight, ShieldCheck, Star } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        // const response = await axios.get('https://api.escuelajs.co/api/v1/users');

        // DRY: Don't Repeat Yourself
        const response = await instance.get();
        console.log('Response:', response);
        console.log('Data:', response.data);

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // useEffect( 2 args ()=>{} , Dependency array[])

  // 3 Forms

  // 1st Form => Run Once when the component appears and never again
  // Empty dependency Array [] + without return in the callback function

  // useEffect(() => {
  //   console.log('This Runs once (on Mount)');
  // }, []);

  // // 2nd Form => Run Every time Component re-render
  // // Dependency Array [dependencies] + without return in the callback function
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log('This Runs Every time Component re-render');
  // }, [count]);

  // // 3rd Form => run once before Component removed from DOM
  // useEffect(() => {
  //   return () => {
  //     console.log('This Runs once before Component removed from DOM');
  //   };
  // }, []);

  return (
    <>
      {/* <Button onClick={fetchUsers}>Fetch Users</Button> */}
      {/* <Button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}>
        Change Count: {count}
      </Button> */}

      {/* <div>{users && <p>{users[0].name}</p>}</div> */}

      <section className='bg-muted/30 pb-6 px-6'>
        <div className='max-w-5xl mx-auto text-center'>
          <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-primary'>
            Users
          </h1>
        </div>
      </section>
      {isLoading && (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((card) => {
            return (
              <Card className='overflow-hidden rounded-xl border-2' key={card}>
                <CardHeader className='px-4'>
                  <Skeleton className='aspect-square w-full rounded-none' />
                  <div className='mt-4'>
                    <Skeleton className='h-5 w-2/3' />
                  </div>
                </CardHeader>

                <CardContent className='px-4 pb-4'>
                  <Skeleton className='h-4 w-full' />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div>{error && <p>{error}</p>}</div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {users.map((user) => (
          // <Link to={`users/${user.id}`}> without / in the beginning complete existing url ❌
          // <Link to={`${user.id}`}> without / in the beginning complete existing url ✅
          <Link to={`/users/${user.id}`}>
            <Card
              key={user.id}
              className='group overflow-hidden rounded-xl border-2 transition-all hover:border-blue-500'>
              <CardHeader className='px-4'>
                <div className='relative aspect-square overflow-hidden bg-muted'>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <CardTitle className='line-clamp-1 text-lg font-bold'>
                    {user.name}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className='px-4 pb-2'>
                <p className='line-clamp-2 text-sm text-muted-foreground'>{user.email}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default UsersPage;

// Loading ....
// Error
// Data
