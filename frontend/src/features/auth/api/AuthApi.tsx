import Axios from 'axios';
import {LoginInputs, RegisterInputs} from '../types/AuthTypes';

import axios from 'axios';



export const LoginApi = async (inputs: LoginInputs) => {
    try {
        const { data } = await axios.post('http://localhost:3000/auth/login', inputs);
        return data;
    } catch (error) {
        // Handle the error here
        console.error('An error occurred during login:', error);
        return error;
    }
    
};

export const RegisterApi = async (inputs: RegisterInputs) => {
    try {
        const { data } = await axios.post('http://localhost:3000/auth/signup', inputs);
        return data;
    } catch (error) {
        // Handle the error here
        console.error('An error occurred during registering:', error);
        console.error(error);
        return error;
    }
    
};
