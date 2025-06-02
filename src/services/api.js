import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const API_URL = 'https://q6dn5s2g-5242.brs.devtunnels.ms/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    timeout: 10000,
    withCredentials: false
});

// Função para delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para retry
const retryRequest = async (config, retryCount = 0) => {
    try {
        console.log(`Tentativa ${retryCount + 1} de ${MAX_RETRIES} para ${config.url}`, config)
        const response = await api(config)
        console.log(`Resposta da tentativa ${retryCount + 1}:`, response)
        return response
    } catch (error) {
        console.error(`Erro na tentativa ${retryCount + 1}:`, error)
        if (retryCount < MAX_RETRIES && (error.code === 'ECONNABORTED' || error.response?.status >= 500)) {
            console.log(`Aguardando ${RETRY_DELAY}ms antes da próxima tentativa...`)
            await delay(RETRY_DELAY)
            return retryRequest(config, retryCount + 1)
        }
        throw error
    }
};

// Interceptor para logs
api.interceptors.request.use(
    config => {
        console.log('API Request:', {
            url: config.url,
            method: config.method,
            data: config.data
        })
        return config
    },
    error => {
        console.error('API Request Error:', error)
        return Promise.reject(error)
    }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
    response => {
        console.log('API Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data
        })
        return response
    },
    error => {
        console.error('API Response Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        })
        return Promise.reject(error)
    }
);

export const authService = {
    login: (credentials) => retryRequest({ method: 'post', url: '/auth/login', data: credentials })
};

export const faqService = {
    getAllQuestions: () => {
        console.log('Buscando todas as perguntas...')
        return api.get('/questions')
    },
    createQuestion: (data) => {
        console.log('Criando nova pergunta:', data)
        return api.post('/questions', data)
    },
    updateQuestion: (id, data) => {
        console.log('Atualizando pergunta:', { id, data })
        return api.put(`/questions/${id}`, data)
    },
    deleteQuestion: (id) => {
        console.log('Deletando pergunta:', id)
        return api.delete(`/questions/${id}`)
    }
};

export const answerService = {
    createAnswer: (questionId, data) => {
        console.log('Criando resposta:', { questionId, data })
        return api.post(`/questions/${questionId}/answers`, data)
    },
    updateAnswer: (id, data) => retryRequest({ method: 'put', url: `/answers/${id}`, data }),
    deleteAnswer: (id) => retryRequest({ method: 'delete', url: `/answers/${id}` })
};

export const productService = {
    getAllProducts: () => {
        console.log('Buscando todos os produtos...')
        return api.get('/products')
    },
    getProduct: (id) => retryRequest({ method: 'get', url: `/products/${id}` }),
    createProduct: (data) => retryRequest({
        method: 'post',
        url: '/products',
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            available: data.available
        }
    }),
    updateProduct: (id, data) => retryRequest({
        method: 'put',
        url: `/products/${id}`,
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            available: data.available
        }
    }),
    deleteProduct: (id) => retryRequest({ method: 'delete', url: `/products/${id}` })
};

export default api; 