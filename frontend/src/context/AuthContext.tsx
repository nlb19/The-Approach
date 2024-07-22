import { createContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext<any | null>(null);

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null, token: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null});
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
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};