import { useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

export const useInitializeProfile = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { getItem } = useLocalStorage();
    const navigate = useNavigate();

    const initProfile = async (input: any) => {
        setIsLoading(true);
        setError(null);

        try{

            const response = await axios.post('http://localhost:3000/profileInit', input, {
                headers: {
                    'Authorization': `Bearer ${getItem('jwt')}`
                }
            });
            
            if (response.status === 200) {
                setIsLoading(false);
                navigate('/');
            }

        } catch (error:any) {
            if(error.isAxiosError){
                setError(error.message);
            }
            setIsLoading(false)
            return;
        }

        
    };

    return { initProfile, isLoading, error };
};
