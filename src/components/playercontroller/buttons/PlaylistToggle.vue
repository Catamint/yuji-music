<script setup>
import TooltipButton from "@/components/layout/TooltipButton.vue";
import { TextBulletListLtr24Filled } from "@vicons/fluent";
import { useUiStore } from "@/stores/uiStore";

const uiStore = useUiStore();
</script>

<template>
  <!-- v-model="useUiStore().isPlayListVisible -->

  <TooltipButton
    @click="uiStore.isPlayListVisible = !uiStore.isPlayListVisible"
    tooltipText="播放列表"
    class=""
  >
    <template #icon>
      <TextBulletListLtr24Filled />
    </template>
  </TooltipButton>
</template>
