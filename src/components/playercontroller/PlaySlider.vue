<script setup>
import { ref } from "vue";
import player2 from "@/stores/player2";
import { on } from "events";

const dragging = ref(false);
const tempCurrentTime = ref(0);

function onDragstart() {
  dragging.value = true;
  // tempCurrentTime = player2.state.currentTime;
}

function onDragend() {
  player2.setCurrentTime(tempCurrentTime.value);
  console.log("tempCurrentTime:", tempCurrentTime.value);
  dragging.value = false;
}

function onSliderUpdate(val) {
  if (dragging.value) {
    tempCurrentTime.value = val;
  }
}
</script>

<template>
  <n-slider
    id="mySlider"
    class="slider"
    :value="dragging ? tempCurrentTime : player2.state.currentTime"
    :step="1"
    :max="player2.state.duration"
    :tooltip="false"
    @update:value="onSliderUpdate"
    @dragstart="onDragstart"
    @dragend="onDragend"
  />
</template>
