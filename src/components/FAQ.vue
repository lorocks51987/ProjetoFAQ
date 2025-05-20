<template>
    <div class="space-y-6">
        <!-- Botão para abrir modal -->
        <div class="flex justify-end">
            <button 
                @click="mostrarModal = true"
                class="px-6 py-2 bg-[#00FF88] text-[#0f0f0f] rounded-lg hover:bg-[#00cc6a] transition-colors font-['Orbitron'] font-bold"
            >
                Nova Pergunta
            </button>
        </div>

        <!-- Lista de perguntas -->
        <div v-if="faqs.length === 0" class="text-center py-8">
            <p class="text-[#aaaaaa]">Nenhuma pergunta encontrada.</p>
        </div>
        
        <div v-else class="space-y-4">
            <div v-for="faq in faqs" :key="faq.id" 
                 class="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-[#9A00FF]/20 hover:border-[#00FF88]/20 transition-colors">
                <div class="flex justify-between items-start mb-4 cursor-pointer" @click="toggleFaq(faq)">
                    <h3 class="text-xl font-bold text-[#00FF88] font-['Orbitron']">{{ faq.question }}</h3>
                    <button class="text-[#00FF88] hover:text-[#00cc6a] transition-colors">
                        {{ faq.isOpen ? '▼' : '▶' }}
                    </button>
                </div>
                
                <div v-if="faq.isOpen" class="mt-4 p-4 bg-[#0f0f0f] rounded-lg border border-[#00FF88]/20">
                    <div v-if="faq.answer" class="text-white mb-4">{{ faq.answer }}</div>
                    <div v-else class="text-[#aaaaaa] mb-4">Ainda não há resposta para esta pergunta.</div>
                    <div class="flex items-end space-x-4">
                        <textarea 
                            v-model="novaResposta"
                            rows="3"
                            placeholder="Digite sua resposta aqui..."
                            class="flex-1 bg-[#0f0f0f] border border-[#9A00FF]/20 rounded-lg px-4 py-2 text-white focus:border-[#00FF88] focus:outline-none"
                        ></textarea>
                        <button 
                            @click="salvarResposta(faq)"
                            class="px-4 py-2 bg-[#00FF88] text-[#0f0f0f] rounded-lg hover:bg-[#00cc6a] transition-colors font-['Orbitron'] font-bold"
                        >
                            Responder
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de nova pergunta -->
        <FAQModal 
            :mostrar="mostrarModal"
            @fechar="mostrarModal = false"
            @salvar="adicionarPergunta"
        />
    </div>
</template>

<script>
import FAQModal from './FAQModal.vue'

export default {
    name: 'FAQ',
    components: {
        FAQModal
    },
    props: {
        faqs: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            mostrarModal: false,
            novaResposta: ''
        }
    },
    methods: {
        toggleFaq(faq) {
            faq.isOpen = !faq.isOpen
            if (!faq.isOpen) {
                this.novaResposta = ''
            }
        },
        adicionarPergunta(faq) {
            this.$emit('add-faq', faq)
        },
        salvarResposta(faq) {
            if (this.novaResposta.trim()) {
                this.$emit('answer-faq', faq, this.novaResposta)
                this.novaResposta = ''
            }
        }
    }
}
</script>