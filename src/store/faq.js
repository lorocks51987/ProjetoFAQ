import { ref, computed } from 'vue'
import { faqService } from '@/services/api'

const questions = ref([])
const loading = ref(false)
const error = ref(null)

const faqStore = {
    questions,
    loading,
    error,
    async getQuestions() {
        loading.value = true
        error.value = null

        try {
            const response = await faqService.getAllQuestions()
            questions.value = response.data
        } catch (err) {
            error.value = 'Erro ao carregar perguntas'
            console.error('Error fetching questions:', err)
        } finally {
            loading.value = false
        }
    },
    async addQuestion(questionData) {
        loading.value = true
        error.value = null

        try {
            const response = await faqService.createQuestion(questionData)
            questions.value.push(response.data)
            return response.data
        } catch (err) {
            error.value = 'Erro ao adicionar pergunta'
            console.error('Error adding question:', err)
            throw err
        } finally {
            loading.value = false
        }
    },
    async updateQuestion(id, questionData) {
        loading.value = true
        error.value = null

        try {
            const response = await faqService.updateQuestion(id, questionData)
            const index = questions.value.findIndex(q => q.id === id)
            if (index !== -1) {
                questions.value[index] = response.data
            }
            return response.data
        } catch (err) {
            error.value = 'Erro ao atualizar pergunta'
            console.error('Error updating question:', err)
            throw err
        } finally {
            loading.value = false
        }
    },
    async deleteQuestion(id) {
        loading.value = true
        error.value = null

        try {
            await faqService.deleteQuestion(id)
            questions.value = questions.value.filter(q => q.id !== id)
        } catch (err) {
            error.value = 'Erro ao deletar pergunta'
            console.error('Error deleting question:', err)
            throw err
        } finally {
            loading.value = false
        }
    },
    getQuestionById: computed(() => {
        return (id) => questions.value.find(q => q.id === id)
    })
}

export const faqPlugin = {
    install(app) {
        app.provide('faqStore', faqStore)
    }
}

export function useFaqStore() {
    return faqStore
} 