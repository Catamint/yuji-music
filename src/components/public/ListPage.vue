<template>
    <n-scrollbar>
        <CardContainer
            :music_info_list="music_info_list"
            :head="head"
            layout="list"
        />
    </n-scrollbar>
</template>

<script>
import { NScrollbar } from 'naive-ui';
import CardContainer from './CardContainer.vue';
import api from '@/stores/api.js';
import { formatSongList } from '@/services/songService.js';

export default {
    name: 'ListPage',
    methods: {
        async search_music(kw) {
            try {
                let res = await api.search(kw);
                let songList = await formatSongList(res.result);
                console.log(songList);
                this.music_info_list = songList;
            } catch (error) {
                console.error('搜索失败:', error);
            }
        },
    },
    mounted() {
        this.search_music(this.kw);
    },
    data() {
        return {
            music_info_list: [],
        };
    },
    props: {
        kw: {
            type: String,
            default: '',
        },
        head: {
            type: String,
            default: '搜索结果',
        },
    },
    components: {
        NScrollbar,
        CardContainer,
    },
};
</script>

<style scoped>
/* 如果需要额外的页面样式，可以在这里添加 */
</style>