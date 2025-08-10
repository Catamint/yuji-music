<script setup>
import player2, { PlayMode } from "@/stores/player2";
import TooltipButton from "@/components/public/TooltipButton.vue";
import {
  CubeMultiple20Filled,
  ArrowSync24Filled,
  ArrowCounterclockwise12Filled,
} from "@vicons/fluent";
import { toast } from "vue-sonner";

function getNextMode(currentMode) {
  const modes = [PlayMode.SEQUENTIAL, PlayMode.RANDOM, PlayMode.REPEAT_ONE];
  const idx = modes.indexOf(currentMode);
  return modes[(idx + 1) % modes.length];
}

function setMode(mode) {
  player2.setMode(mode);
  toast(`${mode}`);
}
</script>

<template>
  <TooltipButton
    class="playbutton"
    style="font-size: 24px"
    @click="setMode(getNextMode(player2.state.mode))"
    tooltipText="顺序/随机/单曲循环"
  >
    <template #icon>
      <ArrowSync24Filled v-show="player2.state.mode === PlayMode.SEQUENTIAL" />
      <ArrowCounterclockwise12Filled
        v-show="player2.state.mode === PlayMode.REPEAT_ONE"
      />
      <CubeMultiple20Filled v-show="player2.state.mode === PlayMode.RANDOM" />
    </template>
  </TooltipButton>
</template>
