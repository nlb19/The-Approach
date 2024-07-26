import { useState, useEffect } from 'react';
import  { RegisterInputs }  from '../types/AuthTypes';
import { useRegister } from '../hooks/useRegister';
import { TextInput, SubmitInput } from '../../../components/ui/FormInput';
import { FormWrapper } from '../../../components/ui/FormWrapper';
import { Link } from 'react-router-dom';

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
    <FormWrapper error={error} handleSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold leading-none">Register<br></br><span className="text-sm text-gray-500 leading-tight">If you already have an account, <Link to="/auth/login" className="underline font-italic font-bold leading-tight hover:text-charcoal text-charcoal">sign in</Link></span></h1>
        <TextInput handleChange={handleChange} label="Email" id="email" type="email" />
        <TextInput handleChange={handleChange} label="First Name" id="firstName" type="text" />
        <TextInput handleChange={handleChange} label="Last Name" id="lastName" type="text" />
        <TextInput handleChange={handleChange} label="Password" id="password" type="password" />
        <TextInput handleChange={handleChange} label="Confirm Password" id="confirmPassword" type="password" />
        <SubmitInput value={isLoading ? 'Loading' : 'Register'}   id="loginSubmit" disabled={isLoading} />
        {error && <div className="text-error">{error}</div>}
      </FormWrapper>
  )
}

export default RegisterForm;