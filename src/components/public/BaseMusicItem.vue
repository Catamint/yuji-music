<template>
    <div :class="['base-item', 'base-music-item', layoutClass]" @click="onClick">
        <img v-if="layout != 'compact'" class="cover-img" :src="musicInfo?.album?.img" alt="Album Cover" />
        <!-- 卡片布局的遮罩和文字悬浮层 -->
        <div v-if="layout === 'card'" class="card-overlay">
            <div class="info">
                <span class="title">{{ musicInfo?.name }}</span>
                <span class="artist" @click="artistOnClick">{{ musicInfo?.artist?.name }}</span>
                <span class="album" @click="albumOnClick">{{ musicInfo?.album?.name }}</span>
            </div>
        </div>
        <!-- 非卡片布局的普通信息区域 -->
        <div v-else class="info">
            <span class="title">{{ musicInfo?.name }}</span>
            <span class="artist" @click="artistOnClick">{{ musicInfo?.artist?.name }}</span>
            <span class="album" @click="albumOnClick">{{ musicInfo?.album?.name }}</span>
        </div>
        <div class="actions">
            <tooltip-button
            icon="Play24Regular"
            tooltip="播放"
            class="play"
            @click="playMusic"
            />
            <tooltip-button v-if="!isFavorite"
            icon="Heart28Regular"
            tooltip="收藏"
            class="star"
            @click.stop="addToFavorites"
            />
            <tooltip-button v-else
            icon="Heart28Filled"
            tooltip="取消收藏"
            class="star"
            @click.stop="removeFromFavorites"
            />
            <tooltip-button
            icon="ReceiptPlay24Regular"
            tooltip="下一首播放"
            class="next"
            @click="addToPlayNext"
            />

        </div>
    </div>
</template>

<script>
import { NButton, NEllipsis, NIcon, NTooltip } from 'naive-ui';
import TooltipButton from './TooltipButton.vue'
export default {
    name: 'BaseMusicItem',
    props: {
        musicInfo: {
            type: Object,
            required: true,
            validator(value) {
                // 验证必须包含音乐的基本信息
                return value && value.id && value.name && value.artist;
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
        addToPlayNext() {
            console.log('addToPlayNext')
            this.$emit('add-to-play-next', this.musicInfo);
        },
        artistOnClick(){
            this.$router.push({
                name:'artist',
                params:{
                    id:this.musicInfo?.artist?.id
                }
            })
        },
        albumOnClick(){
            this.$router.push({
                name:'album',
                params:{
                    id:this.musicInfo?.album?.id
                }
            })
        }
    },
    components: {
        NButton,
        NEllipsis,
        NIcon
    },
};
</script>

<style>
@import '@/styles/card-common.css';

/* 音乐卡片特有样式 */
.base-music-item {
    /* 可以添加音乐卡片特有的样式 */
}
</style>