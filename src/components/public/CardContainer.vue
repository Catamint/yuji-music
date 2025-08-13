<template>
  <div class="card-container">
    <div v-if="head" class="flex flex-col gap-4 m-4">
      <button
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
      <BaseMusicItem
        class="card-item"
        v-for="(info, index) in music_info_list"
        :key="info.id"
        :musicInfo="info"
        :layout="layout"
        :index="index + 1"
        @play="onPlay(info, index)"
        @add-to-favorites="onAddToFavorites"
        @remove-from-favorites="onRemoveFromFavorites"
        @put-in-playlist="put_in_playlist"
        @add-to-play-next="put_in_playlist"
      />
    </div>
  </div>
</template>

<script>
import { ChevronRight16Filled } from "@vicons/fluent";
import BaseMusicItem from "./BaseMusicItem.vue";
import player2 from "@/stores/player2.js";

export default {
  name: "CardContainer",
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
      default: "list", // 支持 'card', 'list', 'compact'
    },
  },
  methods: {
    // 播放歌曲
    async onPlay(details, index) {
      try {
        await player2.playMulti(this.music_info_list, index);
        // console.log('Playing:', details);
      } catch (error) {
        console.error("Error playing song:", error.message);
      }
    },

    // 添加到收藏
    onAddToFavorites(details) {
      console.log("Add to Favorites:", details);
      // 这里可以调用收藏相关的逻辑
    },

    // 从收藏中移除
    onRemoveFromFavorites(details) {
      console.log("Remove from Favorites:", details);
      // 这里可以调用移除收藏相关的逻辑
    },

    // 点击标题的回调
    onHeaderClick() {
      this.$emit("header-click");
      console.log("Header clicked:", this.head);
      // 可以在这里实现跳转或其他逻辑
    },

    async put_in_playlist(details) {
      try {
        await player2.put_in_playlist(details);
        // console.log('Playing:', details);
      } catch (error) {
        console.error("Error add song:", error.message);
      }
    },
  },
  components: {
    BaseMusicItem,
    ChevronRight16Filled,
  },
};
</script>
