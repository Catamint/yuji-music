<template>
    <div :class="['base-album-item', 'base-item', layoutClass]" @click="onClick">
        <img v-if="layout !== 'compact'" class="cover-img" :src="albumInfo?.img || albumInfo?.picUrl + '?param=300y300'" alt="Album Cover" />
        <div v-if="layout === 'card'" class="card-overlay">
            <div class="info">
                <span class="title">{{ albumInfo?.name }}</span>
                <span class="artist">{{ albumInfo?.artist?.name }}</span>
                <span class="album">{{ albumInfo?.publishDate }}</span>
            </div>
        </div>
        <div v-else class="info">
            <n-ellipsis :tooltip="true" class="title">{{ albumInfo?.name }}</n-ellipsis>
            <n-ellipsis :tooltip="true" class="artist">{{ albumInfo?.artist?.name }}</n-ellipsis>
            <n-ellipsis :tooltip="true" class="publish-date" v-if="albumInfo?.publishDate">{{ albumInfo?.publishDate }}</n-ellipsis>
        </div>
        <div class="actions">
            <n-button class="play" text @click.stop="playAlbum">
                <template #icon><n-icon size="24"><Play24Regular /></n-icon></template>
                <span v-if="layout !== 'card'">播放</span>
            </n-button>
            <n-button class="star" text v-if="!isFavorite" @click.stop="addToFavorites">
                <template #icon><n-icon size="24"><Heart28Regular /></n-icon></template>
                <span v-if="layout !== 'card'">收藏</span>
            </n-button>
            <n-button class="star" text v-else @click.stop="removeFromFavorites">
                <template #icon><n-icon size="24"><Heart28Filled /></n-icon></template>
                <span v-if="layout !== 'card'">取消收藏</span>
            </n-button>
        </div>
    </div>
</template>

<script>
import { NButton, NEllipsis, NIcon } from 'naive-ui';
import { Play24Regular, Heart28Regular, Heart28Filled } from '@vicons/fluent';
import songService from '@/services/songService.js';

export default {
    name: 'BaseAlbumItem',
    props: {
        albumInfo: {
            type: Object,
            required: true,
            validator(value) {
                // 验证必须包含专辑的基本信息
                return value && value.id && value.name;
            }
        },
        isFavorite: {
            type: Boolean,
            default: false,
        },
        layout: {
            type: String,
            default: 'card', // 支持 'card', 'list', 'compact'
            validator(value) {
                return ['card', 'list', 'compact'].includes(value);
            }
        },
    },
    computed: {
        layoutClass() {
            return `layout-${this.layout}`;
        },
    },
    methods: {
        getPicUrl(musicInfo) {
            return songService.getPicUrl(musicInfo);
        },
        playAlbum() {
            this.$emit('play', this.albumInfo);
        },
        addToFavorites() {
            this.$emit('add-to-favorites', this.albumInfo);
        },
        removeFromFavorites() {
            this.$emit('remove-from-favorites', this.albumInfo);
        },
        onClick() {
            this.$router.push({ path: `/album/${this.albumInfo.id}` });
            this.$emit('click', this.albumInfo);
        },
    },
    components: {
        NButton,
        NEllipsis,
        NIcon,
        Play24Regular,
        Heart28Regular,
        Heart28Filled,
    },
};
</script>

<style scoped>
@import '@/styles/card-common.css';
</style>