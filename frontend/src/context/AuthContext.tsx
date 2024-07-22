import { createContext, useReducer, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext<any | null>(null);

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload};
        case "LOGOUT":
            return { user: null, token: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null});
    const [loading, setLoading] = useState<boolean>(true);
    const { getItem, removeItem } = useLocalStorage();

    useEffect(() => {
        const token = getItem('jwt');
        const user = getItem('user');
        
        if (token && user) {
            dispatch({ type: "LOGIN", payload: JSON.parse(user) });
        } else{
            removeItem('jwt');
            removeItem('user');
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch, loading }}>
            {children}
        </AuthContext.Provider>
    );
};