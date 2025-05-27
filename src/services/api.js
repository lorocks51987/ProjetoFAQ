import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const faqService = {
    getAllQuestions: () => api.get('/questions'),
    createQuestion: (data) => api.post('/questions', data),
    updateQuestion: (id, data) => api.put(`/questions/${id}`, data),
    deleteQuestion: (id) => api.delete(`/questions/${id}`)
};

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials)
};

export default api; 