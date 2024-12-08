import { message } from "antd";
import { apiClient } from "./apiClient";

export const registerUser = async (data:any) => {
    try{
        const response = await apiClient.post('/auth/signup',data);
        return response.data;
    } catch (error:any) {
        throw new Error('Registration failed: ' + error.message);
      }
}

export const loginUser = async (data:any) => {
    try{
        const response = await apiClient.post('/auth/login',data , {withCredentials:true});
        return response.data;
    }catch(error:any){
        throw new Error("Login Failed" + error.message)
    }
}