import axios from 'axios';

const baseURL = 'http://127.0.1.8:8000';

// إنشاء instance لطلبات الوظائف
const jobsApi = axios.create({
  baseURL: `${baseURL}/api/jobs`,
  withCredentials: true, // ضروري عشان Laravel يعرف الجلسة
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// إضافة التوكن إذا كان موجود
jobsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// استدعاء csrf-cookie قبل أول طلب محمي
const prepareCSRF = async () => {
  await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
    withCredentials: true
  });
};

export const jobsService = {
  async getAll() {
    return jobsApi.get('/');
  },

  async getById(id) {
    return jobsApi.get(`/${id}`);
  },

  async create(data) {
    await prepareCSRF(); // تأكدي من csrf
    return jobsApi.post('/', data);
  },

  async update(id, data) {
    await prepareCSRF();
    return jobsApi.put(`/${id}`, data);
  },

  async delete(id) {
    await prepareCSRF();
    return jobsApi.delete(`/${id}`);
  }
};
