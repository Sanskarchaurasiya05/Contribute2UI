import axios, { type InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8084/',
  });

axiosInstance.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
error=>{
    return Promise.reject(error);
}
);

export const setupResponseInterceptor = (navigate: any) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const currentPath = window.location.pathname;

        // ✅ Allow direct access to login/signup pages
        if (currentPath !== "/login" && currentPath !== "/signup") {
          const token = localStorage.getItem("token");

          if (!token) {
            // 👉 No token → first time user → signup
            navigate("/signup");
          } else {
            // 👉 Token exists but invalid/expired → login
            localStorage.removeItem("token");
            navigate("/login");
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;