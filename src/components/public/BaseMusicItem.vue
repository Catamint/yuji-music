<template>
    <base-card
        :image="musicInfo?.album?.picUrl"
        :title="musicInfo?.name"
        :subtitle="musicInfo?.artist?.name"
        :description="musicInfo?.album?.name"
        :layout="layout"
        @click="playMusic"
        @title-click="playMusic"
        @subtitle-click="artistOnClick"
        @description-click="albumOnClick"
    >
        <template #actions>
            <!-- <tooltip-button
            icon="Play24Regular"
            tooltip="播放"
            class="play"
            @click="playMusic"
            /> -->
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
        </template>
    </base-card>
</template>

<script>
import { NButton, NEllipsis, NIcon, NTooltip } from 'naive-ui';
import TooltipButton from './TooltipButton.vue'
import songService from '@/services/songService'; // Make sure this path is correct and songService exports getPicUrl
import BaseCard from '@/components/layout/BaseCardLayout.vue';
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
    data() {
        return {
            picurl: '',
        }
    },
    async created() {
        await this.getPicUrl(this.musicInfo);
    },
    methods: {
        async getPicUrl(musicInfo) {
            if (this.layout == 'card')
                this.picurl =  await songService.getPicUrl(musicInfo);
        },
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
        NIcon,
        BaseCard,
    },
};
</script>

<style>
</style>