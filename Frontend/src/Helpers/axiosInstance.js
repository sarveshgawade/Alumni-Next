import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3027/api/v1',
  // baseURL: 'https://re-mind-it-backend-gujm18bjs-sarvesh-gawades-projects.vercel.app',
  withCredentials: true 
});

export default axiosInstance;
