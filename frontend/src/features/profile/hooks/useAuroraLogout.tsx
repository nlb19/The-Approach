import { useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export const useAuroraLogout = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { getItem } = useLocalStorage();

    const auroraLogout = async (board: string) => {
        setIsLoading(true);
        setError(null);

        const boardPayload = {
            Board: board
        }
        try {
            const response = await axios.post('http://localhost:3000/aurora/logout', boardPayload, {
                headers: {
                    'Authorization': `Bearer ${getItem('jwt')}`
                }
            });
            if (response.status === 200) {
                setIsLoading(false);
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
    return { auroraLogout, isLoading, error };
}
