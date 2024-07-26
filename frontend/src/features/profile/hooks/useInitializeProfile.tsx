import { useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { ProfileOptionsInput } from '../types/ProfileTypes';

export const useInitializeProfile = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { getItem } = useLocalStorage();
    const navigate = useNavigate();

    const initProfile = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:3000/profile', {
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
    
    const submitProfile = async (input: ProfileOptionsInput) => {
        setIsLoading(true);
        setError(null);
        
        // Make sure everything in the json is a string
        const convertProfileOptionsToStrings = (data: ProfileOptionsInput) => {
            return {
                dob: data.dob,
                location: data.location,
                discipline: data.discipline,
                hardestBoulder: data.hardestBoulder.toString(),
                hardestRoute: data.hardestRoute.toString(),
                height: data.height.toString(),
                weight: data.weight.toString(),
                maxHang: data.maxHang.toString(),
                maxPull: data.maxPull.toString(),
                experience: data.experience,
                favLocation: data.favLocation,
            };
        };

        const newInput : any = convertProfileOptionsToStrings(input);
        try{
            console.log(newInput);
            const response = await axios.post('http://localhost:3000/profileInit', JSON.stringify(newInput), {
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

    return { initProfile, submitProfile, isLoading, error };
};
