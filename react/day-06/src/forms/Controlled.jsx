import React, { useState } from 'react';
import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Must be at least 3 characters long')
      .max(10, 'Must be at most 10 characters long')
      .regex(/^[A-Za-z1-9]+$/, 'Only alphanumeric characters allowed'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

const Controlled = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const result = registerSchema.safeParse(form);

    if (!result.success) {
      // Map Zod errors to a flat object { fieldName: message }
      // const formattedErrors = result.error.flatten().fieldErrors;
      const formattedErrors = z.treeifyError(result.error);
      setErrors(formattedErrors);
      return;
    }

    // Clear errors on successful validation
    setErrors({});
    console.log('Valid Form Data:', result.data);

    try {
      await fetch('https://retoolapi.dev/x8cdrs/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      alert('Registration successful!');
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {/* Email Field - Added this as it was in your schema but missing in JSX */}
      <Field>
        <FieldLabel htmlFor='email'>Email</FieldLabel>
        <Input
          id='email'
          name='email'
          type='email'
          onChange={handleChange}
          value={form.email}
        />
        {errors.email && <FieldError>{errors.email[0]}</FieldError>}
      </Field>
      
      {/* Username Field */}
      <Field>
        <FieldLabel htmlFor='username'>Username</FieldLabel>
        <Input
          id='username'
          name='username'
          type='text'
          onChange={handleChange}
          value={form.username}
        />
        {errors.username && <FieldError>{errors.username[0]}</FieldError>}
      </Field>

      {/* Password Field */}
      <Field>
        <FieldLabel htmlFor='password'>Password</FieldLabel>
        <Input
          id='password'
          name='password'
          type='password'
          onChange={handleChange}
          value={form.password}
        />
        {errors.password && <FieldError>{errors.password[0]}</FieldError>}
      </Field>

      {/* Confirm Password Field */}
      <Field>
        <FieldLabel htmlFor='confirm'>Confirm Password</FieldLabel>
        <Input
          id='confirm'
          name='confirm'
          type='password'
          onChange={handleChange}
          value={form.confirm}
        />
        {errors.confirm && <FieldError>{errors.confirm[0]}</FieldError>}
      </Field>

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default Controlled;
