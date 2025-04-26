<template>
    <n-scrollbar>
        <div style="display: flex; ">
            <h2>{{ head }}</h2>
            <template >
            <n-icon> <ChevronRight16Filled /> </n-icon>
            </template>
        </div>
        <List v-for="item in music_info_list" :music_info="item" />
    </n-scrollbar>
</template>

<script>
import { NCard, NEllipsis, NIcon, NScrollbar } from 'naive-ui';
import { ChevronRight16Filled, Heart28Regular, TextBulletListAdd24Filled } from '@vicons/fluent/lib';
import List from './List.vue';
import api from '@/stores/api.js';
import { formatSongList } from '@/services/songService.js';

export default {
    name: 'ListPage',
    methods: {
        async search_music(kw){
            let res = await api.search(kw);
            // console.log(res);
            let songList = formatSongList(res.result);
            console.log(songList);
            this.music_info_list = songList;
        }
    },
    mounted() {
        this.search_music(this.kw)
        console.log(this.music_info_list)
        // this.music_info_list = this.music_info_list.concat(api.search(this.kw));
    },
    // updated() {
    //     this.search_music(this.currentPage)
    // },
    data() {
        return{
            currentPage: 1,
            music_info_list: []
        }
    },
    props:{
        kw:{
            type: String,
            default: ""
        },
        page:{
            type: String,
            default: 1
        },
        qurl:{
            type: String,
            default: ""
        },
        head: {
            type: String,
            default: "搜索结果"
        }
    },
    components:{
        NCard,
        Heart28Regular,
        TextBulletListAdd24Filled,
        NEllipsis,
        List,
        ChevronRight16Filled,
        NIcon,
        NScrollbar
    },
  }

</script>