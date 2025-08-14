<script setup>
import { ref } from "vue";
import player2 from "@/stores/player2";
import TooltipButton from "@/components/layout/TooltipButton.vue";
import { Play32Filled, Pause48Filled } from "@vicons/fluent";
</script>

<template>
  <TooltipButton tooltipText="播放" class="play" @click="player2.toggle()">
    <template #icon>
      <Play32Filled v-show="!player2.state.isPlaying" />
      <Pause48Filled v-show="player2.state.isPlaying" />
    </template>
  </TooltipButton>
</template>
