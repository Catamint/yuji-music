<template>
  <base-card
    :image="musicInfo?.album?.picUrl || musicInfo?.album?.img"
    :title="musicInfo?.name"
    :subtitle="musicInfo?.artist?.name"
    :description="musicInfo?.album?.name"
    :layout="layout"
    :index="index"
    @click="playMusic"
    @title-click="playMusic"
    @subtitle-click="artistOnClick"
    @description-click="albumOnClick"
  >
    <template #actions>
      <!-- <like-button :id="musicInfo.id" /> -->
      <tooltip-button tooltipText="下一首播放" class="next" @click="addToPlayNext">
        <template #icon>
          <ReceiptPlay24Regular />
        </template>
      </tooltip-button>
      <ContextList :music-info="musicInfo" :id="musicInfo.id" />
    </template>
  </base-card>
</template>

<script>
import TooltipButton from "./TooltipButton.vue";
import songService from "@/services/songService"; // Make sure this path is correct and songService exports getPicUrl
import BaseCard from "@/components/layout/BaseCardLayout.vue";
import LikeButton from "../playercontroller/buttons/LikeButton.vue";
import { ReceiptPlay24Regular } from "@vicons/fluent";
import ContextList from "./ContextList.vue";
export default {
  name: "BaseMusicItem",
  props: {
    musicInfo: {
      type: Object,
      required: true,
      validator(value) {
        // 验证必须包含音乐的基本信息
        return value && value.id && value.name && value.artist;
      },
    },
    isFavorite: {
      type: Boolean,
      default: false,
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
  },
  computed: {
    layoutClass() {
      return `layout-${this.layout}`;
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
      if (this.layout == "card") this.picurl = await songService.getPicUrl(musicInfo);
    },
    playMusic() {
      this.$emit("play", this.musicInfo);
    },
    addToFavorites() {
      this.$emit("add-to-favorites", this.musicInfo);
    },
    removeFromFavorites() {
      this.$emit("remove-from-favorites", this.musicInfo);
    },
    onClick() {
      this.$emit("click", this.musicInfo);
    },
    addToPlayNext() {
      console.log("addToPlayNext");
      this.$emit("add-to-play-next", this.musicInfo);
    },
    artistOnClick() {
      this.$router.push({
        name: "artist",
        params: {
          id: this.musicInfo?.artist?.id,
        },
      });
    },
    albumOnClick() {
      this.$router.push({
        name: "album",
        params: {
          id: this.musicInfo?.album?.id,
        },
      });
    },
  },
  components: {
    BaseCard,
    TooltipButton,
    LikeButton,
    ReceiptPlay24Regular,
    ContextList,
  },
};
</script>

<style></style>
