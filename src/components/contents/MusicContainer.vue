<template>
    <CardsBlockLayout :head="head" @header-click="onHeaderClick">
        <slot>
            <MusicCard class="card-item" v-for="(info, index) in musicList" :key="info.id" :music="info"
                :layout="layout" :index="(index + 1).toString()" @play="play(info)"
                @add-to-favorites="onAddToFavorites" @remove-from-favorites="onRemoveFromFavorites"
                @put-in-playlist="put_in_playlist" @add-to-play-next="put_in_playlist" />

        </slot>
    </CardsBlockLayout>
</template>

<script lang="ts">
import { ChevronRight16Filled } from "@vicons/fluent";
import CardsBlockLayout from "@/components/layout/CardsBlockLayout.vue";
import MusicCard from "./MusicCard.vue";
import player2 from "@/stores/player2";
import type { Music, Album, Artist, SongList } from "@/model";

export default {
    name: "MusicContainer",
    props: {
        musicList: {
            type: Array<Music>,
            default: () => [],
        },
        head: {
            type: String,
            default: "",
        },
        layout: {
            type: String,
            default: "list", // 支持 'card', 'list', 'compact'
        },
    },
    methods: {
        // 播放歌曲
        async play(music: Music) {
            try {
                await player2.play(music);
                // console.log('Playing:', details);
            } catch (error: any) {
                console.error("Error playing song:", error.message);
            }
        },

        // 添加到收藏
        onAddToFavorites(music: Music) {
            console.log("Add to Favorites:", music);
            // 这里可以调用收藏相关的逻辑
        },

        // 从收藏中移除
        onRemoveFromFavorites(music: Music) {
            console.log("Remove from Favorites:", music);
            // 这里可以调用移除收藏相关的逻辑
        },

        // 点击标题的回调
        onHeaderClick() {
            this.$emit("header-click");
            console.log("Header clicked:", this.head);
            // 可以在这里实现跳转或其他逻辑
        },

        put_in_playlist(music: Music) {
            try {
                player2.put_in_playlist(music);
                // console.log('Playing:', details);
            } catch (error: any) {
                console.error("Error add song:", error.message);
            }
        },
    },
    components: {
        ChevronRight16Filled,
    },
};
</script>
