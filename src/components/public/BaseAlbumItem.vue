<template>
    <base-card
        :image="(albumInfo?.img || albumInfo?.picUrl) + '?param=300y300'"
        :title="albumInfo?.name"
        :subtitle="albumInfo?.artist?.name"
        :description="albumInfo?.publishDate"
        :layout="layout"
        @click="onClick"
        @subtitle-click="onArtistClick"
    >
        <template #actions>
            <n-button text @click.stop="playAlbum">
                <n-icon size="24"><Play24Regular /></n-icon>
                <span v-if="layout !== 'card'">播放</span>
            </n-button>
            <n-button text v-if="!isFavorite" @click.stop="addToFavorites">
                <n-icon size="24"><Heart28Regular /></n-icon>
                <span v-if="layout !== 'card'">收藏</span>
            </n-button>
            <n-button text v-else @click.stop="removeFromFavorites">
                <n-icon size="24"><Heart28Filled /></n-icon>
                <span v-if="layout !== 'card'">取消收藏</span>
            </n-button>
        </template>
    </base-card>
</template>

<script>
import { NButton, NEllipsis, NIcon } from 'naive-ui';
import { Play24Regular, Heart28Regular, Heart28Filled } from '@vicons/fluent';
import songService from '@/services/songService.js';
import BaseCard from '@/components/layout/BaseCardLayout.vue';

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
            console.log('Clicked:', this.albumInfo);
            this.$emit('click', this.albumInfo);
        },
        onArtistClick() {
            console.log('Artist clicked:', this.albumInfo.artist);
            this.$emit('artist-click', this.albumInfo.artist);
            this.$router.push({ name:'artist', params: { id: this.albumInfo.artist.id } });
        },
    },
    components: {
        NButton,
        NEllipsis,
        NIcon,
        Play24Regular,
        Heart28Regular,
        Heart28Filled,
        BaseCard
    },
};
</script>

<style scoped>

</style>