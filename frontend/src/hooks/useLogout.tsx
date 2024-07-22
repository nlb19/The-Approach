
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';

export const useLogout = () => {
    const { removeItem } = useLocalStorage();
    const { dispatch } = useAuth();

    const logout = () => {
        dispatch({type:'LOGOUT'});
        removeItem('jwt');
        removeItem('user');
    };

    return { logout };
};
