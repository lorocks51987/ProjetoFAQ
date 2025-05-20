<template>
  <div class="min-h-screen bg-[#0a0a0a] text-white">
    <NavigationBar :paginaAtual="paginaAtual" @navegar="mudarPagina" />
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'

export default {
  components: { NavigationBar },
  data() {
    return {
      paginaAtual: 'home'
    }
  },
  watch: {
    $route(to) {
      this.paginaAtual = to.name
    }
  },
  methods: {
    mudarPagina(novaPagina) {
      this.$router.push({ name: novaPagina })
    }
  }
}
</script>