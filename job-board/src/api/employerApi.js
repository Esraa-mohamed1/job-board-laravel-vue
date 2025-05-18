import axios from 'axios';

const employerApi = axios.create({
  baseURL: 'http://127.0.1.8:8000/api/companies', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

employerApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default employerApi;