import { useState } from 'react';
import { useAuth } from './useAuth';
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setItem } = useLocalStorage();
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const login = async (input: any) => {
        setIsLoading(true);
        setError(null);

        const apiInputs = {
            email: input.email,
            password: input.password
        };
        try{
            const response = await axios.post('http://localhost:3000/auth/login', apiInputs);

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
                navigate('/');
            }
        } catch (error) {
            setError('Invalid email or password');
            setIsLoading(false)
            return;
        }

        
    };

    return { login, isLoading, error };
};
