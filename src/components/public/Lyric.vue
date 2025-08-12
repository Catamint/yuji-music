<template>
  <div ref="container" class="lyric-container">
    <div
      v-for="(line, i) in lyrics"
      :key="i"
      :class="['lyric-line', { active: i === activeIndex }]"
    >
      {{ line.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  lyrics: Array, // [{ time, text }]
  currentTime: Number, // 播放器当前时间（秒）
  isPlaying: Boolean
});

const container = ref(null);
const activeIndex = ref(0);

watch(() => props.currentTime, (time) => {
  const index = props.lyrics.findIndex((l, i) =>
    time >= l.time && time < (props.lyrics[i+1]?.time ?? Infinity)
  );
  if (index !== -1 && index !== activeIndex.value) {
    activeIndex.value = index;
    scrollToActive();
  }
});

function scrollToActive() {
  const el = container.value?.children[activeIndex.value];
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
</script>

<style scoped>
.lyric-container {
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
}
.lyric-line {
  line-height: 2rem;
  text-align: center;
  transition: color 0.3s;
}
.lyric-line.active {
  color: #ff4f70;
  font-weight: bold;
  font-size: 1.1em;
}
</style>
