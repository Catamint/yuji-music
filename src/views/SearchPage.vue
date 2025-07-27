<template>
    <h1>{{head + ' : ' + kw}}</h1>
    <n-scrollbar>
        <CardContainer v-if="all_info?.song?.songs || music_info_list" class='detail'
            :music_info_list="all_info?.song?.songs || music_info_list"
            head="歌曲"
            layout="compact"
            @header-click="search_music(kw)"
        />
        <AlbumCardContainer v-if="all_info?.album?.albums" class='detail'
            :music_info_list="all_info?.album?.albums"
            head="专辑"
            layout="card"
        />
        <SonglistCardContainer class='detail'
            :music_info_list="all_info?.playList?.playLists"
            head="歌单"
            layout="card"
        />
    </n-scrollbar>
</template>

<script>
import { NScrollbar } from 'naive-ui';
import CardContainer from '@/components/public/CardContainer.vue';
import AlbumCardContainer from '@/components/public/AlbumCardContainer.vue';
import SonglistCardContainer from '@/components/public/SonglistCardContainer.vue';
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
        async search_all(kw) {
            console.log("搜索关键词:", kw);
            this.all_info = await songService.searchNetease(kw, 30, 0, 1018);
            console.log("搜索结果:", this.all_info);
        }
    },
    mounted() {
        // this.search_music(this.kw);
        // this.reloadPage();
    },
    async created() {
        // 如果有kw参数，则进行搜索
        if (this.kw) {
            await this.search_all(this.kw);
        }
    },
    data() {
        return {
            music_info_list: [],
            all_info: {},
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
    watch: {
        kw: {
            immediate: true, // 初始时也触发一次
            handler(newKw) {
                this.search_all(newKw)
            }
        }
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