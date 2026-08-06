<script setup>
import { computed } from "vue";
import player2 from "@/stores/player2";

const props = defineProps({
  size: { type: Number, default: 48 },
  strokeWidth: { type: Number, default: 3 },
  trackClass: { type: String, default: "stroke-border" },
  progressClass: { type: String, default: "stroke-primary" },
});

const radius = computed(() => (props.size - props.strokeWidth) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

const percent = computed(() => {
  const duration = player2.state.duration || 0;
  if (duration <= 0) return 0;
  return Math.min(Math.max((player2.state.currentTime / duration) * 100, 0), 100);
});

const dashOffset = computed(() => circumference.value * (1 - percent.value / 100));
</script>

<template>
  <svg
    class="pointer-events-none -rotate-90"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    role="img"
    aria-label="播放进度"
  >
    <circle
      :cx="size / 2"
      :cy="size / 2"
      :r="radius"
      fill="none"
      :stroke-width="strokeWidth"
      :class="trackClass"
    />
    <circle
      :cx="size / 2"
      :cy="size / 2"
      :r="radius"
      fill="none"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="dashOffset"
      :class="progressClass"
    />
  </svg>
</template>
