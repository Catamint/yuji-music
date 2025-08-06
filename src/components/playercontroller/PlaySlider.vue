<script setup>
import { ref } from "vue";
import player2 from "@/stores/player2";
import { on } from "events";
import { Slider } from "../ui/slider";
const dragging = ref(false);
const tempCurrentTime = ref(0);

function onDragstart() {
  // tempCurrentTime = player2.state.currentTime;
  dragging.value = true;
}

function onDragend() {
  player2.setCurrentTime(tempCurrentTime.value);
  console.log("tempCurrentTime:", tempCurrentTime.value);
  dragging.value = false;
}

function onSliderUpdate(val) {
  tempCurrentTime.value = val;
}
</script>

<template>
  <Slider
    :modelValue="[dragging ? tempCurrentTime : player2.state.currentTime]"
    :step="1"
    :max="player2.state.duration"
    :min-steps-between-thumbs="1"
    @update:modelValue="onSliderUpdate"
    @pointerdown="onDragstart"
    @pointerup="onDragend"
  >
  </Slider>
</template>
