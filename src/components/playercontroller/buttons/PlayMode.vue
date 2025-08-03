<script setup>
import { ref } from "vue";
import player2, { PlayMode } from "@/stores/player2";
import TooltipButton from "@/components/public/TooltipButton.vue";
import {
  Pause48Filled,
  ArrowSync24Filled,
  ArrowRotateCounterclockwise24Filled,
} from "@vicons/fluent";
import { NIcon } from "naive-ui";
import { icons } from "lucide-vue-next";

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
    tooltip="顺序/随机/单曲循环"
  >
    <template #icon>
      <n-icon v-if="player2.state.mode === PlayMode.SEQUENTIAL">
        <ArrowSync24Filled />
      </n-icon>
      <n-icon v-else-if="player2.state.mode === PlayMode.RANDOM">
        <ArrowRotateCounterclockwise24Filled />
      </n-icon>
      <n-icon v-else>
        <Pause48Filled />
      </n-icon>
    </template>
  </TooltipButton>
</template>
