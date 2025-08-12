<template>
  <transition name="fade">
    <div
      v-if="lyrics.length > 0"
      :key="lyrics"
      ref="containerRef"
      class="lyric-container absolute transition-all duration-300"
      @scroll.passive="onScroll"
    >
      <!-- <div class="h-[25dvh]"></div> -->
      <div
        v-for="(line, index) in lyrics"
        :key="index"
        class="lyric-line transition-all duration-300 ease-in-out active:scale-120 active:font-bold"
        :class="{ active: index === activeIndex }"
        @click="onClickLine(line)"
      >
        <!-- 原文 -->
        <div v-if="showFields.lrc" class="lrc text-lg">{{ line.lrc }}</div>
        <!-- 翻译 -->
        <div v-if="showFields.tlrc" class="tlrc text-secondary-foreground">
          {{ line.tlrc }}
        </div>
        <!-- 注音 -->
        <div v-if="showFields.rlrc" class="rlrc text-muted-foreground">
          {{ line.rlrc }}
        </div>
      </div>
      <!-- <div class="h-[25dvh]"></div> -->
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps({
  lyrics: {
    type: Array,
    default: () => [], // [{ time, lrc, tlrc?, rlrc? }]
  },
  currentTime: {
    type: Number,
    default: 0, // 秒
  },
  isPlaying: {
    type: Boolean,
    default: false,
  },
  showFields: {
    type: Object,
    default: () => ({ lrc: true, tlrc: false, rlrc: false }),
  },
  autoScrollDelay: {
    type: Number,
    default: 3000, // 手动滚动后恢复自动跟随的延迟(ms)
  },
});

const emit = defineEmits(["seek"]);

const containerRef = ref(null);
const activeIndex = ref(0);
const isUserScrolling = ref(false);
let scrollTimer = null;

// 监听播放器时间 → 自动更新高亮行
watch(
  () => props.currentTime,
  (time) => {
    if (isUserScrolling.value) return; // 手动滚动时不自动跟随

    const idx = findActiveIndex(time);
    if (idx !== -1 && idx !== activeIndex.value) {
      activeIndex.value = idx;
      console.log("更新高亮行:", time, idx, activeIndex.value);
      scrollToActive();
    } else if (idx === -1) {
      activeIndex.value = 0;
      console.log("更新高亮行:", time, idx, activeIndex.value);
      scrollToActive();
    }
  }
);

// 查找当前时间对应的歌词行（用二分查找优化）
function findActiveIndex(time) {
  let left = 0;
  let right = props.lyrics.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const current = props.lyrics[mid].time;
    const next = props.lyrics[mid + 1]?.time ?? Infinity;
    if (time >= current && time < next) {
      return mid;
    } else if (time < current) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

// 自动滚动到高亮行
function scrollToActive() {
  nextTick(() => {
    const el = containerRef.value?.children[activeIndex.value];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

// 手动滚动事件
function onScroll() {
  if (!isUserScrolling.value) {
    isUserScrolling.value = true;
  }
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    isUserScrolling.value = false;
    scrollToActive();
  }, props.autoScrollDelay);
}

// 点击歌词行 → 发出 seek 事件
function onClickLine(line) {
  emit("seek", line.time);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.lyric-container {
  height: 100%;
  padding: 1rem;
  scroll-behavior: smooth;
  overflow-y: scroll; /* 仍然可以滚动 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  /* -webkit-overflow-scrolling: touch; */
}

.lyric-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.lyric-line {
  text-align: center;
  padding: 0.3rem 0;
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
}

.lyric-line.active .lrc {
  color: #ff4081;
  transform: scale(1.1);
  font-weight: bold;
  font-size: 1.1em;
}
</style>
