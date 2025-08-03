<template>
  <div class="container w-full playbutton-container">
    <n-icon class="playbutton" size="28" @click="player2.prev()">
      <Previous32Filled />
    </n-icon>
    <n-icon class="playbutton" size="36" @click="player2.toggle()">
      <Pause48Filled v-if="player2.state.isPlaying" />
      <Play32Filled v-else />
    </n-icon>
    <n-icon class="playbutton" size="28" @click="player2.next()">
      <Next32Filled />
    </n-icon>
  </div>
</template>

<script setup>
import {
  Play32Filled,
  Pause48Filled,
  Previous32Filled,
  Next32Filled,
} from "@vicons/fluent";
import player2 from "@/stores/player2";
</script>

<style scoped>
.playbutton-container {
  position: absolute;
  z-index: 1;
  /* padding-inline: 14px; */
  width: 100%;
  box-sizing: border-box;
  pointer-events: none; /* 禁止鼠标事件 */
}
.playbutton:hover {
  background-color: #ffffff69;
  cursor: pointer;
  padding: 5px;
}
.playbutton {
  transition: all 0.3s ease;
  border-radius: 50%;
  padding: 2px;
  z-index: 2;
  pointer-events: auto; /* 恢复鼠标事件 */
}
</style>
