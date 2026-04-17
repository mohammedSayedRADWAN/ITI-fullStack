import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { instance } from './AxiosInstance';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, ShieldCheck, Calendar } from 'lucide-react';

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        // const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`);
        const response = await instance.get(`${id}`);
        console.log('Response:', response);
        console.log('Data:', response.data);

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  return (
    <>
      <div className='container mx-auto p-10 max-w-3xl'>
        <Button variant='ghost' onClick={() => navigate('/users')} className='mb-6'>
          <ArrowLeft className='mr-2 h-4 w-4' /> Back to Users
        </Button>
        <div>{isLoading && <p>Loading ....</p>}</div>
        {user && (
          <Card className='overflow-hidden'>
            <div className='h-32 bg-gradient-to-r from-blue-500 to-purple-600' />
            <CardHeader className='relative flex flex-col items-center -mt-16'>
              <Avatar className='h-32 w-32 border-4 border-background'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='text-2xl'>
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='mt-4 text-center'>
                <CardTitle className='text-3xl font-bold'>{user.name}</CardTitle>
                <Badge variant='secondary' className='mt-2 capitalize'>
                  {user.role}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className='grid gap-6 p-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center space-x-3 text-muted-foreground'>
                  <Mail className='h-5 w-5' />
                  <span>{user.email}</span>
                </div>
                <div className='flex items-center space-x-3 text-muted-foreground'>
                  <ShieldCheck className='h-5 w-5' />
                  <span>ID: {user.id}</span>
                </div>
                <div className='flex items-center space-x-3 text-muted-foreground'>
                  <Calendar className='h-5 w-5' />
                  <span>Joined: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className='pt-6 border-t'>
                <h3 className='font-semibold mb-2'>Account Status</h3>
                <p className='text-sm text-muted-foreground'>
                  This user account is currently active and has access to the platform's
                  resources.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        <div>{error && <p>{error}</p>}</div>
      </div>
    </>
  );
};

export default UserDetailsPage;
