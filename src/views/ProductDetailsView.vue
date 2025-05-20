<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden">
      <!-- Cabeçalho com botão voltar -->
      <div class="p-4 border-b border-[#00FF88]/20">
        <button 
          @click="$router.push('/')"
          class="text-[#00FF88] hover:text-[#00cc6a] transition-colors font-['Orbitron'] flex items-center"
        >
          <span class="mr-2">←</span> Voltar
        </button>
      </div>

      <!-- Conteúdo do Produto -->
      <div v-if="product" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Coluna da Esquerda - Imagem -->
          <div class="relative">
            <img 
              :src="product.image" 
              :alt="product.nome"
              class="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          <!-- Coluna da Direita - Detalhes -->
          <div class="space-y-6">
            <h1 class="text-3xl font-bold text-[#00FF88] font-['Orbitron']">{{ product.nome }}</h1>
            
            <div class="text-2xl font-bold text-white">
              R$ {{ product.preco.toFixed(2) }}
            </div>

            <div class="space-y-4">
              <h2 class="text-xl font-bold text-[#00FF88] font-['Orbitron']">Características</h2>
              <p class="text-gray-300">{{ product.descricao }}</p>
            </div>

            <!-- FAQ do Produto com Dropdown -->
            <div class="space-y-4">
              <h2 class="text-xl font-bold text-[#00FF88] font-['Orbitron']">Perguntas Frequentes</h2>
              <div class="space-y-2">
                <div 
                  v-for="faq in productFaqs" 
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
                      <p>Produto: {{ faq.produto }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="p-6 text-center text-white">
        Carregando...
      </div>
    </div>
  </div>
</template>

<script>
import phone from '@/assets/images/phone.jpg'
import notebook from '@/assets/images/notebook.webp'
import tv from '@/assets/images/TV.webp'

export default {
  name: 'ProductDetailsView',
  data() {
    return {
      product: {
        id: '1',
        nome: 'Smartphone XYZ',
        preco: 1999.99,
        descricao: 'Um smartphone incrível com as melhores especificações do mercado. Tela AMOLED de 6.5 polegadas, processador octa-core, 8GB de RAM e 128GB de armazenamento.',
        image: phone
      },
      productFaqs: [
        {
          id: 1,
          question: 'Qual a garantia deste smartphone?',
          answer: 'Este produto possui garantia de 12 meses contra defeitos de fabricação. A garantia cobre problemas de hardware e software que não sejam causados por uso inadequado.',
          autor: 'João Silva',
          produto: 'Smartphone XYZ'
        },
        {
          id: 2,
          question: 'O smartphone vem com carregador?',
          answer: 'Sim, o produto inclui carregador rápido de 25W na caixa, além de cabo USB-C, capa protetora e película de vidro temperado.',
          autor: 'Maria Santos',
          produto: 'Smartphone XYZ'
        },
        {
          id: 3,
          question: 'Qual o tempo de bateria?',
          answer: 'A bateria de 5000mAh oferece até 2 dias de uso moderado. Com uso intenso, dura aproximadamente 8 horas de tela ligada. O carregamento rápido de 25W recarrega 50% da bateria em apenas 30 minutos.',
          autor: 'Pedro Oliveira',
          produto: 'Smartphone XYZ'
        }
      ],
      openFaqs: [] // Array para controlar quais FAQs estão abertos
    }
  },
  created() {
    this.loadProductData(this.$route.params.id)
  },
  watch: {
    '$route.params.id': {
      handler(newId) {
        this.loadProductData(newId)
      }
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
    loadProductData(id) {
      // Dados de exemplo para diferentes produtos
      const products = {
        '1': {
          id: '1',
          nome: 'Smartphone XYZ',
          preco: 1999.99,
          descricao: 'Um smartphone incrível com as melhores especificações do mercado. Tela AMOLED de 6.5 polegadas, processador octa-core, 8GB de RAM e 128GB de armazenamento.',
          image: phone
        },
        '2': {
          id: '2',
          nome: 'Notebook Pro',
          preco: 4999.99,
          descricao: 'Notebook potente com processador de última geração, 16GB de RAM, SSD de 512GB e placa de vídeo dedicada. Ideal para trabalho e jogos.',
          image: notebook
        },
        '3': {
          id: '3',
          nome: 'Smart TV 4K',
          preco: 3499.99,
          descricao: 'Smart TV com resolução 4K, HDR, sistema operacional Android TV e assistente de voz integrado. Tela de 55 polegadas com tecnologia LED.',
          image: tv
        }
      }

      // Seleciona o produto baseado no ID ou usa o primeiro como padrão
      this.product = products[id] || products['1']

      // FAQs específicos para cada produto
      const faqs = {
        '1': [
          {
            id: 1,
            question: 'Qual a garantia deste smartphone?',
            answer: 'Este produto possui garantia de 12 meses contra defeitos de fabricação. A garantia cobre problemas de hardware e software que não sejam causados por uso inadequado.',
            autor: 'João Silva',
            produto: 'Smartphone XYZ'
          },
          {
            id: 2,
            question: 'O smartphone vem com carregador?',
            answer: 'Sim, o produto inclui carregador rápido de 25W na caixa, além de cabo USB-C, capa protetora e película de vidro temperado.',
            autor: 'Maria Santos',
            produto: 'Smartphone XYZ'
          },
          {
            id: 3,
            question: 'Qual o tempo de bateria?',
            answer: 'A bateria de 5000mAh oferece até 2 dias de uso moderado. Com uso intenso, dura aproximadamente 8 horas de tela ligada. O carregamento rápido de 25W recarrega 50% da bateria em apenas 30 minutos.',
            autor: 'Pedro Oliveira',
            produto: 'Smartphone XYZ'
          }
        ],
        '2': [
          {
            id: 4,
            question: 'Qual o sistema operacional?',
            answer: 'O notebook vem com Windows 11 Pro pré-instalado, incluindo todas as atualizações mais recentes. O sistema está otimizado para melhor desempenho e segurança.',
            autor: 'Ana Costa',
            produto: 'Notebook Pro'
          },
          {
            id: 5,
            question: 'Possui entrada HDMI?',
            answer: 'Sim, possui 2 portas HDMI 2.0 para conexão com monitores externos, além de 1 porta USB-C com suporte a Thunderbolt 4, 3 portas USB 3.2 e 1 porta Ethernet.',
            autor: 'Carlos Mendes',
            produto: 'Notebook Pro'
          },
          {
            id: 6,
            question: 'Qual o peso do notebook?',
            answer: 'O notebook pesa aproximadamente 1.8kg, sendo leve e portátil. Suas dimensões são 35.6 x 24.3 x 1.8 cm, tornando-o ideal para transporte diário.',
            autor: 'Juliana Lima',
            produto: 'Notebook Pro'
          }
        ],
        '3': [
          {
            id: 7,
            question: 'Possui Netflix?',
            answer: 'Sim, a TV vem com Netflix e outros aplicativos de streaming pré-instalados, incluindo Amazon Prime Video, Disney+, HBO Max e YouTube. Todos os aplicativos são atualizados automaticamente.',
            autor: 'Roberto Alves',
            produto: 'Smart TV 4K'
          },
          {
            id: 8,
            question: 'Quantas entradas HDMI?',
            answer: 'A TV possui 4 entradas HDMI 2.1 para conexão de diversos dispositivos, suportando resolução 4K a 120Hz, HDR e VRR. Também possui 2 portas USB 2.0 para conexão de dispositivos externos.',
            autor: 'Fernanda Souza',
            produto: 'Smart TV 4K'
          },
          {
            id: 9,
            question: 'Qual o consumo de energia?',
            answer: 'A TV possui certificação de baixo consumo de energia, classe A+. Em modo de uso normal, consome aproximadamente 120W. Possui modo de economia de energia que reduz o consumo em até 30%.',
            autor: 'Lucas Martins',
            produto: 'Smart TV 4K'
          }
        ]
      }

      // Seleciona os FAQs baseado no ID ou usa os do primeiro produto como padrão
      this.productFaqs = faqs[id] || faqs['1']
      // Limpa os FAQs abertos ao trocar de produto
      this.openFaqs = []
    }
  }
}
</script> 