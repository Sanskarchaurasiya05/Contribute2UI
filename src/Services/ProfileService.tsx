
import axiosInstance from '../Interceptor/AxiosInterceptor';
// const base_url = "http://localhost:8084/profiles/";

const getProfile = async (id:number)=>{
    return axiosInstance.get(`/profiles/get/${id}`)
    .then(res=>res.data)
    .catch(err=>{throw err});
}

const updateProfile = async (profile:any)=>{
    return axiosInstance.put(`/profiles/update`,profile)
    .then(res=>res.data)
    .catch(err=>{throw err});
}

export {getProfile,updateProfile}