<template>
  <div
    class="box box-border bg-accent backdrop-blur-3xl pointer-events-auto h-dvh w-screen transition-all duration-800 delay-600"
    :style="{ backgroundImage: `url(${getPic})` }"
  >
    <div
      class="flex flex-col py-4 md:p-20 lg:p-28 xl:p-40 md:flex-row pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-full w-full backdrop-blur-2xl glass-filter"
    >
      <div
        class="fixed top-4 left-4 pt-[env(safe-area-inset-top)] lg:top-16 lg:left-16 xl:top-24 xl:left-28 flex flex-col p-2"
      >
        <button @click="uiStore.togglePlayerPage">
          <ChevronLeft12Filled class="w-8 h-8 text-muted-foreground" />
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
        <div v-if="showHint && isMobile" class="lyrics-hint text-muted-foreground">
          点击专辑封面查看歌词
        </div>
        <div
          class="flex flex-col h-full w-full px-8 justify-center items-center max-w-md"
        >
          <div class="w-full"><MusicInfo @click="toggleLyrics" class="mb-4" /></div>
          <PlaySlider class="mb-4" />

          <!-- 控制按钮区 -->
          <div class="flex justify-between items-center mb-2">
            <PlaybuttonBatch class="flex flex-1 items-center justify-center gap-4" />
          </div>
        </div>
        <!-- 更多按钮可以继续添加 -->
        <div class="flex justify-between items-center gap-4 mb-4">
          <LikeButton :id="musicInfo.id" />
          <PlayMode />
          <PlaylistToggle />
        </div>
        <PlayTime />
      </div>
      <!-- <div class="py-60 h-full border-l border-gray-300" v-if="!isMobile"></div> -->
      <!-- 歌词区域（桌面端显示，移动端通过切换显示） -->
      <div
        v-if="!isMobile || showLyrics"
        class="lyric-wrapper mt-20 md:my-0 md:w-1/2 px-4 h-full flex justify-center items-center overflow-hidden"
      >
        <!-- 歌词组件可在这里插入 -->
        <!-- <div class="text-center flex text-gray-400 justify-center"> -->
        <Lyric
          :lyrics="lyrics"
          :currentTime="playerTime"
          :isPlaying="isPlaying"
          :showFields="{ lrc: true, tlrc: settings.showTlrc, rlrc: settings.showRlrc }"
          @seek="onSeek"
        />
      </div>
      <div
        v-if="!isMobile"
        class="fixed gap-1 right-10 xl:right-30 bottom-10 xl:bottom-30 flex items-center justify-center"
      >
        <Toggle v-model="settings.showTlrc">翻译</Toggle>
        <Toggle v-model="settings.showRlrc">注音</Toggle>
      </div>
      <div
        v-if="isMobile && showLyrics"
        class="flex flex-col justify-between items-stretch m-2"
      >
        <div class="flex w-full justify-end">
          <Toggle v-model="settings.showTlrc">翻译</Toggle>
          <Toggle v-model="settings.showRlrc">注音</Toggle>
        </div>
        <Button class="m-4" variant="outline" @click="toggleLyrics">返回</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
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
import songService from "@/services/songService";
import { Toggle } from "@/components/ui/toggle";

// 模拟播放器状态
const isPlaying = computed(() => player2.state.isPlaying);
const playerTime = computed(() => player2.state.currentTime);

const settings = ref({
  showTlrc: true,
  showRlrc: false,
});

function onSeek(time) {
  console.log("跳转到:", time);
  player2.state.audio.currentTime = time;
}

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

/**
 * 将 API 返回的歌词数据解析为 [{time, lrc, tlrc, rlrc}] 格式
 * @param {Object} lyricData API 返回的数据对象
 * @returns {Array} 解析后的歌词数组
 */
function parseLyrics(lyricData) {
  const parseLrcString = (lrcString) => {
    if (!lrcString) return [];
    const lines = lrcString.split("\n");
    const regex = /\[(\d{2}):(\d{2}(?:\.\d{1,3})?)\](.*)/;
    const result = [];

    for (const line of lines) {
      const match = line.match(regex);
      if (match) {
        const min = parseInt(match[1], 10);
        const sec = parseFloat(match[2]);
        const time = min * 60 + sec;
        const text = match[3]?.trim() || "";
        result.push({ time, text });
      }
    }
    return result;
  };

  // 解析三种歌词
  const lrcList = parseLrcString(lyricData?.lrc?.lyric || "");
  const tlrcList = parseLrcString(lyricData?.tlyric?.lyric || "");
  const rlrcList = parseLrcString(lyricData?.romalrc?.lyric || "");

  // 合并到一个数组
  const merged = lrcList.map((item) => {
    const tlrc = tlrcList.find((t) => Math.abs(t.time - item.time) < 0.01)?.text || "";
    const rlrc = rlrcList.find((r) => Math.abs(r.time - item.time) < 0.01)?.text || "";
    return {
      time: item.time,
      lrc: item.text,
      tlrc,
      rlrc,
    };
  });

  return merged;
}

const lyrics = ref([]); // 响应式存储

watch(
  musicInfo,
  async () => {
    try {
      const lyricData = parseLyrics(await songService.getSongLyric(musicInfo.value.id));
      console.log(lyricData);
      lyrics.value = lyricData;
      isPlaying.value = player2.state.isPlaying;
      playerTime.value = player2.state.currentTime;
    } catch (error) {
      console.log(error);
    }
  },
  {
    immediate: true,
  }
);

const showHint = ref(true);

onMounted(() => {
  setTimeout(() => {
    showHint.value = false;
  }, 5000); // 5 秒后隐藏
});

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  document.body.style.overflow = "auto";
});
</script>

<style scoped>
.lyric-wrapper {
  /* 渐变遮罩 */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    black 15%,
    black 85%,
    transparent
  );
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;

  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}

.lyrics-hint {
  background: rgba(0, 0, 0, 0.3);
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 12px;
  pointer-events: none;
  /* animation: floatHint 1.5s ease-in-out infinite alternate; */
  opacity: 0.8;
  transition: all 0.3s ease-in-out;
}
</style>
