
import axiosInstance from '../Interceptor/AxiosInterceptor';
// const base_url = "http://localhost:8084/jobs/";

const postJob = async (job:any)=>{
    return axiosInstance.post(`/jobs/post`,job)
    .then(res=>res.data)
    .catch(err=>{throw err});
}

const getAllJobs = async()=>{
    return axiosInstance.get(`/jobs/getAll`)
    .then(result => result.data)
    .catch(error => {throw error});
}
    const getJob=async (id:any)=>{
      return axiosInstance.get(`/jobs/get/${id}`)
    .then(result => result.data)
    .catch(error => {throw error});
    }


export {postJob , getAllJobs , getJob}