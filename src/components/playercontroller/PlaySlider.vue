<script setup>
import { ref } from "vue";
import player2 from "@/stores/player2";

const dragging = ref(false);
const tempCurrentTime = ref(player2.state.currentTime);

function onSliderChange(val) {
  tempCurrentTime.value = val;
}

function onDragstart() {
  dragging.value = true;
  tempCurrentTime.value = player2.state.currentTime; // 初始化拖动时的值
}

function onDragend() {
  player2.set_current_time(tempCurrentTime.value);
  dragging.value = false;
}
</script>

<template>
  <n-slider
    class="slider"
    :value="dragging ? tempCurrentTime : player2.state.currentTime"
    :step="1"
    :max="player2.state.duration"
    :tooltip="false"
    @update:value="onSliderChange"
    @dragstart="onDragstart"
    @dragend="onDragend"
  />
</template>
