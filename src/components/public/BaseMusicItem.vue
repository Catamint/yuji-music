<template>
  <base-card
    :image="picurl"
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
      <tooltip-button tooltipText="下一首播放" class="next" @click="addToPlayNext">
        <template #icon>
          <ReceiptPlay24Regular />
        </template>
      </tooltip-button>
      <ContextList :music-info="musicInfo" :id="musicInfo.id" />
    </template>
    <template v-else #actions>
      <tooltip-button tooltipText="播放全部" class="play" @click="playAlbum">
        <template #icon>
          <Play24Regular />
        </template>
      </tooltip-button>
      <!-- <like-button :id="albumInfo.id" /> -->
    </template>
  </base-card>
</template>

<script>
import TooltipButton from "./TooltipButton.vue";
import songService from "@/services/songService"; // Make sure this path is correct and songService exports getPicUrl
import BaseCard from "@/components/layout/BaseCardLayout.vue";
import LikeButton from "../playercontroller/buttons/LikeButton.vue";
import { ReceiptPlay24Regular, Play24Regular } from "@vicons/fluent";
import ContextList from "./ContextList.vue";
export default {
  name: "BaseMusicItem",
  props: {
    musicInfo: {
      type: Object,
      required: true,
      validator(value) {
        // 验证必须包含基本信息
        return value && value.id && value.name;
      },
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
  },
  data() {
    return {
      picurl: "",
    };
  },
  async created() {
    await this.getPicUrl(this.musicInfo);
  },
  methods: {
    async getPicUrl(musicInfo) {
      if (this.layout == "card" || this.layout == "list")
        this.picurl = (await songService.getPicUrl(musicInfo)) + "?param=300y300";
    },
    onClick() {
      if (this.mediaType === "music") this.$emit("play", this.musicInfo);
      else this.$emit("click", this.musicInfo);
    },
    playAlbum() {
      this.$emit("play", this.musicInfo);
    },
    addToPlayNext() {
      console.log("addToPlayNext");
      this.$emit("add-to-play-next", this.musicInfo);
    },
    onSubTitleClick() {
      this.$emit("artist-click", this.musicInfo.artist);
      this.$router.push({
        name: "artist",
        params: {
          id: this.musicInfo?.artist?.id,
        },
      });
    },
    onDescriptionClick() {
      this.$router.push({
        name: "album",
        params: {
          id: this.musicInfo?.album?.id,
        },
      });
    },
  },
  components: {
    Play24Regular,
    BaseCard,
    TooltipButton,
    LikeButton,
    ReceiptPlay24Regular,
    ContextList,
  },
};
</script>
