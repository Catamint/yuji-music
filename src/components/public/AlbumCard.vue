<template>
    <BaseAlbumItem
        v-for="info in music_info_list"
        :key="info.id"
        :albumInfo="info"
        :layout="layout"
        @play="onPlay"
        @click="onClick"
    />
</template>

<script>
import { NButton, NIcon } from 'naive-ui';
import { Play24Regular } from '@vicons/fluent';
// import { usePlayerStore } from '@/stores/playerStore.js';
import BaseAlbumItem from './BaseAlbumItem.vue';

export default {
    name: 'AlbumCard',
    props: {
        music_info_list: {
            type: Array,
            default: () => [],
        },
        head: {
            type: String,
            default: 'Top 100',
        },
        layout: {
            type: String,
            default: 'card', // 支持 'card', 'list', 'compact'
        },
    },
    components: {
        NButton,
        NIcon,
        Play24Regular,
    },
    methods: {
        // 播放歌曲
        async onPlay(details) {
            try {
                // const playerStore = usePlayerStore();
                // await playerStore.playSong(details);
                console.log('Playing song:', details);
                // 这里可以调用播放函数
            } catch (error) {
                console.error('Error playing song:', error.message);
            }
        },

        // 点击事件
        onClick(musicInfo) {
            console.log('Clicked:', musicInfo);
        },
    },
    computed: {
        layoutClass() {
            return `layout-${this.layout}`;
        },
    },
};
</script>

