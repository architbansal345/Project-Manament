import axios from 'axios'
import { cookies } from 'next/headers';

export const apiClient = axios.create({
    baseURL:'http://localhost:8080',
    timeout:10000,
    headers:{
        'Content-type':"application/json",
    }
});

apiClient.interceptors.request.use((config) => {
    return config
})

apiClient.interceptors.response.use((response) => {
    return response;
} , (error) => {
    if( error.response && error.response.status === 401){
        console.error("Error During API called" , error);
    }
    return Promise.reject(error);
});
