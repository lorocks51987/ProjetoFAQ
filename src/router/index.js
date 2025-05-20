import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import FAQView from '@/views/FAQView.vue'
import ProductManagementView from '@/views/ProductManagementView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView
    },
    {
        path: '/faq',
        name: 'faq',
        component: FAQView
    },
    {
        path: '/produto/:id',
        name: 'product-details',
        component: ProductDetailsView
    },
    {
        path: '/admin/products',
        name: 'product-management',
        component: ProductManagementView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 