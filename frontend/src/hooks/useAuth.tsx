import {  useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth: any = () => {
    
    const context = useContext(AuthContext);

    return context;
};