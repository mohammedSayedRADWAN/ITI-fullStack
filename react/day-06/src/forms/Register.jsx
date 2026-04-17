import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldGroup,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router';

export function Register({ ...props }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Username Validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (/\s/.test(formData.username)) {
      newErrors.username = 'Username must not contain spaces';
    }

    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@%$#]).{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and a special character (*@%$#)';
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error for the field being edited
    if (errors[id]) {
        setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(formData, null, 2));
      navigate('/'); // Redirect to home (products list/root)
    }
  };

  return (
    <Card {...props} className="mx-auto max-w-lg mt-10">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Please fill in the form to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Name Field */}
            <Field>
              <FieldLabel htmlFor='name'>Name</FieldLabel>
              <Input
                id='name'
                type='text'
                placeholder='Enter your name'
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>

            {/* Username Field */}
            <Field>
              <FieldLabel htmlFor='username'>User Name</FieldLabel>
              <Input
                id='username'
                type='text'
                placeholder='Enter username'
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <FieldError>{errors.username}</FieldError>}
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input
                id='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>

            {/* Confirm Password Field */}
            <Field>
              <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
              <Input
                id='confirmPassword'
                type='password'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword}</FieldError>
              )}
            </Field>

            <Button type='submit' className='w-full mt-4 bg-green-600 hover:bg-green-700 text-white'>
              Register
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

