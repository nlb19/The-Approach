import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RegisterInputs } from '../types/AuthTypes';
import { RegisterApi } from '../api/AuthApi'
import { useAuth } from '../../../hooks/useAuth';
import { User } from '../../../types/User';
import { z }  from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const RegisterForm = () => {
  const schema = z.object({
    email: z.string().min(1, {message: ''}).email('Invalid email address'),
    firstName: z.string().min(1, {message: 'First name is required'}),
    lastName: z.string().min(1, {message: 'First name is required'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters'})
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

  type ValidationSchemaType = z.infer<typeof schema>;
  
  const { 
    register, 
    handleSubmit,
    setError,
    formState:{errors} 
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema)
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onSubmit: SubmitHandler<ValidationSchemaType> = async input => {
    const { confirmPassword, ...rest } = input;
    setLoading(true);
    setError('root', {message: ''});
    const user = await RegisterApi(input)

    if (user instanceof Error) {
      setError('root', {message: 'Invalid Credentials'});
      setLoading(false);
      return;
    } else{
      login(user as User);
      
    }


  }
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      navigate('/');
      window.location.reload();
    }
  }, [user, navigate])
  return (
    
    <form className="font-new-science font-bold"onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input className="bg-tan dark:bg-purple" type="email" id="email" {...register('email')} aria-invalid={errors.email ? true : false}/>
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input className="bg-tan dark:bg-purple" type="text" id="firstName" {...register('firstName')}/>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input className="bg-tan dark:bg-purple" type="text" id="lastName" {...register('lastName')}/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input className="bg-tan dark:bg-purple" type="password" id="password" {...register('password')}/>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input className="bg-tan dark:bg-purple" type="password" id="confirmPassword" {...register('confirmPassword')}/>
      </div>
      {errors.email && <p className="text-error" role="alert">{errors.email.message}</p>}
      {errors.root && <p className="text-error" role="alert">{errors.root.message}</p>}
      <button className="bg-dark-blue dark:bg-light-green" type="submit">
        {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
        )}
        Register
      </button>
    </form>
  )
}

export default RegisterForm