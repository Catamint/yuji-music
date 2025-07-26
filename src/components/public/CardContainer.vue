<template>
    <div class="card-container">
        <n-button v-if=head text style="display: flex;" @click="onHeaderClick">
            <h1>{{ head }}</h1>
            <template #icon>
                <n-icon> <ChevronRight16Filled /> </n-icon>
            </template>
        </n-button>

        <div class="cards-block">
            <!-- 使用基础组件直接渲染 -->
            <BaseMusicItem class="card-item"
                v-for="info in music_info_list"
                :key="info.id"
                :musicInfo="info"
                :layout="layout"
                @play="onPlay"
                @add-to-favorites="onAddToFavorites"
                @remove-from-favorites="onRemoveFromFavorites"
                @put-in-playlist="put_in_playlist"
                @add-to-play-next="put_in_playlist"
            />
        </div>
    </div>
</template>

<script>
import { ChevronRight16Filled } from '@vicons/fluent/lib';
import { NButton, NIcon } from 'naive-ui';
import BaseMusicItem from './BaseMusicItem.vue';
import player2 from '@/stores/player2.js';

export default {
    name: 'CardContainer',
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
            default: 'list', // 支持 'card', 'list', 'compact'
        },
    },
    methods: {
        // 播放歌曲
        async onPlay(details) {
            try {
                await player2.play(details);
                // console.log('Playing:', details);
            } catch (error) {
                console.error('Error playing song:', error.message);
            }
        },

        // 添加到收藏
        onAddToFavorites(details) {
            console.log('Add to Favorites:', details);
            // 这里可以调用收藏相关的逻辑
        },

        // 从收藏中移除
        onRemoveFromFavorites(details) {
            console.log('Remove from Favorites:', details);
            // 这里可以调用移除收藏相关的逻辑
        },

        // 点击标题的回调
        onHeaderClick() {
            console.log('Header clicked:', this.head);
            // 可以在这里实现跳转或其他逻辑
        },

        async put_in_playlist(details) {
            try {
                await player2.put_in_playlist(details);
                // console.log('Playing:', details);
            } catch (error) {
                console.error('Error add song:', error.message);
            }
        },
    },
    components: {
        BaseMusicItem,
        ChevronRight16Filled,
        NIcon,
        NButton,
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

/* .card-item {
    flex: 1 1 calc(25% - 40px) !important;
    aspect-ratio: 1 / 1 !important;
    max-height: auto !important;
    height: auto !important;
    max-width: calc(25% - 40px) !important;
    box-sizing: border-box !important;
} */

h2 {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    display: inline-block;
}
</style>
