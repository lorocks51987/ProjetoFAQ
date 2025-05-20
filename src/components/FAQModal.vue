<template>
    <div v-if="mostrar" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-full max-w-2xl border border-[#00FF88]/20">
            <div class="flex justify-between items-start mb-6">
                <h2 class="text-2xl font-bold text-[#00FF88] font-['Orbitron']">Nova Pergunta</h2>
                <button @click="$emit('fechar')" class="text-[#aaaaaa] hover:text-[#00FF88] transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <form @submit.prevent="enviarPergunta" class="space-y-4">
                <div>
                    <label for="produto" class="block text-[#00FF88] font-['Orbitron'] mb-2">Produto</label>
                    <select 
                        id="produto"
                        v-model="produto"
                        class="w-full bg-[#0f0f0f] border border-[#9A00FF]/20 rounded-lg px-4 py-2 text-white focus:border-[#00FF88] focus:outline-none appearance-none cursor-pointer"
                        required
                    >
                        <option value="" disabled selected>Selecione um produto</option>
                        <option v-for="prod in produtos" :key="prod.id" :value="prod.id">{{ prod.nome }}</option>
                    </select>
                </div>
                <div>
                    <label for="Usuario" class="block text-[#00FF88] font-['Orbitron'] mb-2">Usuario</label>
                    <input 
                        type="text" 
                        id="Usuario"
                        v-model="Usuario"
                        placeholder="Digite o nome do Usuario"
                        class="w-full bg-[#0f0f0f] border border-[#9A00FF]/20 rounded-lg px-4 py-2 text-white focus:border-[#00FF88] focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label for="pergunta" class="block text-[#00FF88] font-['Orbitron'] mb-2">Pergunta</label>
                    <input 
                        type="text" 
                        id="pergunta"
                        v-model="pergunta"
                        placeholder="Digite sua pergunta"
                        class="w-full bg-[#0f0f0f] border border-[#9A00FF]/20 rounded-lg px-4 py-2 text-white focus:border-[#00FF88] focus:outline-none"
                        required
                    />
                </div>
                <div class="flex justify-end space-x-4">
                    <button 
                        type="button"
                        @click="$emit('fechar')"
                        class="px-6 py-2 border border-[#9A00FF]/20 rounded-lg text-[#aaaaaa] hover:border-[#00FF88] hover:text-[#00FF88] transition-colors font-['Orbitron']"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit"
                        class="px-6 py-2 bg-[#00FF88] text-[#0f0f0f] rounded-lg hover:bg-[#00cc6a] transition-colors font-['Orbitron'] font-bold"
                    >
                        Enviar Pergunta
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FAQModal',
    props: {
        mostrar: {
            type: Boolean,
            required: true
        },
        produtos: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            produto: '',
            Usuario: '',
            pergunta: '',
            resposta: ''
        }
    },
    methods: {
        enviarPergunta() {
            if (this.produto && this.Usuario.trim() && this.pergunta.trim() && this.resposta.trim()) {
                this.$emit('salvar', {
                    id: Date.now(),
                    produtoId: this.produto,
                    Usuario: this.Usuario,
                    question: this.pergunta,
                    answer: this.resposta,
                    isOpen: false
                })
                this.produto = ''
                this.Usuario = ''
                this.pergunta = ''
                this.resposta = ''
                this.$emit('fechar')
            }
        }
    }
}
</script> 