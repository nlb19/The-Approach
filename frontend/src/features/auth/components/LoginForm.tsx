import { useEffect, useState } from 'react';
import  { LoginInputs }  from '../types/AuthTypes';
import { useLogin } from '../../../hooks/useLogin';
import { FormInput } from '../../../components/ui/FormInput';


const LoginForm = () => {
  const { login, error, isLoading } = useLogin();
  
  const [input, setInput] = useState<LoginInputs>({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (error) {
      setInput({
        email: '',
        password: ''
      })
    }
  }, [error]);
  const handleChange = (e:any) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    login(input);
    
  };
  return (
    <form className="font-new-science font-bold w-1/3 m-auto p-8 flex flex-col gap-4"onSubmit={handleSubmit}>
      <FormInput handleChange={handleChange} value={input.email} label="Email" id="email" type="email" />
      <FormInput handleChange={handleChange} value={input.password} label="Password" id="password" type="password" />
      <FormInput value={isLoading ? 'Loading...' : 'Login'} type="submit" id="loginSubmit" disabled={isLoading} />

      {error && <div className="text-error">{error}</div>}
    
    </form>
    
  )
}

export default LoginForm;