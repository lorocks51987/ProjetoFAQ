<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden">
      <!-- Cabeçalho -->
      <div class="p-4 border-b border-[#00FF88]/20 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-[#00FF88] font-['Orbitron']">Produtos em Destaque</h1>
        <button 
          @click="showNewProductModal = true"
          class="px-4 py-2 bg-[#00FF88] text-[#1a1a1a] rounded-lg hover:bg-[#00cc6a] transition-colors font-['Orbitron']"
        >
          Novo Produto
        </button>
      </div>

      <!-- Lista de Produtos -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="product in products" 
            :key="product.id"
            class="bg-[#0a0a0a] rounded-lg overflow-hidden"
          >
            <div class="relative h-auto">
              <img 
                :src="product.image" 
                :alt="product.nome"
                class="w-full h-full object-contain bg-[#0f0f0f]"
              />
            </div>
            <div class="p-4">
              <h3 class="text-xl font-bold text-[#00FF88] font-['Orbitron'] mb-2">{{ product.nome }}</h3>
              <p class="text-gray-300 text-sm mb-4 line-clamp-2">{{ product.descricao }}</p>
              <div class="text-lg font-bold text-white mb-4">
                R$ {{ product.preco.toFixed(2) }}
              </div>
              <div class="flex space-x-2">
                <router-link 
                  :to="'/produto/' + product.id"
                  class="flex-1 px-4 py-2 bg-[#9A00FF] text-white rounded-lg hover:bg-[#7A00CC] transition-colors font-['Orbitron'] text-center"
                >
                  Ver Detalhes
                </router-link>
                <button 
                  @click="editarProduto(product)"
                  class="flex-1 px-4 py-2 bg-[#00FF88] text-[#1a1a1a] rounded-lg hover:bg-[#00cc6a] transition-colors font-['Orbitron']"
                >
                  Editar
                </button>
                <button 
                  @click="confirmarExclusao(product)"
                  class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-['Orbitron']"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Produto (Novo/Editar) -->
    <div v-if="showNewProductModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-lg">
        <h2 class="text-xl font-bold text-[#00FF88] font-['Orbitron'] mb-4">
          {{ produtoEditando ? 'Editar Produto' : 'Novo Produto' }}
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-white mb-2">Nome do Produto</label>
            <input 
              v-model="produtoForm.nome"
              type="text"
              class="w-full px-4 py-2 bg-[#0a0a0a] text-white rounded-lg border border-[#00FF88]/20 focus:border-[#00FF88] focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-white mb-2">Preço</label>
            <input 
              v-model="produtoForm.preco"
              type="number"
              step="0.01"
              class="w-full px-4 py-2 bg-[#0a0a0a] text-white rounded-lg border border-[#00FF88]/20 focus:border-[#00FF88] focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-white mb-2">Descrição</label>
            <textarea 
              v-model="produtoForm.descricao"
              rows="3"
              class="w-full px-4 py-2 bg-[#0a0a0a] text-white rounded-lg border border-[#00FF88]/20 focus:border-[#00FF88] focus:outline-none"
            ></textarea>
          </div>
          <div>
            <label class="block text-white mb-2">Imagem</label>
            <input 
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              class="w-full px-4 py-2 bg-[#0a0a0a] text-white rounded-lg border border-[#00FF88]/20 focus:border-[#00FF88] focus:outline-none"
            />
          </div>
          <div class="flex justify-end space-x-4">
            <button 
              @click="showNewProductModal = false"
              class="px-4 py-2 text-[#00FF88] hover:text-[#00cc6a] transition-colors font-['Orbitron']"
            >
              Cancelar
            </button>
            <button 
              @click="salvarProduto"
              class="px-4 py-2 bg-[#00FF88] text-[#1a1a1a] rounded-lg hover:bg-[#00cc6a] transition-colors font-['Orbitron']"
            >
              {{ produtoEditando ? 'Salvar Alterações' : 'Criar Produto' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold text-[#00FF88] font-['Orbitron'] mb-4">Confirmar Exclusão</h2>
        <p class="text-white mb-6">
          Tem certeza que deseja excluir o produto "{{ produtoParaExcluir?.nome }}"?
        </p>
        <div class="flex justify-end space-x-4">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 text-[#00FF88] hover:text-[#00cc6a] transition-colors font-['Orbitron']"
          >
            Cancelar
          </button>
          <button 
            @click="excluirProduto"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-['Orbitron']"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import phone from '@/assets/images/phone.jpg'
import notebook from '@/assets/images/notebook.webp'
import tv from '@/assets/images/TV.webp'

export default {
  name: 'HomeView',
  data() {
    return {
      showNewProductModal: false,
      showDeleteModal: false,
      produtoEditando: null,
      produtoParaExcluir: null,
      produtoForm: {
        nome: '',
        preco: '',
        descricao: '',
        image: null
      },
      products: [
        {
          id: 1,
          nome: 'Smartphone XYZ',
          preco: 1999.99,
          descricao: 'Um smartphone incrível com as melhores especificações do mercado. Tela AMOLED de 6.5 polegadas, processador octa-core, 8GB de RAM e 128GB de armazenamento.',
          image: phone
        },
        {
          id: 2,
          nome: 'Notebook Pro',
          preco: 4999.99,
          descricao: 'Notebook potente para trabalho e jogos. Processador Intel Core i7, 16GB de RAM, SSD de 512GB e placa de vídeo dedicada.',
          image: notebook
        },
        {
          id: 3,
          nome: 'Smart TV 4K',
          preco: 2999.99,
          descricao: 'Smart TV 4K com 55 polegadas, HDR, sistema operacional Android TV e controle por voz.',
          image: tv
        }
      ]
    }
  },
  methods: {
    editarProduto(produto) {
      this.produtoEditando = produto
      this.produtoForm = {
        nome: produto.nome,
        preco: produto.preco,
        descricao: produto.descricao,
        image: produto.image
      }
      this.showNewProductModal = true
    },
    confirmarExclusao(produto) {
      this.produtoParaExcluir = produto
      this.showDeleteModal = true
    },
    excluirProduto() {
      const index = this.products.findIndex(p => p.id === this.produtoParaExcluir.id)
      if (index !== -1) {
        this.products.splice(index, 1)
      }
      this.showDeleteModal = false
      this.produtoParaExcluir = null
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.produtoForm.image = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    salvarProduto() {
      if (!this.produtoForm.nome || !this.produtoForm.preco || !this.produtoForm.descricao) {
        alert('Por favor, preencha todos os campos')
        return
      }

      if (this.produtoEditando) {
        // Editar produto existente
        const index = this.products.findIndex(p => p.id === this.produtoEditando.id)
        if (index !== -1) {
          this.products[index] = {
            ...this.produtoEditando,
            ...this.produtoForm,
            preco: parseFloat(this.produtoForm.preco)
          }
        }
      } else {
        // Criar novo produto
        const novoProduto = {
          id: Date.now(),
          nome: this.produtoForm.nome,
          preco: parseFloat(this.produtoForm.preco),
          descricao: this.produtoForm.descricao,
          image: this.produtoForm.image || phone // Imagem padrão se nenhuma for selecionada
        }
        this.products.push(novoProduto)
      }

      this.showNewProductModal = false
      this.produtoEditando = null
      this.produtoForm = {
        nome: '',
        preco: '',
        descricao: '',
        image: null
      }
    }
  }
}
</script> 