<template>
    <div class="card-container">
        <n-button v-if="head" text style="display: flex;" @click="onHeaderClick">
            <h1 @click="onHeaderClick" >{{ head }}</h1>
            <template #icon>
                <n-icon> <ChevronRight16Filled /> </n-icon>
            </template>
        </n-button>

        <div class="cards-block">
            <!-- 使用基础组件直接渲染 -->
            <BaseAlbumItem class="card-item"
                v-for="info in music_info_list"
                :key="info.id"
                :albumInfo="info"
                :layout="layout"
                @play="onPlay"
                @click="onClick"
            />
        </div>
    </div>
</template>

<script>
import { ChevronRight16Filled } from '@vicons/fluent/lib';
import { NButton, NIcon } from 'naive-ui';
import { Play24Regular } from '@vicons/fluent';
// import { usePlayerStore } from '@/stores/playerStore.js';
import BaseAlbumItem from './BaseAlbumItem.vue';
import songService from '@/services/songService.js';
import player2 from '@/stores/player2.js';

export default {
    name: 'SonglistCardContainer',
    props: {
        music_info_list: {
            type: Array,
            default: () => [],
        },
        head: {
            type: String,
            default: '',
        },
        layout: {
            type: String,
            default: 'card', // 支持 'card', 'list', 'compact'
        },
    },
    data() {
        return {
            songlistContent: {},
            player: player2,
        };
    },
    components: {
        NButton,
        NIcon,
        ChevronRight16Filled
    },
    methods: {
        // 播放歌曲
        async onPlay(details) {
            try {
                this.songlistContent = await songService.getSonglistContent(details.id);
                this.player.playMulti(this.songlistContent.songs);
                console.log('Playing song:', details);
                // 这里可以调用播放函数
            } catch (error) {
                console.error('Error playing song:', error.message);
            }
        },

        // 点击事件
        onClick(albumInfo) {
            if (albumInfo && albumInfo.id) {
            this.$router.push({ path: `/songlist/${albumInfo.id}` });
            console.log('Clicked:', albumInfo);
            } else {
            console.warn('albumInfo or albumInfo.id is undefined:', albumInfo);
            }
        },
        onHeaderClick() {
            this.$emit('header-click');
            console.log('Header clicked');
        },
    },
    computed: {
        layoutClass() {
            return `layout-${this.layout}`;
        },
    },
};
</script>


<style scoped>
.card-container {
    width: 100%;
    margin-bottom: 20px;
}

.cards-block {
    display: flex;
    flex-wrap: wrap;
    /* gap: 40px; */
    border-radius: 10px;
    width: 100%;
    max-width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
}

h2 {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    display: inline-block;
}
</style>
