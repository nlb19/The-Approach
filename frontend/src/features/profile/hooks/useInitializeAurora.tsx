import { useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export const useInitializeAurora = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { getItem } = useLocalStorage();

    const initAurora = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:3000/aurora/accounts', {
                headers: {
                    'Authorization': `Bearer ${getItem('jwt')}`
                }
            });
            if (response.status === 200) {
                setIsLoading(false);
                console.log(response.data);
                return response.data;
            }
        } catch (error: any) {
            if (error.isAxiosError) {
                setError(error.message);
            }
            setIsLoading(false);
            return;
        }
    }
    return { initAurora, isLoading, error };
}
