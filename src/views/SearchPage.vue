<template>
    <n-scrollbar>
        <CardContainer class='detail'
            :music_info_list="music_info_list"
            :head="head + ' : ' + kw"
            layout="compact"
        />
    </n-scrollbar>
</template>

<script>
import { NScrollbar } from 'naive-ui';
import CardContainer from '@/components/public/CardContainer.vue';
import api from '@/stores/api.js';
import songService from '@/services/songService.js';

export default {
    name: 'SearchPage',
    methods: {
        async search_music(kw) {
            try {
                let songList = await songService.searchNetease(kw);
                console.log(songList);
                this.music_info_list = songList;
            } catch (error) {
                console.error('搜索失败:', error);
            }
        },
    },
    mounted() {
        // this.search_music(this.kw);
        // this.reloadPage();
    },
    async created() {
        // 如果有kw参数，则进行搜索
        if (this.kw) {
            await this.search_music(this.kw);
        }
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
.detail {
    /* padding: 20px; */
    /* background-color: #f0f0f060; */
    border-radius: 10px;
    box-sizing: border-box;
}
</style>