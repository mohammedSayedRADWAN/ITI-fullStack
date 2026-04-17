import React from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
const QueryParameters = () => {
  const [queryParams, setQueryParams] = useSearchParams(); // Capture Query Parameters
  return (
    <>
      <p>Query Parameter Value: {queryParams.get('q')}</p>

      <Button
        onClick={() => {
          setQueryParams({ q: 16 });
        }}>
        Change Query Parameter Value
      </Button>
    </>
  );
};

export default QueryParameters;
