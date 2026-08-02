<template>
  <base-card
    :image="songList.getPicUrl(300) || defaultImage"
    :title="songList.name"
    :layout="layout"
    :index="index"
    @click="onClick"
    @title-click="onClick"
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
import type { Music, Album, Artist, SongList } from "@/model";

const props = defineProps({
  songList: {
    type: Object as () => SongList,
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

const emit = defineEmits(["click", "play"]);
function onClick() {
  emit("click", props.songList);
}

function playAlbum() {
  emit("play", props.songList);
}

</script>
