<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-[#1a1a1a] rounded-lg p-8 w-full max-w-4xl relative">
      <h2 class="text-3xl font-semibold text-[#00FF88] font-['Playfair_Display'] tracking-wide mb-8">
        Nova Pergunta
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Tipo de Pergunta -->
        <div class="space-y-4">
          <label class="block text-white text-xl font-['Lora']">Sobre o que você quer perguntar?</label>
          
          <div class="flex gap-4">
            <!-- Opção Serviços -->
            <div 
              class="flex-1 p-6 rounded-lg border-2 cursor-pointer transition-all duration-300"
              :class="[
                formData.tipo === 'servicos' 
                  ? 'border-[#00FF88] bg-[#00FF88]/10' 
                  : 'border-[#00FF88]/20 hover:border-[#00FF88]/50'
              ]"
              @click="selectTipo('servicos')"
            >
              <div class="flex items-center space-x-4">
                <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  :class="[
                    formData.tipo === 'servicos' 
                      ? 'border-[#00FF88]' 
                      : 'border-[#00FF88]/50'
                  ]"
                >
                  <div 
                    v-if="formData.tipo === 'servicos'"
                    class="w-3 h-3 bg-[#00FF88] rounded-full"
                  ></div>
                </div>
                <div>
                  <h3 class="text-xl text-white font-['Playfair_Display']">Serviços Gerais</h3>
                  <p class="text-gray-400 font-['Lora']">Dúvidas sobre entregas, pagamentos, garantias, etc.</p>
                </div>
              </div>
            </div>

            <!-- Opção Produtos -->
            <div 
              class="flex-1 p-6 rounded-lg border-2 cursor-pointer transition-all duration-300"
              :class="[
                formData.tipo === 'produto' 
                  ? 'border-[#00FF88] bg-[#00FF88]/10' 
                  : 'border-[#00FF88]/20 hover:border-[#00FF88]/50'
              ]"
              @click="selectTipo('produto')"
            >
              <div class="flex items-center space-x-4">
                <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  :class="[
                    formData.tipo === 'produto' 
                      ? 'border-[#00FF88]' 
                      : 'border-[#00FF88]/50'
                  ]"
                >
                  <div 
                    v-if="formData.tipo === 'produto'"
                    class="w-3 h-3 bg-[#00FF88] rounded-full"
                  ></div>
                </div>
                <div>
                  <h3 class="text-xl text-white font-['Playfair_Display']">Produto Específico</h3>
                  <p class="text-gray-400 font-['Lora']">Dúvidas sobre características, especificações, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Seleção de Produto -->
        <div v-if="formData.tipo === 'produto'" class="space-y-3">
          <label class="block text-white text-xl font-['Lora']">Qual produto?</label>
          <select
            v-model="formData.produtoId"
            class="w-full px-6 py-3 bg-[#0a0a0a] text-white rounded-lg 
                   border-2 border-[#00FF88]/20 
                   hover:border-[#00FF88]/40
                   focus:border-[#00FF88] focus:outline-none 
                   text-lg font-['Lora'] 
                   transition-colors duration-300"
          >
            <option value="" disabled>Escolha um produto</option>
            <option v-for="produto in produtos" :key="produto.id" :value="produto.id">
              {{ produto.nome }}
            </option>
          </select>
        </div>

        <!-- Campo da Pergunta -->
        <BaseInput
          v-model="formData.question"
          label="Qual é a sua dúvida?"
          tag="textarea"
          rows="3"
          placeholder="Descreva sua pergunta detalhadamente..."
        />

        <!-- Campo do Nome -->
        <BaseInput
          v-model="formData.autor"
          label="Seu Nome"
          type="text"
          placeholder="Como podemos te chamar?"
        />

        <div class="flex justify-end space-x-4 mt-8">
          <BaseButton
            variant="secondary"
            @click="$emit('close')"
          >
            Cancelar
          </BaseButton>
          <BaseButton
            type="submit"
            :disabled="!isFormValid"
          >
            Enviar Pergunta
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from '../base/BaseButton.vue'
import BaseInput from '../base/BaseInput.vue'

export default {
  name: 'NewQuestionModal',
  components: {
    BaseButton,
    BaseInput
  },
  props: {
    produtos: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {
        tipo: '',
        produtoId: '',
        question: '',
        autor: ''
      }
    }
  },
  computed: {
    isFormValid() {
      const basicValidation = this.formData.tipo && 
                            this.formData.question && 
                            this.formData.autor
      
      if (this.formData.tipo === 'produto') {
        return basicValidation && this.formData.produtoId
      }
      
      return basicValidation
    }
  },
  methods: {
    selectTipo(tipo) {
      this.formData.tipo = tipo
      if (tipo === 'servicos') {
        this.formData.produtoId = ''
      }
    },
    handleSubmit() {
      if (!this.isFormValid) return
      this.$emit('submit', { ...this.formData })
      this.resetForm()
    },
    resetForm() {
      this.formData = {
        tipo: '',
        produtoId: '',
        question: '',
        autor: ''
      }
    }
  },
  emits: ['close', 'submit']
}
</script> 