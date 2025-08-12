<template>
  <div
    class="box box-border bg-accent backdrop-blur-3xl pointer-events-auto h-dvh w-screen transition-all duration-800 delay-600"
    :style="{ backgroundImage: `url(${getPic})` }"
  >
    <div
      class="flex flex-col xl:p-30 md:flex-row pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-full w-full backdrop-blur-2xl glass-filter"
    >
      <div class="flex flex-col items-start p-4">
        <button @click="uiStore.togglePlayerPage">
          <ChevronLeft12Filled class="w-8 h-8" />
        </button>
      </div>

      <!-- 移动端切换按钮 -->
      <!-- <button v-if="isMobile" class="rounded-full shadow-md" @click="toggleLyrics">
      {{ showLyrics ? "返回" : "歌词" }}
    </button> -->

      <!-- 左侧内容区域（桌面端显示，移动端为第一页） -->
      <div
        v-if="!isMobile || !showLyrics"
        class="flex flex-col flex-1 md:w-1/2 p-4 justify-center items-center"
      >
        <div class="flex flex-col h-full justify-center items-center w-full max-w-md">
          <div class="w-full"><MusicInfo @click="toggleLyrics" class="mb-4" /></div>
          <PlaySlider class="mb-4" />

          <!-- 控制按钮区 -->
          <div class="flex justify-between items-center mb-2">
            <PlaybuttonBatch class="flex flex-1 items-center justify-center gap-4" />
          </div>
        </div>
        <!-- 更多按钮可以继续添加 -->
        <div class="flex justify-between items-center gap-4 mb-4">
          <PlayMode /> <PlaylistToggle />
          <LikeButton :id="musicInfo.id" />
        </div>
        <PlayTime />
      </div>

      <!-- 歌词区域（桌面端显示，移动端通过切换显示） -->
      <div
        v-if="!isMobile || showLyrics"
        class="md:w-1/2 p-4 h-full flex justify-center items-center border-l border-gray-300"
      >
        <!-- 歌词组件可在这里插入 -->
        <div @click="toggleLyrics" class="text-center text-gray-400">
          我是歌词, 点我返回
        </div>
      </div>
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
import player2 from "@/stores/player2";
import LikeButton from "@/components/playercontroller/buttons/LikeButton.vue";
import PlaylistToggle from "@/components/playercontroller/buttons/PlaylistToggle.vue";
import { ChevronLeft12Filled } from "@vicons/fluent";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { on } from "events";
import { get } from "core-js/core/dict";

const uiStore = useUiStore();
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const showLyrics = ref(false);
const toggleLyrics = () => {
  showLyrics.value = !showLyrics.value;
};

const getPic = computed(() => {
  const pic = musicInfo.value?.album?.picUrl;
  return `${pic.replace(/^http:/, "https:")}?param=${300}y${300}`;
});

const imageLoaded = ref(false);

const musicInfo = computed(() => {
  return player2.state.playlist[player2.state.currentIndex];
});

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  document.body.style.overflow = "auto";
});
</script>
