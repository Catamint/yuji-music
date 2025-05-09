<template>
    <div :class="['base-music-item', layoutClass]" @click="onClick">
        <img v-if="layout != 'compact'" class="cover-img" :src="musicInfo.album.img" alt="Album Cover" />
        <div class="info">
            <span class="title">{{ musicInfo.name }}</span>
            <span class="artist">{{ musicInfo.artist.name }}</span>
            <span class="artist">{{ musicInfo.album.name }}</span>
        </div>
        <div class="actions">
            <n-button text @click.stop="playMusic">
                <template #icon><n-icon><Play24Regular /></n-icon></template>
                播放
            </n-button>
            <n-button text v-if="!isFavorite" @click.stop="addToFavorites">
                <template #icon><n-icon><Heart28Regular /></n-icon></template>
                收藏
            </n-button>
            <n-button text v-else @click.stop="removeFromFavorites">
                <template #icon><n-icon><Heart28Regular /></n-icon></template>
                取消收藏
            </n-button>
            <n-button text @click.stop="put_in_playlist">
                <template #icon>
                    <n-icon><Play24Regular /></n-icon>
                </template>
                下一首播放
            </n-button>
        </div>
    </div>
</template>

<script>
import { NButton, NEllipsis, NIcon } from 'naive-ui';
import { Play24Regular, Heart28Regular } from '@vicons/fluent';

export default {
    name: 'BaseMusicItem',
    props: {
        musicInfo: {
            type: Object,
            required: true,
        },
        isFavorite: {
            type: Boolean,
            default: false,
        },
        layout: {
            type: String,
            default: 'card', // 支持 'card', 'list', 'compact'
        },
    },
    computed: {
        layoutClass() {
            return `layout-${this.layout}`;
        },
    },
    methods: {
        playMusic() {
            this.$emit('play', this.musicInfo);
        },
        addToFavorites() {
            this.$emit('add-to-favorites', this.musicInfo);
        },
        removeFromFavorites() {
            this.$emit('remove-from-favorites', this.musicInfo);
        },
        onClick() {
            this.$emit('click', this.musicInfo);
        },
        put_in_playlist(musicInfo) {
            this.$emit('put-in-playlist', this.musicInfo);
        },
    },
    components: {
        NButton,
        NEllipsis,
        NIcon,
        Play24Regular,
        Heart28Regular,
    },
};
</script>

<style scoped>
/* 通用样式 */
.base-music-item {
    display: flex;
    align-items: center;
    border-radius: 12px;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.base-music-item:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.cover-img {
    object-fit: cover;
    border-radius: 8px;
}
.info {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
}
.artist {
    font-size: 0.9rem;
}
.actions {
    display: flex;
    gap: 10px;
    padding: 10px;
}

/* 卡片布局 */
.layout-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 200px;
    height: 300px;
}
.layout-card .cover-img {
    width: 100%;
    height: 60%;
}
.layout-card .info {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    box-sizing: border-box;
    align-items: start;
    width: 100%;
}
.layout-card .actions {
    justify-content: center;
}

/* 列表布局 */
.layout-list {
    flex-direction: row;
    width: 47%;
    height: 80px;
}
.layout-list .cover-img {
    width: 80px;
    height: 100%;
}
.layout-list .info {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: auto;
}
.layout-list .actions {
    margin-right: 0;
    align-items: center;
    min-width: fit-content;
    justify-content: flex-end;
}

/* 紧凑布局 */
.base-music-item .layout-compact {
    flex-direction: row;
    border-radius: 6px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    width: 100%;
    height: 40px;
}
.base-music-item .layout-compact:hover {
    box-shadow: 0 1px 2px  rgba(0, 0, 0, 0.1);
}

.layout-compact .cover-img {
    width: 40px;
    height: 100%;
}
.layout-compact .info {
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 12px;
    align-items: center;
}
.layout-compact .title {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0;
}
.layout-compact .artist {
    font-size: 0.8rem;
}
.layout-compact .actions {
    margin-left: auto;
    align-items: center;
}
</style>