// install a packages -> axios for API calls
import axios from 'axios';
const base_url = "http://localhost:8081/users/";
const registerUser = async (user:any)=>{
    return axios.post(`${base_url}register`,user)
    .then(res=>res.data)
    .catch(err=>{throw err});
}
 
const loginUser = async (login:any)=>{
    return axios.post(`${base_url}login`,login)
    .then(res=>res.data)
    .catch(err=>{throw err});
}
const sendOtp = async (email:any)=>{
    return axios.post(`${base_url}sendOtp/${email}`)
    .then(result => result.data)
    .catch(error=>{throw error;});
}

const verifyOtp = async (email:any ,otp:any)=>{
     return axios.post(`${base_url}verifyOtp/${email}/${otp}`)
    .then(result => result.data)
    .catch(error=>{throw error;});
}

const changePass = async (email:String ,password:string)=>{
     return axios.post(`${base_url}changePass`,{email,password})
    .then(result => result.data)
    .catch(error=>{throw error;});
}
export {registerUser,loginUser,sendOtp,verifyOtp,changePass};