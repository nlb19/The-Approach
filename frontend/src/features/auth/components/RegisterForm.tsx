import { useState, useEffect } from 'react';
import  { RegisterInputs }  from '../types/AuthTypes';
import { useRegister } from '../hooks/useRegister';
import { TextInput, SubmitInput } from '../../../components/ui/FormInput';

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
      <form className={"font-new-science font-bold max-w-screen-md lg:w-1/2 m-auto p-8 flex flex-col gap-4 rounded-xl bg-light-gray dark:bg-dark-charcoal mt-2 " + (error && "border-2 border-error")} onSubmit={handleSubmit}>
        <TextInput handleChange={handleChange} value={input.email} label="Email" id="email" type="email" />
        <TextInput handleChange={handleChange} value={input.firstName} label="First Name" id="firstName" type="text" />
        <TextInput handleChange={handleChange} value={input.lastName} label="Last Name" id="lastName" type="text" />
        <TextInput handleChange={handleChange} label="Password" id="password" type="password" />
        <TextInput handleChange={handleChange} label="Confirm Password" id="confirmPassword" type="password" />
        <SubmitInput value={isLoading ? 'Loading' : 'Register'}   id="loginSubmit" disabled={isLoading} />
        {error && <div className="text-error">{error}</div>}
      </form>
  )
}

export default RegisterForm;