<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import ComboboxAnchor from '../ui/combobox/ComboboxAnchor.vue'

const router = useRouter()

const query = ref('')
const options = [
    { label: '全部', type: 'all' },
    { label: '音乐', type: 'music' },
    { label: '专辑', type: 'album' },
    { label: '艺术家', type: 'artist' },
]

const showOptions = computed(() => query.value.trim() !== '')

function onSelect(option) {
    router.push({
        path: '/search',
        query: {
            kw: query.value,
            type: option.type,
        },
    })
}

function onEnter() {
    if (!query.value.trim()) return
    // 默认搜索全部
    router.push({
        path: '/search',
        query: {
            kw: query.value,
            type: 'all',
        },
    })
}
</script>

<template>
    <Combobox :ignoreFilter="true">
        <ComboboxAnchor class=" w-full">        
        <div class="relative w-full items-center border rounded-md file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
    focus-within:outline-2 focus-within:outline-primary">
            <ComboboxInput v-model="query" @keydown.enter.prevent="onEnter" placeholder="搜索音乐 / 专辑 / 创作者" />
            </div>
        </ComboboxAnchor>
        <ComboboxList v-show="showOptions">
            <!-- <ComboboxEmpty>
                No framework found.
            </ComboboxEmpty> -->

            <ComboboxGroup>
                <ComboboxItem v-for="option in options" :key="option.type" :value="option.label"
                    @click="onSelect(option)">
                    {{ option.label }}：“{{ query }}”
                </ComboboxItem>
            </ComboboxGroup>
        </ComboboxList>
    </Combobox>
</template>
