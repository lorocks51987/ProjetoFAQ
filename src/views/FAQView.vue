<template>
  <div class="container">
    <div class="bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden">
      <!-- Cabeçalho -->
      <header>
        <div class="flex items-center space-x-4">
          <h1 class="title-primary">Perguntas Frequentes</h1>
          <span v-if="perguntasSemResposta.length > 0" class="badge">
            {{ perguntasSemResposta.length }} pendente{{ perguntasSemResposta.length > 1 ? 's' : '' }}
          </span>
        </div>
        <p class="text-gray-400 mt-2 font-['Lora'] text-lg">Encontre respostas para suas dúvidas mais comuns</p>
        <div class="mt-6">
          <BaseButton @click="showNewQuestionModal = true">
            Nova Pergunta
          </BaseButton>
        </div>
      </header>

      <!-- Lista de FAQs -->
      <div class="p-8 space-y-12">
        <!-- Perguntas sem Resposta -->
        <section v-if="perguntasSemResposta.length > 0">
          <h2 class="title-secondary">Perguntas Aguardando Resposta</h2>
          <div class="space-y-6">
            <FaqCard
              v-for="faq in perguntasSemRespostaOrdenadas"
              :key="faq.id"
              :question="faq.question"
              :is-open="openPendingFaqs.includes(faq.id)"
              @toggle="togglePendingFaq(faq.id)"
            >
              <div class="text-lg text-[#00FF88]/90 mb-6 flex items-center space-x-2">
                <span class="font-['Lora']">Autor:</span>
                <span class="font-['Playfair_Display']">{{ faq.autor }}</span>
                <span class="text-sm text-gray-400 ml-4">{{ new Date(faq.data).toLocaleDateString() }}</span>
              </div>
              <div class="flex space-x-4">
                <div class="flex-1">
                  <BaseInput
                    v-model="faq.novaResposta"
                    placeholder="Digite sua resposta..."
                    :error="faq.respostaError"
                    @update:modelValue="faq.respostaError = ''"
                  />
                </div>
                <BaseButton
                  @click="responderPergunta(faq)"
                  :disabled="!faq.novaResposta"
                >
                  Responder
                </BaseButton>
              </div>
            </FaqCard>
          </div>
        </section>

        <!-- FAQs Gerais -->
        <section>
          <h2 class="title-secondary">Perguntas Frequentes Gerais</h2>
          <div class="space-y-6">
            <FaqCard
              v-for="faq in faqsGerais"
              :key="faq.id"
              :question="faq.question"
              :is-open="openGeneralFaqs.includes(faq.id)"
              @toggle="toggleGeneralFaq(faq.id)"
            >
              <p class="faq-answer">{{ faq.answer }}</p>
              <div class="text-lg text-[#00FF88]/90 flex items-center space-x-2">
                <span class="font-['Lora']">Autor:</span>
                <span class="font-['Playfair_Display']">{{ faq.autor }}</span>
              </div>
            </FaqCard>
          </div>
        </section>
      </div>
    </div>

    <!-- Modal de Nova Pergunta -->
    <NewQuestionModal
      v-if="showNewQuestionModal"
      :produtos="produtos"
      @close="showNewQuestionModal = false"
      @submit="handleNewQuestion"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import FaqCard from '@/components/faq/FaqCard.vue'
import NewQuestionModal from '@/components/faq/NewQuestionModal.vue'

export default {
  name: 'FAQView',
  components: {
    BaseButton,
    BaseInput,
    FaqCard,
    NewQuestionModal
  },
  data() {
    return {
      openPendingFaqs: [],
      openGeneralFaqs: [],
      showNewQuestionModal: false,
      produtos: [
        { id: '1', nome: 'Smartphone XYZ' },
        { id: '2', nome: 'Notebook Pro' },
        { id: '3', nome: 'Smart TV 4K' }
      ],
      perguntasSemResposta: [
        {
          id: 1,
          question: 'Como posso entrar em contato com o suporte?',
          autor: 'Carlos Eduardo',
          novaResposta: '',
          respostaError: '',
          data: new Date('2024-03-15')
        },
        {
          id: 2,
          question: 'Quais são os métodos de pagamento aceitos?',
          autor: 'Mariana Silva',
          novaResposta: '',
          respostaError: '',
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
    togglePendingFaq(faqId) {
      if (this.openPendingFaqs.includes(faqId)) {
        this.openPendingFaqs = []
        this.openGeneralFaqs = []
      } else {
        this.openPendingFaqs = [faqId]
        this.openGeneralFaqs = []
      }
    },
    toggleGeneralFaq(faqId) {
      if (this.openGeneralFaqs.includes(faqId)) {
        this.openGeneralFaqs = []
        this.openPendingFaqs = []
      } else {
        this.openGeneralFaqs = [faqId]
        this.openPendingFaqs = []
      }
    },
    handleNewQuestion(formData) {
      if (formData.tipo === 'produto') {
        this.$router.push(`/produto/${formData.produtoId}`)
        this.showNewQuestionModal = false
        return
      }

      this.perguntasSemResposta.push({
        id: Date.now(),
        question: formData.question,
        autor: formData.autor,
        novaResposta: '',
        respostaError: '',
        data: new Date(),
        tipo: 'servicos'
      })
      
      this.showNewQuestionModal = false
    },
    responderPergunta(faq) {
      if (!faq.novaResposta) {
        faq.respostaError = 'Por favor, digite uma resposta'
        return
      }

      this.faqsGerais.push({
        id: faq.id,
        question: faq.question,
        answer: faq.novaResposta,
        autor: faq.autor
      })

      this.perguntasSemResposta = this.perguntasSemResposta.filter(p => p.id !== faq.id)
    }
  }
}
</script>

<style scoped>
.title-primary {
  @apply text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#00cc6a] font-['Playfair_Display'] tracking-wide;
}

.title-secondary {
  @apply text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#00cc6a] font-['Playfair_Display'] tracking-wide mb-8;
}

.badge {
  @apply px-4 py-2 bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white rounded-full text-lg font-['Lora'] shadow-lg shadow-red-500/20;
}

.faq-answer {
  @apply text-gray-300 text-lg leading-relaxed mb-6 font-['Lora'];
}

/* Container principal */
.container {
  @apply max-w-5xl mx-auto px-4 py-12;
}

/* Card principal */
.bg-[#1a1a1a] {
  @apply shadow-xl shadow-[#00FF88]/5 backdrop-blur-sm;
}

/* Cabeçalho */
header {
  @apply p-8 border-b border-[#00FF88]/20 bg-gradient-to-r from-[#1a1a1a] to-[#1a1a1a]/95;
}

/* Seções */
section {
  @apply transition-all duration-300 ease-in-out;
}

/* Animação suave para os cards */
.space-y-6 > * {
  @apply transition-all duration-300 ease-in-out;
}
</style> 