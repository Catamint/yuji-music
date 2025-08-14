<template>
  <div class="flex items-center gap-1">
    <div class="playbutton" @click="player2.prev()">
      <Previous32Filled class="w-6 h-6 text-primary" />
    </div>
    <div class="playbutton" @click="player2.toggle()">
      <Pause48Filled class="w-8 h-8 text-primary" v-if="player2.state.isPlaying" />
      <Play32Filled class="w-8 h-8 text-primary" v-else />
    </div>
    <div class="playbutton" @click="player2.next()">
      <Next32Filled class="w-6 h-6 text-primary" />
    </div>
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
.playbutton:hover {
  background-color: #ffffff69;
  transform: scale(1.1);
  cursor: pointer;
}
.playbutton:active {
  background-color: #ffffff69;
  transform: scale(1.1);
}
.playbutton {
  transition: all 0.3s ease;
  border-radius: 50%;
  padding: 2px;
  z-index: 2;
  pointer-events: auto; /* 恢复鼠标事件 */
}
</style>
