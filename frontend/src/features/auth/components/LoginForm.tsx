import { useEffect, useState } from 'react';
import  { LoginInputs }  from '../types/AuthTypes';
import { useLogin } from '../hooks/useLogin';
import { FormInput } from '../../../components/ui/FormInput';
import { FormWrapper } from '../../../components/ui/FormWrapper';


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
    <FormWrapper error={error} handleSubmit={handleSubmit}>
      <FormInput handleChange={handleChange} label="Email" id="email" type="email" />
      <FormInput handleChange={handleChange} label="Password" id="password" type="password" />
      <FormInput value={isLoading ? 'Loading...' : 'Login'} type="submit" id="loginSubmit" disabled={isLoading} />

      {error && <div className="text-error">{error}</div>}
    
    </FormWrapper>
    
  )
}

export default LoginForm;