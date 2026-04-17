import React from 'react';
import { Link, useParams } from 'react-router';

const DynamicRoute = () => {
  const pathParams = useParams(); // Capture Path Parameters
  return (
    <>
      <p>Dynamic Route Page</p>
      <p>User ID: {pathParams.id}</p>
    </>
  );
};

export default DynamicRoute;
