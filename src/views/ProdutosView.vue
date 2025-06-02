<template>
  <div class="container">
    <div class="bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden">
      <!-- Cabeçalho -->
      <header>
        <div class="flex items-center justify-between">
          <div>
            <h1 class="title-primary">Produtos Cadastrados</h1>
            <p class="text-gray-400 mt-2 font-['Lora'] text-lg">Lista de produtos disponíveis</p>
          </div>
          <BaseButton @click="showAddModal = true">
            Adicionar Produto
          </BaseButton>
        </div>
      </header>

      <!-- Lista de Produtos -->
      <div class="p-8">
        <div v-if="produtos.length === 0" class="text-center py-12">
          <p class="text-gray-400 text-xl font-['Lora']">Nenhum produto cadastrado</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="produto in produtos" :key="produto.id"
            class="bg-[#0a0a0a] rounded-lg overflow-hidden border-2 border-[#00FF88]/20 hover:border-[#00FF88]/40 transition-all duration-300">
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl text-white font-['Playfair_Display']">{{ produto.name }}</h3>
                <span :class="[
                  'px-2 py-1 rounded text-sm font-[\'Lora\']',
                  produto.available
                    ? 'bg-[#00FF88]/20 text-[#00FF88]'
                    : 'bg-red-500/20 text-red-500'
                ]">
                  {{ produto.available ? 'Disponível' : 'sem estoque' }}
                </span>
              </div>

              <p class="text-gray-400 font-['Lora'] mb-4 min-h-[3rem]">
                {{ produto.description }}
              </p>

              <div class="flex justify-between items-center">
                <p class="text-[#00FF88] text-xl font-['Lora']">
                  {{ produto.price }}
                </p>
                <div class="flex space-x-2">
                  <BaseButton variant="secondary" @click="editarProduto(produto)">
                    Editar
                  </BaseButton>
                  <BaseButton variant="secondary" @click="excluirProduto(produto.id)"
                    class="!bg-red-500/10 !text-red-500 hover:!bg-red-500/20">
                    Excluir
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Adicionar/Editar Produto -->
    <div v-if="showAddModal || editingProduto"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-[#1a1a1a] rounded-lg p-8 w-full max-w-2xl relative">
        <h2 class="text-3xl font-semibold text-[#00FF88] font-['Playfair_Display'] tracking-wide mb-8">
          {{ editingProduto ? 'Editar Produto' : 'Novo Produto' }}
        </h2>

        <form @submit.prevent="salvarProduto" class="space-y-6">
          <BaseInput v-model="formData.name" label="Nome do Produto" placeholder="Digite o nome do produto" />

          <BaseInput v-model="formData.description" label="Descrição" placeholder="Digite a descrição do produto"
            tag="textarea" rows="3" />

          <BaseInput v-model="formData.price" label="Preço" placeholder="R$ 0,00" />

          <div class="flex items-center space-x-2">
            <input type="checkbox" v-model="formData.available"
              class="w-4 h-4 rounded border-[#00FF88]/20 bg-[#0a0a0a] checked:bg-[#00FF88]">
            <label class="text-white text-lg font-['Lora']">Disponível</label>
          </div>

          <div class="flex justify-end space-x-4 mt-8">
            <BaseButton type="button" variant="secondary" @click="fecharModal">
              Cancelar
            </BaseButton>
            <BaseButton type="submit">
              {{ editingProduto ? 'Salvar Alterações' : 'Adicionar Produto' }}
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { productService } from '@/services/api'

export default {
  name: 'ProdutosView',
  components: {
    BaseButton,
    BaseInput
  },
  setup() {
    const produtos = ref([])
    const showAddModal = ref(false)
    const editingProduto = ref(null)
    const formData = ref({
      name: '',
      description: '',
      price: '',
      available: true
    })

    const carregarProdutos = async () => {
      try {
        const response = await productService.getAllProducts()
        produtos.value = response.data.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          available: p.available
        }))
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
        alert('Erro ao carregar produtos. Tente novamente.')
      }
    }

    const editarProduto = (produto) => {
      editingProduto.value = produto
      formData.value = { ...produto }
      showAddModal.value = true
    }

    const excluirProduto = async (id) => {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
          await productService.deleteProduct(id)
          produtos.value = produtos.value.filter(p => p.id !== id)
        } catch (error) {
          console.error('Erro ao excluir produto:', error)
          alert('Erro ao excluir produto. Tente novamente.')
        }
      }
    }

    const fecharModal = () => {
      showAddModal.value = false
      editingProduto.value = null
      formData.value = {
        name: '',
        description: '',
        price: '',
        available: true
      }
    }

    const salvarProduto = async () => {
      try {
        if (editingProduto.value) {
          // Editando produto existente
          const response = await productService.updateProduct(editingProduto.value.id, formData.value)
          const index = produtos.value.findIndex(p => p.id === editingProduto.value.id)
          if (index !== -1) {
            produtos.value[index] = response.data
          }
        } else {
          // Adicionando novo produto
          const response = await productService.createProduct(formData.value)
          produtos.value.push(response.data)
        }
        fecharModal()
      } catch (error) {
        console.error('Erro ao salvar produto:', error)
        alert('Erro ao salvar produto. Tente novamente.')
      }
    }

    onMounted(() => {
      carregarProdutos()
    })

    return {
      produtos,
      showAddModal,
      editingProduto,
      formData,
      editarProduto,
      excluirProduto,
      fecharModal,
      salvarProduto
    }
  }
}
</script>

<style scoped>
.title-primary {
  @apply text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#00cc6a] font-['Playfair_Display'] tracking-wide;
}

/* Container principal */
.container {
  @apply max-w-7xl mx-auto px-4 py-12;
}

/* Card principal */
.bg-[#1a1a1a] {
  @apply shadow-xl shadow-[#00FF88]/5 backdrop-blur-sm;
}

/* Cabeçalho */
header {
  @apply p-8 border-b border-[#00FF88]/20 bg-gradient-to-r from-[#1a1a1a] to-[#1a1a1a]/95;
}
</style>