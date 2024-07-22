import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import axios from 'axios';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';


export const useRegister = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setItem } = useLocalStorage();
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const register = async (input: any) => {
        setIsLoading(true);
        setError(null);

        const apiInputs = {
            email: input.email,
            password: input.password,
            firstName: input.firstName,
            lastName: input.lastName
        };
        if(input.password !== input.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if(!passwordRegex.test(input.password)){
            setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            setIsLoading(false);
            return;
        }
        try{
            
            const response = await axios.post('http://localhost:3000/auth/signup', apiInputs);

            const data = await response.data;
            if (response.status === 200) {
                dispatch({type:"LOGIN", payload: {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                }});
                setItem('user', JSON.stringify({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                }));
                setItem('jwt', data.token);
                setIsLoading(false);
                navigate('/profile-info');
            }
        } catch (error) {
            console.log("error", error);
            if(axios.isAxiosError(error)){
                setError(error.message);
            }
            else{
                setError('An error occurred. Please try again later');
            }
            setIsLoading(false)
            return;
        }
    };

    return { register, isLoading, error };
};
