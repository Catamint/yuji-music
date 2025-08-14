<template>
  <base-card
    :image="picUrl"
    :title="musicInfo?.name"
    :subtitle="musicInfo?.artist?.name"
    :description="musicInfo?.album?.name || musicInfo?.publishDate"
    :layout="layout"
    :index="index"
    @click="onClick"
    @title-click="onClick"
    @subtitle-click="onSubTitleClick"
    @description-click="onDescriptionClick"
  >
    <template v-if="mediaType === 'music'" #actions>
      <!-- <like-button :id="musicInfo.id" /> -->
      <tooltip-button tooltipText="下一首播放" class="next" @click.stop="addToPlayNext">
        <template #icon>
          <ReceiptPlay24Regular />
        </template>
      </tooltip-button>
      <ContextList :music-info="musicInfo" :id="musicInfo.id" />
    </template>
    <template v-else #actions>
      <tooltip-button tooltipText="播放全部" class="play" @click.stop="playAlbum">
        <template #icon>
          <Play24Regular />
        </template>
      </tooltip-button>
      <!-- <like-button :id="albumInfo.id" /> -->
    </template>
  </base-card>
</template>

<script setup>
import TooltipButton from "../layout/TooltipButton.vue";
import songService from "@/services/songService"; // Make sure this path is correct and songService exports getPicUrl
import BaseCard from "@/components/layout/BaseCardLayout.vue";
// import LikeButton from "../playercontroller/buttons/LikeButton.vue";
import { ReceiptPlay24Regular, Play24Regular } from "@vicons/fluent";
import ContextList from "./ContextList.vue";
import { ref } from "vue";
import defaultImage from "@/assets/image/default_cover.jpg";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  musicInfo: {
    type: Object,
    required: true,
    // validator(value) {
    //   // 验证必须包含基本信息
    //   return value && value.id && value.name;
    // },
  },
  layout: {
    type: String,
    default: "card", // 支持 'card', 'list', 'compact'
    validator(value) {
      return ["card", "list", "compact"].includes(value);
    },
  },
  index: {
    // type: String || Number,
    default: "",
  },
  mediaType: {
    type: String,
    default: "music",
  },
});

const picUrl = ref(defaultImage);
getPicUrl(props.musicInfo);

async function getPicUrl(musicInfo) {
  if (props.layout == "card" || props.layout == "list")
    picUrl.value = await songService.getPicUrl(musicInfo);
}

const emit = defineEmits(["click", "play", "artist-click", "add-to-play-next"]);
function onClick() {
  if (props.mediaType === "music") emit("play", props.musicInfo);
  else emit("click", props.musicInfo);
}

function playAlbum() {
  emit("play", props.musicInfo);
}

function addToPlayNext() {
  console.log("addToPlayNext");
  emit("add-to-play-next", props.musicInfo);
}

function onSubTitleClick() {
  emit("artist-click", props.musicInfo.artist);
  router.push({
    name: "artist",
    params: {
      id: props.musicInfo?.artist?.id,
    },
  });
}

function onDescriptionClick() {
  router.push({
    name: "album",
    params: {
      id: props.musicInfo?.album?.id,
    },
  });
}
</script>
