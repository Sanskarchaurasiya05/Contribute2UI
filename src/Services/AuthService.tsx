import axios from "axios";
const base_url = "http://localhost:8084/auth/";

const loginUser = async (login:any)=>{
    return axios.post(`${base_url}login`,login)
    .then(res=>res.data)
    .catch(err=>{throw err});
}

const navigateToLogin=(navigate:any)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');

}


export {loginUser,navigateToLogin};
