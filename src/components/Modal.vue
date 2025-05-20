<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-[#1a1a1a] p-6 rounded-lg shadow-lg border border-[#9A00FF]/20 w-full max-w-2xl mx-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-[#00FF88] font-['Orbitron']">{{ title }}</h2>
                <button @click="$emit('close')" class="text-[#aaaaaa] hover:text-[#00FF88] transition-colors">
                    ✕
                </button>
            </div>
            <div class="mt-4">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }
}
</script> 