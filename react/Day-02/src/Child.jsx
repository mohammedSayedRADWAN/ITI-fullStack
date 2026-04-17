import React from 'react';

const Child = ({ name, users }) => {
  return (
    <>
      <div>{name}</div>
      <div>
        Users Passed As Prop
        {users.map(({ id, email }) => (
          <div key={id}>
            <strong>{email}</strong>
          </div>
        ))}
      </div>
    </>
  );
};

export default Child;
