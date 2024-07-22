import axios from 'axios';

export const verifyToken = async (token: string) => {
    const response = await axios.get('http://localhost:3000/auth/profile', { 
        headers: { Authorization: `Bearer ${token}` }
     });
    const data = await response.data;
    
    
    if (response.status !== 200) {
        throw new Error(data.message);
    }
    if (response.status === 200) {
        return data.user;
    }
};