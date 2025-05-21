import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Function to get CSRF cookie
const getCsrfCookie = async () => {
    try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true
        });
    } catch (error) {
        console.error('Error fetching CSRF cookie:', error);
    }
};

// Add request interceptor
api.interceptors.request.use(async (config) => {
    // Get CSRF cookie before making POST, PUT, DELETE requests
    if (['post', 'put', 'delete'].includes(config.method?.toLowerCase())) {
        await getCsrfCookie();
    }
    
    // Add token if it exists
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 419) {
            console.error('CSRF token mismatch. Please try again.');
        }
        return Promise.reject(error);
    }
);

export const jobsService = {
    // Create a new job
    createJob: async (jobData) => {
        try {
            const response = await api.post('/api/jobs', jobData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all jobs
    getAllJobs: async () => {
        try {
            const response = await api.get('/api/jobs');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get a single job
    getJob: async (id) => {
        try {
            const response = await api.get(`/api/jobs/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update a job
    updateJob: async (id, jobData) => {
        try {
            const response = await api.put(`/api/jobs/${id}`, jobData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete a job
    deleteJob: async (id) => {
        try {
            const response = await api.delete(`/api/jobs/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default jobsService; 