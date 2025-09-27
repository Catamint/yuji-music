<script setup>
import player2, { PlayMode } from "@/stores/player2";
import TooltipButton from "@/components/layout/TooltipButton.vue";
import {
  ArrowRouting20Filled,
  ArrowRepeatAll20Filled,
  ArrowReset20Filled,
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
    :tooltipText="player2.state.mode"
  >
    <template #icon>
      <ArrowRepeatAll20Filled v-show="player2.state.mode === PlayMode.SEQUENTIAL" />
      <ArrowReset20Filled v-show="player2.state.mode === PlayMode.REPEAT_ONE" />
      <ArrowRouting20Filled v-show="player2.state.mode === PlayMode.RANDOM" />
    </template>
  </TooltipButton>
</template>
