import React, { useRef } from 'react';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const Uncontrolled = () => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <FieldLabel htmlFor='username'>Username</FieldLabel>
        <Input id='username' type='text' placeholder='Max Leiter' ref={inputRef} />
        <FieldDescription>Choose a unique username for your account.</FieldDescription>
      </Field>
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default Uncontrolled;
