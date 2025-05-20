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
                  <p>Produto: {{ faq.produto }}</p>
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

        <!-- FAQs por Produto -->
        <div class="space-y-4">
          <div v-for="(faqs, produto) in faqsPorProduto" :key="produto" class="mb-8">
            <h2 class="text-xl font-bold text-[#00FF88] font-['Orbitron'] mb-4">{{ produto }}</h2>
            <div class="space-y-2">
              <div 
                v-for="faq in faqs" 
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
    </div>

    <!-- Modal de Nova Pergunta -->
    <div v-if="showNewQuestionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-lg">
        <h2 class="text-xl font-bold text-[#00FF88] font-['Orbitron'] mb-4">Nova Pergunta</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-white mb-2">Produto</label>
            <select 
              v-model="novaPergunta.produto"
              class="w-full px-4 py-2 bg-[#0a0a0a] text-white rounded-lg border border-[#00FF88]/20 focus:border-[#00FF88] focus:outline-none"
            >
              <option value="Smartphone XYZ">Smartphone XYZ</option>
              <option value="Notebook Pro">Notebook Pro</option>
              <option value="Smart TV 4K">Smart TV 4K</option>
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
        produto: '',
        question: '',
        autor: ''
      },
      perguntasSemResposta: [
        {
          id: 10,
          question: 'O smartphone tem suporte a 5G?',
          autor: 'Carlos Eduardo',
          produto: 'Smartphone XYZ',
          novaResposta: '',
          respostaError: null,
          data: new Date('2024-03-15')
        },
        {
          id: 11,
          question: 'A TV tem suporte a Dolby Vision?',
          autor: 'Mariana Silva',
          produto: 'Smart TV 4K',
          novaResposta: '',
          respostaError: null,
          data: new Date('2024-03-14')
        }
      ],
      faqsPorProduto: {
        'Smartphone XYZ': [
          {
            id: 1,
            question: 'Qual a garantia deste smartphone?',
            answer: 'Este produto possui garantia de 12 meses contra defeitos de fabricação.',
            autor: 'João Silva',
            produto: 'Smartphone XYZ'
          },
          {
            id: 2,
            question: 'O smartphone vem com carregador?',
            answer: 'Sim, o produto inclui carregador rápido de 25W na caixa.',
            autor: 'Maria Santos',
            produto: 'Smartphone XYZ'
          },
          {
            id: 3,
            question: 'Qual o tempo de bateria?',
            answer: 'A bateria de 5000mAh oferece até 2 dias de uso moderado.',
            autor: 'Pedro Oliveira',
            produto: 'Smartphone XYZ'
          }
        ],
        'Notebook Pro': [
          {
            id: 4,
            question: 'Qual o sistema operacional?',
            answer: 'O notebook vem com Windows 11 Pro pré-instalado.',
            autor: 'Ana Costa',
            produto: 'Notebook Pro'
          },
          {
            id: 5,
            question: 'Possui entrada HDMI?',
            answer: 'Sim, possui 2 portas HDMI 2.0 para conexão com monitores externos.',
            autor: 'Carlos Mendes',
            produto: 'Notebook Pro'
          },
          {
            id: 6,
            question: 'Qual o peso do notebook?',
            answer: 'O notebook pesa aproximadamente 1.8kg, sendo leve e portátil.',
            autor: 'Juliana Lima',
            produto: 'Notebook Pro'
          }
        ],
        'Smart TV 4K': [
          {
            id: 7,
            question: 'Possui Netflix?',
            answer: 'Sim, a TV vem com Netflix e outros aplicativos de streaming pré-instalados.',
            autor: 'Roberto Alves',
            produto: 'Smart TV 4K'
          },
          {
            id: 8,
            question: 'Quantas entradas HDMI?',
            answer: 'A TV possui 4 entradas HDMI 2.1 para conexão de diversos dispositivos.',
            autor: 'Fernanda Souza',
            produto: 'Smart TV 4K'
          },
          {
            id: 9,
            question: 'Qual o consumo de energia?',
            answer: 'A TV possui certificação de baixo consumo de energia, classe A+.',
            autor: 'Lucas Martins',
            produto: 'Smart TV 4K'
          }
        ]
      }
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
      if (!this.novaPergunta.produto || !this.novaPergunta.question || !this.novaPergunta.autor) {
        alert('Por favor, preencha todos os campos')
        return
      }

      const novaPergunta = {
        id: Date.now(), // ID único baseado no timestamp
        question: this.novaPergunta.question,
        autor: this.novaPergunta.autor,
        produto: this.novaPergunta.produto,
        novaResposta: '',
        respostaError: null,
        data: new Date()
      }

      this.perguntasSemResposta.push(novaPergunta)
      this.showNewQuestionModal = false
      this.novaPergunta = { produto: '', question: '', autor: '' }
    },
    responderPergunta(faq) {
      if (!faq.novaResposta) {
        faq.respostaError = 'Por favor, digite uma resposta'
        return
      }

      // Encontra o produto correto no faqsPorProduto
      if (!this.faqsPorProduto[faq.produto]) {
        this.faqsPorProduto[faq.produto] = []
      }

      // Adiciona a pergunta respondida ao faqsPorProduto
      this.faqsPorProduto[faq.produto].push({
        id: faq.id,
        question: faq.question,
        answer: faq.novaResposta,
        autor: faq.autor,
        produto: faq.produto
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