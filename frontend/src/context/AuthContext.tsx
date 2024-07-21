import { createContext } from 'react';
import { User } from '../types/User';

interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContext>({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
    setUser: () => {}
});