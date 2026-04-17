import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import DashboardPage from './pages/DashboardPage';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Child from './Child';

const App = () => {
  // Top Level => Place to use Hooks
  const handleClick = () => {
    console.log('Button Clicked');
  };

  // const count = 0;
  // State: Storage => Reactive

  // const [reactiveVariable, functionModifyReactiveVariable] = useState(initialValue);
  const [count, setCount] = useState(0);

  const fruits = ['Apple', 'Orange', 'Banana'];

  const users = [
    {
      id: 1,
      email: 'john@mail.com',
      password: 'changeme',
      name: 'Jhon',
      role: 'customer',
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
      creationAt: '2026-04-11T21:14:51.000Z',
      updatedAt: '2026-04-11T21:14:51.000Z',
    },
    {
      id: 2,
      email: 'maria@mail.com',
      password: '12345',
      name: 'Maria',
      role: 'customer',
      avatar: 'https://i.imgur.com/DTfowdu.jpg',
      creationAt: '2026-04-11T21:14:51.000Z',
      updatedAt: '2026-04-11T21:14:51.000Z',
    },
    {
      id: 3,
      email: 'admin@mail.com',
      password: 'admin123',
      name: 'Admin',
      role: 'admin',
      avatar: 'https://i.imgur.com/yhW6Yw1.jpg',
      creationAt: '2026-04-11T21:14:51.000Z',
      updatedAt: '2026-04-11T21:14:51.000Z',
    },
  ];

  // List/Collection Rendering
  // Conditional Rendering
  // 2 Cases => if/else => Ternary Operator (condition) ? true : false
  // Only one Case => &&

  return (
    <>
      {/* Composition */}
      <Child name='Hager' users={users} staticData={count} />{' '}
      {/* Sending using attributes of HTML Tag */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4'>
        {users.map(({ id, email, name, role }) => (
          <Card size='sm' className='mx-auto w-full max-w-sm' key={id}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{role}</p>
            </CardContent>
            {/* {role == 'admin' ? (
              <div>
                <CardFooter>
                  <Button variant='outline' size='sm' className='w-full'>
                    Action
                  </Button>
                </CardFooter>
              </div>
            ) : (
              <p className='text-center'>You are Not authorized</p>
            )} */}

            {role == 'admin' && (
              <div>
                <CardFooter>
                  <Button variant='outline' size='sm' className='w-full'>
                    Action
                  </Button>
                </CardFooter>
              </div>
            )}
          </Card>
        ))}
      </div>
      <div>
        {/* {users.map((user)=>())} */}
        {users.map(({ id, email, name, role }) => (
          <div key={id}>
            {name} - {email} - <strong>{role}</strong>
          </div>
        ))}
      </div>
      <Button onClick={handleClick}>Inline Event Handler</Button>
      <Button onClick={() => handleClick()}>Inline Event Handler by Callback</Button>
      {/* <p>{count}</p>
      <button
        onClick={() => {
          count + 1;
        }}>
        Addition
      </button> */}
      <ul>
        {fruits.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>


      <p>{count /* use Value of the state */}</p>
      <Button
        onClick={() => {
          setCount(count + 1); // 1st Case
          setCount((prev) => prev + 1); // 2nd Case
        }}>
        Add
      </Button>
      <Button
        variant='outline'
        onClick={() => {
          setCount((prev) => prev + 1);
        }}>
        Button
      </Button>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#' isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default App;
