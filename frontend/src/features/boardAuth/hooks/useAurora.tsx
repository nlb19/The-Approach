import { useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

export const useAurora = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setItem, getItem } = useLocalStorage();
    const navigate = useNavigate();

    const auroraLogin = async (input: any) => {
        setIsLoading(true);
        setError(null);

        const apiInputs = {
            board: input.board,
            user: input.username,
            password: input.password
        };
        try{
            const response = await axios.post('http://localhost:3000/auroraLogin', apiInputs, {
                headers: {
                    'Authorization': `Bearer ${getItem('jwt')}`
                }
            });

            const data = await response.data;

            if (response.status === 200) {
                console.log(data);
                setItem('aurora', JSON.stringify({
                    username: data.username,
                    userID: data.userID,
                    token: data.token,
                }));
                setIsLoading(false);
                navigate('/');
            }
        } catch (error) {
            setError('Invalid username or password');
            setIsLoading(false)
            return;
        }

        
    };

    return { auroraLogin, isLoading, error };
};
