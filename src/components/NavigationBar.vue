<template>
    <nav class="bg-[#1a1a1a] border-b border-[#00FF88]/20">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <router-link to="/" class="text-2xl font-bold text-[#00FF88] font-['Orbitron']">FAQ</router-link>
                </div>
                
                <div class="flex space-x-4">
                    <router-link 
                        to="/"
                        class="px-4 py-2 text-[#aaaaaa] hover:text-[#00FF88] transition-all duration-300 ease-in-out relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#00FF88] after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full font-['Orbitron']"
                        :class="{ 'text-[#00FF88]': $route.path === '/' }"
                    >
                        Produtos
                    </router-link>
                    <router-link 
                        to="/faq"
                        class="px-4 py-2 text-[#aaaaaa] hover:text-[#00FF88] transition-all duration-300 ease-in-out relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#00FF88] after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full font-['Orbitron']"
                        :class="{ 'text-[#00FF88]': $route.path === '/faq' }"
                    >
                        FAQ
                    </router-link>
                    <button 
                        @click="logout"
                        class=" px-4 py-2 text-[#aaaaaa] hover:text-[#00FF88] transition-all duration-300 ease-in-out relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#00FF88] after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full font-['Orbitron']"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavigationBar',
    methods: {
        logout() {
            this.$router.push('/login')
        }
    }
}
</script>