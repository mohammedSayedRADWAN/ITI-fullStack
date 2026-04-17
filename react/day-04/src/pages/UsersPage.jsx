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
import { Link } from 'react-router';
import { instance } from './AxiosInstance';

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

      <div>
        {isLoading && (
          <div className='p-10 grid grid-cols-3 gap-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((card) => {
              return (
                <Card className='w-full max-w-xs' key={card}>
                  <CardHeader>
                    <Skeleton className='h-4 w-2/3' />
                    <Skeleton className='h-4 w-1/2' />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className='aspect-video w-full' />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <div>{error && <p>{error}</p>}</div>

      <div className='p-10 grid grid-cols-3 gap-4'>
        {users.map((user) => (
          // <Link to={`users/${user.id}`}> without / in the beginning complete existing url ❌
          // <Link to={`${user.id}`}> without / in the beginning complete existing url ✅
          <Link to={`/users/${user.id}`}>
            <Card key={user.id}>
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardFooter>
                <img
                  src={`${user.avatar}`}
                  alt='Event cover'
                  className='relative aspect-video w-full object-cover'
                />
              </CardFooter>
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
