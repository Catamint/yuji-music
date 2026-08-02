<template>
    <base-card :image="music.getPicUrl(300) || defaultImage" 
        :title="music.name" :subtitle="music.getArtistInfo().name" :description="music.albumInfo.name" 
        :layout="layout" :index="index" @click="onCardClick" @title-click="onCardClick"
        @subtitle-click="onArtistClick" @description-click="onAlbumClick">

        <template #actions>
            <!-- <like-button :id="musicInfo.id" /> -->
            <AddToPlayNextButton :music="music" />
            <ContextList :music="music" :id="music.id" />

        </template>
    </base-card>
</template>

<script setup lang="ts">
import TooltipButton from "../layout/TooltipButton.vue";
import BaseCard from "@/components/layout/BaseCardLayout.vue";
// import LikeButton from "../playercontroller/buttons/LikeButton.vue";
import ContextList from "../public/DetailMenu.vue";
import { ref } from "vue";
const defaultImage = "../../assets/image/default_cover.jpg";
import { useRouter } from "vue-router";
import type { Music, Album, Artist, SongList } from "@/model";
import AddToPlayNextButton from "./actions/AddToPlayNextButton.vue";

const router = useRouter();

const props = defineProps({
    music: {
        type: Object as () => Music,
        required: true,
    },
    layout: {
        type: String,
        default: "card", // 支持 'card', 'list', 'compact'
        validator(value: string) {
            return ["card", "list", "compact"].includes(value);
        },
    },
    index: {
        default: "",
    },

});

const emit = defineEmits(["click", "play", "artist-click", "add-to-play-next"]);
function onCardClick() {
    emit("play", props.music);
}


function onArtistClick() {
    emit("artist-click", props.music.getArtistInfo());
    router.push({
        name: "artist",
        params: {
            id: props.music.getArtistInfo().id,
        },
    });
}

function onAlbumClick() {
    router.push({
        name: "album",
        params: {
            id: props.music.albumInfo.id,
        },
    });
}
</script>
