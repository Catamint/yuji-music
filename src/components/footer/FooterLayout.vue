<template>
  <div
    class="flex justify-between items-center m-2.5 p-2.5 h-20 box-border rounded-xl relative z-10 border"
  >
    <MusicInfo />
    <PlayerController />
  </div>
</template>

<script setup>
import PlayerController from "./PlayerController.vue";
import MusicInfo from "./MusicInfo.vue";
</script>
