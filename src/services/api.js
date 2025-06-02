import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const API_URL = 'https://q6dn5s2g-5242.brs.devtunnels.ms';

// Função para obter o token do localStorage
const getAuthToken = () => {
    const token = localStorage.getItem('token');
    console.log('[API] Token encontrado:', token ? 'Sim' : 'Não');
    return token ? `Bearer ${token}` : null;
};

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 30000,
    withCredentials: false,
    proxy: false,
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
});

// Função para delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
    config => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = token;
            console.log('[API] Token adicionado à requisição:', {
                url: config.url,
                method: config.method,
                headers: config.headers
            });
        } else {
            console.log('[API] Nenhum token encontrado para a requisição:', {
                url: config.url,
                method: config.method
            });
        }
        return config;
    },
    error => {
        console.error('[API Request Interceptor Error]', error);
        return Promise.reject(error);
    }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
    response => {
        console.log('[API Response]', {
            url: response.config.url,
            method: response.config.method,
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error('[API Error]', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        if (error.response?.status === 401) {
            console.log('[API] Erro de autenticação detectado. Token atual:', getAuthToken());
            localStorage.removeItem('token');
        }

        return Promise.reject(error);
    }
);

// Função para retry
const retryRequest = async (config, retryCount = 0) => {
    try {
        if (!config.url.startsWith('/api')) {
            config.url = `/api${config.url}`;
        }

        console.log(`[API Request] Tentativa ${retryCount + 1}/${MAX_RETRIES}`, {
            method: config.method,
            url: config.url,
            headers: config.headers,
            data: config.data
        });

        const response = await api(config);

        console.log(`[API Response] Tentativa ${retryCount + 1}/${MAX_RETRIES}`, {
            status: response.status,
            data: response.data
        });

        return response;
    } catch (error) {
        console.error(`[API Error] Tentativa ${retryCount + 1}/${MAX_RETRIES}`, {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });

        const shouldRetry = retryCount < MAX_RETRIES && (
            error.code === 'ECONNABORTED' ||
            error.response?.status >= 500 ||
            error.message === 'Network Error' ||
            error.code === 'ERR_NETWORK'
        );

        if (shouldRetry) {
            console.log(`[API Retry] Aguardando ${RETRY_DELAY}ms antes da próxima tentativa...`);
            await delay(RETRY_DELAY);
            return retryRequest(config, retryCount + 1);
        }

        throw error;
    }
};

export const authService = {
    login: (credentials) => retryRequest({ method: 'post', url: '/auth/login', data: credentials })
};

export const faqService = {
    getAllQuestions: () => {
        console.log('Buscando todas as perguntas...')
        return retryRequest({ method: 'get', url: '/api/questions' })
    },
    createQuestion: (data) => {
        console.log('Criando nova pergunta:', data)
        return retryRequest({ method: 'post', url: '/api/questions', data })
    },
    updateQuestion: (id, data) => {
        console.log('Atualizando pergunta:', { id, data })
        return retryRequest({ method: 'put', url: `/api/questions/${id}`, data })
    },
    deleteQuestion: (id) => {
        console.log('Deletando pergunta:', id)
        return retryRequest({ method: 'delete', url: `/api/questions/${id}` })
    }
};

export const answerService = {
    createAnswer: (questionId, data) => {
        console.log('Criando resposta:', { questionId, data })
        return retryRequest({ method: 'post', url: `/api/questions/${questionId}/answers`, data })
    },
    updateAnswer: (questionId, answerId, data) => {
        console.log('Atualizando resposta:', { questionId, answerId, data })
        return retryRequest({ method: 'put', url: `/api/questions/${questionId}/answers/${answerId}`, data })
    },
    deleteAnswer: (questionId, answerId) => {
        console.log('Deletando resposta:', { questionId, answerId })
        return retryRequest({ method: 'delete', url: `/api/questions/${questionId}/answers/${answerId}` })
    }
};

export const productService = {
    getAllProducts: () => retryRequest({ method: 'get', url: '/api/products' }),
    getProduct: (id) => retryRequest({ method: 'get', url: `/api/products/${id}` }),
    createProduct: (data) => retryRequest({
        method: 'post',
        url: '/api/products',
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            available: data.available
        }
    }),
    updateProduct: (id, data) => retryRequest({
        method: 'put',
        url: `/api/products/${id}`,
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            available: data.available
        }
    }),
    deleteProduct: (id) => retryRequest({ method: 'delete', url: `/api/products/${id}` })
};

export default api; 