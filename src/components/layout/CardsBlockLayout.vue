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
        <slot name="default" />
    </div>
  </div>
</template>

<script lang="ts">
import { ChevronRight16Filled } from "@vicons/fluent";
import type { Music, Album, Artist, SongList } from "@/model";

export default {
  name: "CardsBlockLayout",
  props: {
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
