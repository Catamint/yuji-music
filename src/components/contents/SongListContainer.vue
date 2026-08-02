<template>
    <CardsBlockLayout :head="head" @header-click="onHeaderClick">
        <slot>
            <SongListCard class="card-item" v-for="(info, index) in songListList" :key="info.id" :songList="info" 
                :layout="layout" :index="(index + 1).toString()" @play="onPlay(info)" @click="onClick(info, index)"
                @add-to-favorites="onAddToFavorites" @remove-from-favorites="onRemoveFromFavorites" />

        </slot>
    </CardsBlockLayout>
</template>

<script setup lang="ts">
import { ChevronRight16Filled } from "@vicons/fluent";
import CardsBlockLayout from "@/components/layout/CardsBlockLayout.vue";
import SongListCard from "./SongListCard.vue";
import player2 from "@/stores/player2";
import type { Music, Album, Artist, SongList } from "@/model";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
    songListList: {
        type: Array as () => SongList[],
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
});

async function onPlay(details: SongList) {
    try {
        await player2.playMulti(details.getMusics());
        // console.log('Playing:', details);
    } catch (error: any) {
        console.error("Error playing song:", error.message);
    }
}

// 点击卡片
function onClick(details: SongList, index: number) {
    console.log("Card clicked:", details, "at index:", index);
    // 可以在这里实现跳转或其他逻辑
    router.push({
        name: "songlist",
        params: {
            id: details.id,
        },
    });
}

// 添加到收藏
function onAddToFavorites(details: SongList) {
    console.log("Add to Favorites:", details);
    // 这里可以调用收藏相关的逻辑
}

// 从收藏中移除
function onRemoveFromFavorites(details: SongList) {
    console.log("Remove from Favorites:", details);
    // 这里可以调用移除收藏相关的逻辑
}

const emit = defineEmits(["header-click"]);
// 点击标题的回调
function onHeaderClick() {
    emit("header-click");
    console.log("Header clicked:", props.head);
    // 可以在这里实现跳转或其他逻辑
}

</script>
