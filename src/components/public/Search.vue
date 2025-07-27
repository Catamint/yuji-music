<template>
    <n-scrollbar>
        <n-input-group>
            <n-input v-model:value="kw" placeholder="搜索音乐、歌手、专辑" @keyup.enter="search_music" />
            <n-button @click="search_music">搜索</n-button>
        </n-input-group>
        <!-- <CardContainer class='auto-guess'
            :music_info_list="music_info_list"
            :head="head + ' : ' + kw"
            layout="compact"
        /> -->
    </n-scrollbar>
</template>

<script>
import { NScrollbar, NInput, NButton, NInputGroup } from 'naive-ui';
import CardContainer from '@/components/public/CardContainer.vue';
import songService from '@/services/songService.js';
import SearchPage from '@/views/SearchPage.vue';

export default {
    name: 'Search',
    components: {
        NScrollbar,
        NInput,
        NButton,
        NInputGroup,
        CardContainer,
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
