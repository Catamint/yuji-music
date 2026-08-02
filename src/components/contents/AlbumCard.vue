<template>
  <base-card
    :image="album.getPicUrl(300) || defaultImage"
    :title="album.name"
    :subtitle="album.getArtistInfo().name"
    :layout="layout"
    :index="index"
    @click="onClick"
    @title-click="onClick"
    @subtitle-click="onArtistClick"
  >
    <template #actions>
      <Tooltip-button tooltipText="播放全部" class="play" @click.stop="playAlbum">
        <template #icon>
          <Play24Regular />
        </template>
      </Tooltip-button>
      <!-- <like-button :id="albumInfo.id" /> -->
    </template>
  </base-card>
</template>

<script setup lang="ts">
import TooltipButton from "../layout/TooltipButton.vue";
import BaseCard from "@/components/layout/BaseCardLayout.vue";
import { ReceiptPlay24Regular, Play24Regular } from "@vicons/fluent";
// import ContextList from "./DetailMenu.vue";
import { ref } from "vue";
const defaultImage = new URL("../../assets/image/default_cover.jpg", import.meta.url).href;
import { useRouter } from "vue-router";
import type { Music, Album, Artist, SongList } from "@/model";

const router = useRouter();

const props = defineProps({
  album: {
    type: Object as () => Album,
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
    // type: String || Number,
    default: "",
  },

});

const emit = defineEmits(["click", "play", "artist-click", "add-to-play-next"]);
function onClick() {
  router.push({
    name: "album",
    params: {
      id: props.album.id,
    },
  });
}

function playAlbum() {
  emit("play", props.album);
}

function onArtistClick() {
  emit("artist-click", props.album.getArtistInfo());
  router.push({
    name: "artist",
    params: {
      id: props.album.getArtistInfo().id,
    },
  });
}

</script>
