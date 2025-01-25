import axios from 'axios'

export const apiClient = axios.create({
    baseURL:'http://localhost:8080',
    timeout:10000,
});

apiClient.interceptors.request.use((config) => {
    if(config.data instanceof FormData){
        delete config.headers['Content-Type'];
    }else{
        config.headers['Content-Type'] = 'application/json';
    }
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
