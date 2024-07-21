import { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import  { LoginInputs }  from '../types/AuthTypes';
import { LoginApi } from '../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { User } from '../../../types/User';


const LoginForm = () => {
  const { 
    register, 
    handleSubmit,
    setError,
    formState:{errors} 
  } = useForm<LoginInputs>();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const onSubmit: SubmitHandler<LoginInputs> = async input => {
    setLoading(true);
    setError('root', {message: ''});
    const user = await LoginApi(input)

    if (user instanceof Error) {
      setError('root', {message: 'Invalid Credentials'});
      setLoading(false);
      return;
    } else{
      login(user as User);
      navigate('/');
      window.location.reload();
    }
    

  }

  return (
    <form className="font-new-science font-bold"onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input className="bg-tan dark:bg-purple" type="email" id="email" {...register('email', { required: "Email Address is required" })} aria-invalid={errors.email ? true : false}/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input className="bg-tan dark:bg-purple" type="password" id="password" {...register('password')}/>
      </div>
      {errors.email && <p className="text-error" role="alert">{errors.email.message}</p>}
      {errors.root && <p className="text-error" role="alert">{errors.root.message}</p>}
      <button className="bg-dark-blue dark:bg-light-green" type="submit">
        {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
        )}
        Login
      </button>
    </form>
    
  )
}

export default LoginForm