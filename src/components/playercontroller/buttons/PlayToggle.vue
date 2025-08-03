<script setup>
import { ref } from "vue";
import player2 from "@/stores/player2";
import TooltipButton from "@/components/public/TooltipButton.vue";
</script>

<template>
  <TooltipButton
    icon="Play24Regular"
    tooltipText="播放"
    class="play"
    @click="player2.toggle()"
  />
</template>
