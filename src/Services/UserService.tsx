// install a packages -> axios for API calls
import axios from 'axios';
import axiosInstance from '../Interceptor/AxiosInterceptor';
const base_url = "http://localhost:8084/users/";
const registerUser = async (user:any)=>{
    return axiosInstance.post(`/users/register`,user)
    .then(res=>res.data)
    .catch(err=>{throw err});
}
 
const loginUser = async (login:any)=>{
    return axiosInstance.post(`/users/login`,login)
    .then(res=>res.data)
    .catch(err=>{throw err});
}
const sendOtp = async (email:any)=>{
    return axiosInstance.post(`/users/sendOtp/${email}`)
    .then(result => result.data)
    .catch(error=>{throw error;});
}

const verifyOtp = async (email:any ,otp:any)=>{
     return axios.post(`/users/verifyOtp/${email}/${otp}`)
    .then(result => result.data)
    .catch(error=>{throw error;});
}

const changePass = async (email:String ,password:string)=>{
     return axios.post(`/users/changePass`,{email,password})
    .then(result => result.data)
    .catch(error=>{throw error;});
}
export {registerUser,loginUser,sendOtp,verifyOtp,changePass};