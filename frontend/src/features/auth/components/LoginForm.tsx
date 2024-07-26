import { useEffect, useState } from 'react';
import  { LoginInputs }  from '../types/AuthTypes';
import { useLogin } from '../hooks/useLogin';
import { TextInput, SubmitInput } from '../../../components/ui/FormInput';
import { FormWrapper } from '../../../components/ui/FormWrapper';
import { Link } from 'react-router-dom'


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
      <h1 className="text-2xl font-bold leading-none">Login<br></br><span className="text-sm text-gray-500 leading-tight">If you don't have an account yet, <Link to="/auth/login" className="underline font-italic font-bold leading-tight hover:text-charcoal text-charcoal">register</Link></span></h1>
      <TextInput handleChange={handleChange} label="Email" id="email" type="email" />
      <TextInput handleChange={handleChange} label="Password" id="password" type="password" />
      <SubmitInput value={isLoading ? 'Loading...' : 'Login'} id="loginSubmit" disabled={isLoading} />

      {error && <div className="text-error">{error}</div>}
    
    </FormWrapper>
    
  )
}

export default LoginForm;