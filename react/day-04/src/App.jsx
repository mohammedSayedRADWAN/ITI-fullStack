import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router';

const App = () => {
  const [count, setCount] = useState(0);
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

  return (
    <>
      <Button
        variant='outline'
        onClick={() => {
          setCount((prev) => prev + 1);
        }}>
        <p className='text-center'>{count}</p>
      </Button>

      <Button variant='outline' className='ms-4' onClick={handleNavigation}>
        Redirect
      </Button>

      <Link to={`search?q=${count}`} className='ms-4'>
        <Button>Send Data</Button>
      </Link>

      <Button
        className='ms-4'
        onClick={() => {
          navigate(`search?q=${role}`);
        }}>
        Navigate + Data
      </Button>

      <div className='mt-4'>
        Using useLocation():
        <p>Path: {location.pathname}</p>
        <p>Query Parameters: {location.search}</p>
      </div>
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
