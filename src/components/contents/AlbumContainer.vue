<template>
    <CardsBlockLayout :head="head" @header-click="onHeaderClick">
        <slot>
            <AlbumCard class="card-item" v-for="(info, index) in albumList" :key="info.id" :album="info"
                :layout="layout" :index="(index + 1).toString()" @play="onPlay(info, index)"
                @add-to-favorites="onAddToFavorites" @remove-from-favorites="onRemoveFromFavorites" />

        </slot>
    </CardsBlockLayout>
</template>

<script lang="ts">
import { ChevronRight16Filled } from "@vicons/fluent";
import CardsBlockLayout from "@/components/layout/CardsBlockLayout.vue";
import AlbumCard from "./AlbumCard.vue";
import player2 from "@/stores/player2";
import type { Music, Album, Artist, SongList } from "@/model";

export default {
    name: "AlbumContainer",
    props: {
        albumList: {
            type: Array<Album>,
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
        async onPlay(album: Album, index: number) {
            try {
                await player2.playMulti(album.musicList, index);
                console.log('Playing:', album);
            } catch (error: any) {
                console.error("Error playing song:", error.message);
            }
        },

        // 添加到收藏
        onAddToFavorites(album: Album) {
            console.log("Add to Favorites:", album);
            // 这里可以调用收藏相关的逻辑
        },

        // 从收藏中移除
        onRemoveFromFavorites(album: Album) {
            console.log("Remove from Favorites:", album);
            // 这里可以调用移除收藏相关的逻辑
        },

        // 点击标题的回调
        onHeaderClick() {
            this.$emit("header-click");
            console.log("Header clicked:", this.head);
            // 可以在这里实现跳转或其他逻辑
        },
    },
    components: {
        ChevronRight16Filled,
    },
};
</script>
