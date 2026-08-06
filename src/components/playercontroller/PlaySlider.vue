<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import player2 from "@/stores/player2";

const trackEl = ref(null);
const dragging = ref(false);
const dragValue = ref(0);

const currentTime = computed(() => player2.state.currentTime);
const duration = computed(() => player2.state.duration || 0);

const displayValue = computed(() => (dragging.value ? dragValue.value : currentTime.value));

const percent = computed(() => {
  if (duration.value <= 0) return 0;
  const p = (displayValue.value / duration.value) * 100;
  return Math.min(Math.max(p, 0), 100);
});

function valueFromClientX(clientX) {
  const el = trackEl.value;
  if (!el || duration.value <= 0) return;
  const rect = el.getBoundingClientRect();
  const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  dragValue.value = ratio * duration.value;
}

function onPointerDown(event) {
  if (event.button !== 0) return;
  dragging.value = true;
  dragValue.value = currentTime.value;
  valueFromClientX(event.clientX);
  event.preventDefault();
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(event) {
  valueFromClientX(event.clientX);
}

function onPointerUp() {
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  dragging.value = false;
  if (duration.value > 0) player2.setCurrentTime(dragValue.value);
}

onBeforeUnmount(() => {
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
});
</script>

<template>
  <div
    ref="trackEl"
    class="group relative h-1.5 w-full cursor-pointer touch-none select-none bg-muted transition-[height] hover:h-2.5"
    @pointerdown="onPointerDown"
  >
    <!-- 已播放进度 -->
    <div
      class="pointer-events-none absolute inset-y-0 left-0 bg-primary"
      :style="{ width: percent + '%' }"
    ></div>
  </div>
</template>
