<template>
  <div class="card-container">
    <div class="flex flex-col gap-4 m-4">
      <button
        v-if="head"
        class="flex items-center text-left hover:text-primary cursor-pointer transition-colors"
        @click="onHeaderClick"
      >
        <h1 class="text-2xl font-bold">{{ head }}</h1>
        <svg class="w-4 h-4 ml-2" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M6.23 3.232l4.537 4.252a.75.75 0 010 1.032L6.23 12.768a.75.75 0 01-1.06-1.06L8.989 8 5.17 4.292a.75.75 0 011.06-1.06z"
          />
        </svg>
      </button>
    </div>
    <div class="flex flex-wrap justify-start">
      <!-- 使用基础组件直接渲染 -->
      <BaseAlbumItem
        class="card-item"
        v-for="(info, index) in music_info_list"
        :index="index + 1"
        :key="info.id"
        :albumInfo="info"
        :layout="layout"
        @play="onPlay"
        @click="onClick"
      />
    </div>
  </div>
</template>

<script>
import { ChevronRight16Filled } from "@vicons/fluent";
import BaseAlbumItem from "./BaseAlbumItem.vue";
import player2 from "@/stores/player2.js";

export default {
  name: "AlbumCardContainer",
  props: {
    music_info_list: {
      type: Array,
      default: () => [],
    },
    head: {
      type: String,
      default: "",
    },
    layout: {
      type: String,
      default: "card", // 支持 'card', 'list', 'compact'
    },
  },
  data() {
    return {
      player: player2,
    };
  },
  components: {
    ChevronRight16Filled,
  },
  methods: {
    // 播放歌曲
    async onPlay(details) {
      console.log("Playing song:", details);
      this.player.playMulti(details.songs);
      // 这里可以调用播放函数
    },

    // 点击事件
    onClick(albumInfo) {
      if (albumInfo && albumInfo.id) {
        this.$router.push({ path: `/album/${albumInfo.id}` });
        console.log("Clicked:", albumInfo);
      } else {
        console.warn("albumInfo or albumInfo.id is undefined:", albumInfo);
      }
    },
    onHeaderClick() {
      this.$emit("header-click");
      console.log("Header clicked");
    },
  },
  computed: {
    layoutClass() {
      return `layout-${this.layout}`;
    },
  },
};
</script>
