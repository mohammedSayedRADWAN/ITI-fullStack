import { Link, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';

export default function NotFound404() {
  const location = useLocation();

  return (
    <div className='flex flex-col items-center justify-center py-20 text-center'>
      <h2 className='text-xl font-semibold text-slate-500 mb-2'>
        Currently Browsing: <span className='text-red-500 font-mono'>CLOTHING/FVFVMFOVNFO</span>
      </h2>
      <p className='text-6xl font-bold text-slate-900 mb-4'>404</p>
      <h1 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl'>
        Page not found
      </h1>
      <p className='mt-6 text-lg leading-7 text-slate-600'>
        Sorry, we couldn’t find path: <code className="bg-slate-100 px-2 py-1 rounded text-red-600">{location.pathname}</code>
      </p>
      <div className='mt-10'>
        <Link to='/'>
          <Button size="lg">Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
