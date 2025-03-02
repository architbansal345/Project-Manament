import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

const UserProfile = forwardRef(({ profileData }, ref) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: profileData,
  });

  useImperativeHandle(ref, () => ({
    handleSubmit: () => {
      return handleSubmit((data) => {
        console.log('Form submitted:', data);
        return true;
      }, (error) => {
        console.log('Form errors:', error);
        return false; 
      })();
    },
  }));

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="text"
          {...register('phone', { required: 'Phone number is required' })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
    </form>
  );
});

export default UserProfile;
