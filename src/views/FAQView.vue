<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden">
      <!-- Cabeçalho -->
      <div class="p-4 border-b border-[#00FF88]/20 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-[#00FF88] font-['Orbitron']">Perguntas Frequentes</h1>
          <span v-if="perguntasSemResposta.length > 0" class="px-3 py-1 bg-[#9A00FF] text-white rounded-full text-sm font-['Orbitron']">
            {{ perguntasSemResposta.length }} pendente{{ perguntasSemResposta.length > 1 ? 's' : '' }}
          </span>
        </div>
        <button 
          @click="showNewQuestionModal = true"
          class="px-4 py-2 bg-[#00FF88] text-[#1a1a1a] rounded-lg hover:bg-[#00cc6a] transition-colors font-['Orbitron']"
        >
          Nova Pergunta
        </button>
      </div>

      <!-- Lista de FAQs -->
      <div class="p-6">
        <!-- Perguntas sem Resposta -->
        <div v-if="perguntasSemResposta.length > 0" class="mb-8">
          <h2 class="text-xl font-bold text-[#00FF88] font-['Orbitron'] mb-4">Perguntas Aguardando Resposta</h2>
          <div class="space-y-2">
            <div 
              v-for="faq in perguntasSemRespostaOrdenadas" 
              :key="faq.id"
              class="bg-[#0a0a0a] rounded-lg overflow-hidden"
            >
              <!-- Cabeçalho do Dropdown -->
              <button 
                @click="toggleFaq(faq.id)"
                class="w-full p-4 flex justify-between items-center text-left hover:bg-[#1a1a1a] transition-colors"
              >
                <h3 class="text-lg font-semibold text-white">{{ faq.question }}</h3>
                <span class="text-[#00FF88] transform transition-transform" :class="{ 'rotate-180': openFaqs.includes(faq.id) }">
                  ▼
                </span>
              </button>
              
              <!-- Conteúdo do Dropdown -->
              <div 
                v-show="openFaqs.includes(faq.id)"
                class="p-4 border-t border-[#00FF88]/20 transition-all duration-300 ease-in-out"
                :class="{ 'opacity-100': openFaqs.includes(faq.id), 'opacity-0': !openFaqs.includes(faq.id) }"
              >
                <div class="text-sm text-[#00FF88] mb-4">
                  <p>Autor: {{ faq.autor }}</p>
                </div>
                <div class="flex space-x-4">
                  <div class="flex-1">
                    <input 
                      v-model="faq.novaResposta"
                      type="text"
                      placeholder="Digite sua resposta..."
                      class="w-full px-4 py-2 bg-[#1a1a1a] text-white rounded-lg border transition-colors"
                      :class="[
                        faq.novaResposta ? 'border-[#00FF88]' : 'border-[#00FF88]/20',
                        faq.respostaError ? 'border-red-500' : ''
                      ]"
                      @input="faq.respostaError = false"
                    />
                    <p v-if="faq.respostaError" class="text-red-500 text-sm mt-1">{{ faq.respostaError }}</p>
                  </div>
                  <button 
                    @click="responderPergunta(faq)"
                    class="px-4 py-2 bg-[#00FF88] text-[#1a1a1a] rounded-lg hover:bg-[#00cc6a] transition-colors font-['Orbitron'] disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!faq.novaResposta"
                  >
                    Responder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQs Gerais -->
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-[#00FF88] font-['Orbitron'] mb-4">Perguntas Frequentes Gerais</h2>
          <div class="space-y-2">
            <div 
              v-for="faq in faqsGerais" 
              :key="faq.id"
              class="bg-[#0a0a0a] rounded-lg overflow-hidden"
            >
              <!-- Cabeçalho do Dropdown -->
              <button 
                @click="toggleFaq(faq.id)"
                class="w-full p-4 flex justify-between items-center text-left hover:bg-[#1a1a1a] transition-colors"
              >
                <h3 class="text-lg font-semibold text-white">{{ faq.question }}</h3>
                <span class="text-[#00FF88] transform transition-transform" :class="{ 'rotate-180': openFaqs.includes(faq.id) }">
                  ▼
                </span>
              </button>
              
              <!-- Conteúdo do Dropdown -->
              <div 
                v-show="openFaqs.includes(faq.id)"
                class="p-4 border-t border-[#00FF88]/20"
              >
                <p class="text-gray-300 mb-2">{{ faq.answer }}</p>
                <div class="text-sm text-[#00FF88]">
                  <p>Autor: {{ faq.autor }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Nova Pergunta -->
    <div v-if="showNewQuestionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-lg">
        <h2 class="text-xl font-bold text-[#00FF88] font-['Orbitron'] mb-4">Nova Pergunta</h2>
        <div class="space-y-4">
          <!-- Tipo de Pergunta -->
          <div>
            <label class="block text-white mb-2">Tipo de Pergunta</label>
            <div class="flex space-x-4">
              <button 
                @click="novaPergunta.tipo = 'loja'"
                class="flex-1 px-4 py-2 rounded-lg border transition-colors font-['Orbitron']"
                :class="[
                  novaPergunta.tipo === 'loja' 
                    ? 'bg-[#00FF88] text-[#1a1a1a] border-[#00FF88]' 
                    : 'bg-[#0a0a0a] text-white border-[#00FF88]/20 hover:border-[#00FF88]'
                ]"
              >
                Sobre a Loja
              </button>
              <button 
                @click="novaPergunta.tipo = 'produto'"
                class="flex-1 px-4 py-2 rounded-lg border transition-colors font-['Orbitron']"
                :class="[
                  novaPergunta.tipo === 'produto' 
                    ? 'bg-[#00FF88] text-[#1a1a1a] border-[#00FF88]' 
                    : 'bg-[#0a0a0a] text-white border-[#00FF88]/20 hover:border-[#00FF88]'
                ]"
              >
                Sobre um Produto
              </button>
            </div>
          </div>

          <!-- Seleção de Produto (apenas se tipo for 'produto') -->
          <div v-if="novaPergunta.tipo === 'produto'">
            <label class="block text-white mb-2">Selecione o Produto</label>
            <select 
              v-model="novaPergunta.produtoId"
              class="w-full px-4 py-2 bg-[#0a0a0a] text-white rounded-lg border border-[#00FF88]/20 focus:border-[#00FF88] focus:outline-none"
            >
              <option value="" disabled>Escolha um produto</option>
              <option value="1">Smartphone XYZ</option>
              <option value="2">Notebook Pro</option>
              <option value="3">Smart TV 4K</option>
            </select>
          </div>

          <div>
            <label class="block text-white mb-2">Sua Pergunta</label>
            <textarea 
              v-model="novaPergunta.question"
              class="w-full px-4 py-2 bg-[#0a0a0a] text-white rounded-lg border border-[#00FF88]/20 focus:border-[#00FF88] focus:outline-none"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label class="block text-white mb-2">Seu Nome</label>
            <input 
              v-model="novaPergunta.autor"
              type="text"
              class="w-full px-4 py-2 bg-[#0a0a0a] text-white rounded-lg border border-[#00FF88]/20 focus:border-[#00FF88] focus:outline-none"
            />
          </div>
          <div class="flex justify-end space-x-4">
            <button 
              @click="showNewQuestionModal = false"
              class="px-4 py-2 text-[#00FF88] hover:text-[#00cc6a] transition-colors font-['Orbitron']"
            >
              Cancelar
            </button>
            <button 
              @click="enviarNovaPergunta"
              class="px-4 py-2 bg-[#00FF88] text-[#1a1a1a] rounded-lg hover:bg-[#00cc6a] transition-colors font-['Orbitron']"
              :disabled="!novaPergunta.tipo || !novaPergunta.question || !novaPergunta.autor || (novaPergunta.tipo === 'produto' && !novaPergunta.produtoId)"
            >
              Enviar Pergunta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQView',
  data() {
    return {
      openFaqs: [],
      showNewQuestionModal: false,
      novaPergunta: {
        tipo: 'loja',
        produtoId: '',
        question: '',
        autor: ''
      },
      perguntasSemResposta: [
        {
          id: 1,
          question: 'Como posso entrar em contato com o suporte?',
          autor: 'Carlos Eduardo',
          novaResposta: '',
          respostaError: null,
          data: new Date('2024-03-15')
        },
        {
          id: 2,
          question: 'Quais são os métodos de pagamento aceitos?',
          autor: 'Mariana Silva',
          novaResposta: '',
          respostaError: null,
          data: new Date('2024-03-14')
        }
      ],
      faqsGerais: [
        {
          id: 1,
          question: 'Como funciona a garantia dos produtos?',
          answer: 'Todos os nossos produtos possuem garantia de 12 meses contra defeitos de fabricação. A garantia cobre problemas de hardware e software que não sejam causados por uso inadequado.',
          autor: 'João Silva'
        },
        {
          id: 2,
          question: 'Qual o prazo de entrega?',
          answer: 'O prazo de entrega varia de acordo com a sua localização. Em média, as entregas são realizadas em 3-5 dias úteis após a confirmação do pagamento.',
          autor: 'Maria Santos'
        },
        {
          id: 3,
          question: 'Posso trocar ou devolver um produto?',
          answer: 'Sim, você tem até 7 dias para trocar ou devolver um produto, desde que ele esteja em perfeito estado e com todos os acessórios originais.',
          autor: 'Pedro Oliveira'
        }
      ]
    }
  },
  computed: {
    perguntasSemRespostaOrdenadas() {
      return [...this.perguntasSemResposta].sort((a, b) => b.data - a.data)
    }
  },
  methods: {
    toggleFaq(faqId) {
      const index = this.openFaqs.indexOf(faqId)
      if (index === -1) {
        this.openFaqs.push(faqId)
      } else {
        this.openFaqs.splice(index, 1)
      }
    },
    enviarNovaPergunta() {
      if (!this.novaPergunta.tipo || !this.novaPergunta.question || !this.novaPergunta.autor) {
        alert('Por favor, preencha todos os campos')
        return
      }

      if (this.novaPergunta.tipo === 'produto' && !this.novaPergunta.produtoId) {
        alert('Por favor, selecione um produto')
        return
      }

      if (this.novaPergunta.tipo === 'produto') {
        this.$router.push(`/produto/${this.novaPergunta.produtoId}`)
        this.showNewQuestionModal = false
        return
      }

      const novaPergunta = {
        id: Date.now(),
        question: this.novaPergunta.question,
        autor: this.novaPergunta.autor,
        novaResposta: '',
        respostaError: null,
        data: new Date()
      }

      this.perguntasSemResposta.push(novaPergunta)
      this.showNewQuestionModal = false
      this.novaPergunta = { tipo: 'loja', produtoId: '', question: '', autor: '' }
    },
    responderPergunta(faq) {
      if (!faq.novaResposta) {
        faq.respostaError = 'Por favor, digite uma resposta'
        return
      }

      // Adiciona a pergunta respondida ao faqsGerais
      this.faqsGerais.push({
        id: faq.id,
        question: faq.question,
        answer: faq.novaResposta,
        autor: faq.autor
      })

      // Remove a pergunta da lista de perguntas sem resposta
      const index = this.perguntasSemResposta.findIndex(p => p.id === faq.id)
      if (index !== -1) {
        this.perguntasSemResposta.splice(index, 1)
      }
    }
  }
}
</script> 