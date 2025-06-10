<template>
    <div class="card-container">
        <n-button text style="display: flex;" @click="onHeaderClick">
            <h2>{{ head }}</h2>
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
            />
        </div>
    </div>
</template>

<script>
import { ChevronRight16Filled } from '@vicons/fluent/lib';
import { NButton, NIcon } from 'naive-ui';
import BaseMusicItem from './BaseMusicItem.vue';
import {player} from '@/stores/player.js';

export default {
    name: 'CardContainer',
    props: {
        music_info_list: {
            type: Array,
            default: () => [],
        },
        head: {
            type: String,
            default: '列表',
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
                await player.play(details);
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
                await player.put_in_playlist(details);
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
    gap: 40px;
    border-radius: 10px;
    width: 100%;
    max-width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
}

.card-item {
    flex: 1 1 calc(25% - 40px) !important; /* 默认每行4个 */
    aspect-ratio: 1 / 1 !important; /* 保持正方形 */
    max-height: auto !important;
    height: auto !important;
    max-width: calc(25% - 40px) !important;
    box-sizing: border-box !important;
}

/* 响应式布局 */
@media (max-width: 1000px) {
    .card-item {
        flex: 1 1 calc(33.333% - 40px) !important; /* 每行3个 */
        max-width: calc(33.333% - 40px) !important;
    }
}

@media (max-width: 768px) {
    .card-item {
        flex: 1 1 calc(50% - 40px) !important; /* 每行2个 */
        max-width: calc(50% - 40px) !important;
    }
}

@media (max-width: 480px) {
    .card-item {
        flex: 1 1 100% !important; /* 每行1个 */
        max-width: 100% !important;
    }
}

h2 {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    display: inline-block;
}
</style>
