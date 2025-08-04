<script setup>
import player2, { PlayMode } from "@/stores/player2";
import TooltipButton from "@/components/public/TooltipButton.vue";
import {
  Pause48Filled,
  ArrowSync24Filled,
  ArrowRotateCounterclockwise24Filled,
} from "@vicons/fluent";

function getNextMode(currentMode) {
  const modes = [PlayMode.SEQUENTIAL, PlayMode.RANDOM, PlayMode.REPEAT_ONE];
  const idx = modes.indexOf(currentMode);
  return modes[(idx + 1) % modes.length];
}
const myicons = {
  sequential: ArrowSync24Filled,
  random: ArrowRotateCounterclockwise24Filled,
  "repeat-one": Pause48Filled,
};
</script>

<template>
  <TooltipButton
    class="playbutton"
    style="font-size: 24px"
    @click="player2.setMode(getNextMode(player2.state.mode))"
    tooltipText="顺序/随机/单曲循环"
  >
    <template #icon>
      <ArrowSync24Filled v-show="player2.state.mode === PlayMode.SEQUENTIAL" />
      <ArrowRotateCounterclockwise24Filled
        v-show="player2.state.mode === PlayMode.RANDOM"
      />
      <Pause48Filled v-show="player2.state.mode === PlayMode.REPEAT_ONE" />
    </template>
  </TooltipButton>
</template>
