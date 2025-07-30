<template>
    <n-input-group>
        <n-input v-model:value="kw" placeholder="搜索音乐、歌手、专辑" @keyup.enter="search_music" />
        <n-button @click="search_music">搜索</n-button>
    </n-input-group>
<!--     
    <Combobox by="label">
        <ComboboxAnchor>
            <div class="relative w-full max-w-sm items-center">
                <ComboboxInput class="pl-9" 
                    placeholder="搜索音乐、歌手、专辑" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                    <Search class="size-4 text-muted-foreground" />
                </span>
            </div>
        </ComboboxAnchor>

        <ComboboxList>
            <ComboboxEmpty>
                No framework found.
            </ComboboxEmpty>

            <ComboboxGroup>
                <ComboboxItem
                v-for="framework in frameworks"
                :key="framework.value"
                :value="framework"
                >
                {{ framework.label }}

                <ComboboxItemIndicator>
                    <Check :class="cn('ml-auto h-4 w-4')" />
                </ComboboxItemIndicator>
                </ComboboxItem>
            </ComboboxGroup>
        </ComboboxList>
    </Combobox> -->

</template>

<script>
import { NScrollbar, NInput, NButton, NInputGroup } from 'naive-ui';
import CardContainer from '@/components/public/CardContainer.vue';
import songService from '@/services/songService.js';
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList } from '@/components/ui/combobox';

export default {
    name: 'Search',
    components: {
        NScrollbar,
        NInput,
        NButton,
        NInputGroup,
        CardContainer, Combobox, ComboboxAnchor, ComboboxInput, ComboboxList, ComboboxItem,
        ComboboxItemIndicator, ComboboxEmpty, ComboboxGroup
    },
    data() {
        return {
            kw: '',
            music_info_list: [],
            head: '搜索结果',
        };
    },
    methods: {
        async search_music() {
            if (!this.kw) return;
            try {
                // this.music_info_list = await songService.searchNetease(this.kw);
                this.$router.push({
                    name: 'searchpage',
                    params: {
                        kw: this.kw,
                        page: 1,
                        qurl: '/host/get_search_result'
                    }
                });
            } catch (error) {
                console.error('搜索失败:', error);
            }
        },
    },
    mounted() {
        // 如果有kw参数，则进行搜索
        if (this.kw) {
            this.search_music();
        }
    },
};
</script>
