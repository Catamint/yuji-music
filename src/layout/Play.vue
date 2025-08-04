<template>
  <div class="flex flex-col xl:p-30 md:flex-row h-full w-full">
    <button @click="uiStore.togglePlayerPage">返回</button>
    <!-- 移动端切换按钮 -->
    <button v-if="isMobile" class="rounded-full shadow-md" @click="toggleLyrics">
      {{ showLyrics ? "返回" : "歌词" }}
    </button>

    <!-- 左侧内容区域（桌面端显示，移动端为第一页） -->
    <div
      v-if="!isMobile || !showLyrics"
      class="flex flex-col flex-1 md:w-1/2 p-4 justify-center items-center"
    >
      <div class="flex flex-col h-full justify-center items-center w-full max-w-md">
        <div><MusicInfo class="mb-4" /></div>
        <PlaySlider class="mb-4" />

        <!-- 控制按钮区 -->
        <div class="flex justify-between items-center mb-2">
          <PlaybuttonBatch class="flex flex-1 items-center justify-center gap-4" />
          <!-- <PrevButton />
          <NextButton /> -->
          <!-- 更多按钮可以继续添加 -->
        </div>
      </div>

      <PlayTime />
    </div>

    <!-- 歌词区域（桌面端显示，移动端通过切换显示） -->
    <div v-if="!isMobile || showLyrics" class="md:w-1/2 p-4 border-l border-gray-300">
      <!-- 歌词组件可在这里插入 -->
      <div class="text-center text-gray-400">歌词区域</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useWindowSize } from "@vueuse/core";

import MusicInfo from "@/components/playercontroller/MusicInfo-play.vue";
import PlaySlider from "@/components/playercontroller/PlaySlider.vue";
import PlaybuttonBatch from "@/components/playercontroller/buttons/PlaybuttonBatch.vue";
import PlayTime from "@/components/playercontroller/PlayTime.vue";
import { useUiStore } from "@/stores/uiStore";

const uiStore = useUiStore();
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const showLyrics = ref(false);
const toggleLyrics = () => {
  showLyrics.value = !showLyrics.value;
};
</script>
