import { useEffect, useState } from 'react';
import  { AuroraLoginInputs }  from '../types/AuroraTypes';
import { useAurora } from '../hooks/useAurora';
import { TextInput, SubmitInput } from '../../../components/ui/FormInput';
import { FormWrapper } from '../../../components/ui/FormWrapper';


const TensionLoginForm = () => {
  const { auroraLogin, error, isLoading } = useAurora();
  
  const [input, setInput] = useState<AuroraLoginInputs>({
    board: 'tensionboardapp2',
    username: '',
    password: ''
  });

  useEffect(() => {
    if (error) {
      setInput({
        board: 'tensionboardapp2',
        username: '',
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
    auroraLogin(input);
    
  };
  return (
    <FormWrapper error={error} handleSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold leading-none">Connect your Tension Board account.</h1>
      <TextInput handleChange={handleChange} label="Username" id="username" type="text" />
      <TextInput handleChange={handleChange} label="Password" id="password" type="password" />
      <SubmitInput value={isLoading ? 'Loading...' : 'Login'} id="loginSubmit" disabled={isLoading} />

      {error && <div className="text-error">{error}</div>}
    
    </FormWrapper>
    
  )
}

export default TensionLoginForm;