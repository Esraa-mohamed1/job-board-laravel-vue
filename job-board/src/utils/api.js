import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const auth = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  resendVerification: () => api.post('/email/resend')
};

// Jobs API calls
export const jobs = {
  getAll: () => api.get('/jobs'),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  apply: (id) => api.post(`/jobs/${id}/apply`)
};

// Blogs API calls
export const blogs = {
  getAll: () => api.get('/blogs'),
  getById: (id) => api.get(`/blogs/${id}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
  addComment: (blogId, data) => api.post(`/blogs/${blogId}/comments`, data)
};

// Companies API calls
export const companies = {
  getProfile: () => api.get('/companies/profile'),
  create: (data) => api.post('/companies', data),
  update: (id, data) => api.put(`/companies/${id}`, data),
  delete: (id) => api.delete(`/companies/${id}`)
};

// User API calls
export const users = {
  getProfile: () => api.get('/user'),
  updateProfile: (data) => api.put('/user', data),
  deleteCV: (userId, resumeId) => api.delete(`/users/${userId}/resumes/${resumeId}`)
};

export default api;