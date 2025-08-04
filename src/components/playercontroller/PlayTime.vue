<script setup>
import player2 from "@/stores/player2";
function currentMinSec(SecTime) {
  let min = parseInt(SecTime / 60).toString();
  let sec = parseInt(SecTime % 60);
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
}
</script>

<template>
  <span class="time"
    >{{ currentMinSec(player2.state.currentTime) }} /
    {{ currentMinSec(player2.state.duration) }}</span
  >
</template>
