import axios from 'axios';

const employerApi = axios.create({
  baseURL: 'http://127.0.1.8:8000/api/companies', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

employerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API Service Methods
export const employerService = {
  // Get all employers
  getAll() {
    return employerApi.get('/');
  },

  // Get employer by ID
  getById(id) {
    return employerApi.get(`/${id}`);
  },

  // Create new employer
  create(data) {
    return employerApi.post('/', data);
  },

  // Update employer
  update(id, data) {
    return employerApi.put(`/${id}`, data);
  },

  // Delete employer
  delete(id) {
    return employerApi.delete(`/${id}`);
  },

  // Get employer jobs
  getJobs(id) {
    return employerApi.get(`/${id}/jobs`);
  }
};

export default employerApi;