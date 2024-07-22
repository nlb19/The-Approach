import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';

export const useAuth: any = () => {
    const context = useContext(AuthContext);

    return context;
};