import React,{ useState, useContext } from 'react';
import  { RegisterInputs }  from '../types/AuthTypes';
import { RegisterApi } from '../api/AuthApi';
import { useRegister } from '../../../hooks/useRegister';


const RegisterForm = () => {
  const { register, error, isLoading } = useRegister();
  
  const [input, setInput] = useState<RegisterInputs>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e:any) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await register(input);
  };
  return (
    <form className="font-new-science font-bold" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input 
          onChange={handleChange}
          value={input.email}
          className="bg-tan dark:bg-purple" 
          type="email" 
          id="email"
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input 
          onChange={handleChange}
          value={input.firstName}
          className="bg-tan dark:bg-purple" 
          type="text" 
          id="firstName"
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input 
          onChange={handleChange}
          value={input.lastName}
          className="bg-tan dark:bg-purple" 
          type="text" 
          id="lastName"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
          onChange={handleChange} 
          value={input.password}
          className="bg-tan dark:bg-purple" 
          type="password" id="password"
        />
      </div>
      <div>
        <label htmlFor="password">Confirm Password</label>
        <input 
          onChange={handleChange} 
          value={input.confirmPassword}
          className="bg-tan dark:bg-purple" 
          type="password" id="confirmPassword"
        />
      </div>
      <button 
        className="bg-dark-blue dark:bg-light-green" 
        type="submit"
        disabled={isLoading}
      >
        Login
      </button>
      {error && <div>{error}</div>}
    </form>
    
  )
}

export default RegisterForm;