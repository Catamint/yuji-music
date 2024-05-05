<template>
    <div style="display: flex; ">
        <h2>{{ head }}</h2>
        <template >
        <n-icon> <ChevronRight16Filled /> </n-icon>
        </template>
    </div>
    <List v-for="item in music_info_list" :music_info="item" />
</template>

<script>
import { NCard, NEllipsis, NIcon } from 'naive-ui';
import { ChevronRight16Filled, Heart28Regular, TextBulletListAdd24Filled } from '@vicons/fluent/lib';
import List from './List.vue';

export default {
    name: 'ListPage',
    methods: {
        search_music(page){
            this.$axios.get(this.qurl, { 
                params: {
                    kw: this.kw,
                    page: page
                }
            }).then(res => {
                var data =res.data
                // console.log(data);
                this.music_info_list = this.music_info_list.concat(data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted() {
        this.search_music(this.currentPage)
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
        NIcon
    }
  }

</script>