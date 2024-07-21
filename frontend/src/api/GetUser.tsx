import React from 'react';
import axios from 'axios';

export const GetUser = async ()  => {
    const token = localStorage.getItem('token');
    let headers = {
        'Authorization': `Bearer ${token}`
    }
    try {
        const response = await axios.get('http://localhost:3000/auth/profile', { headers: headers });
        return response;
    } catch (err) {
        return err;
    }
}