<script setup>
import TooltipButton from "@/components/layout/TooltipButton.vue";
import { TextBulletListLtr24Filled } from "@vicons/fluent";
import { useUiStore } from "@/stores/uiStore";

const uiStore = useUiStore();
</script>

<template>
  <TooltipButton @click="uiStore.toggleDomVisible('playList')" tooltipText="播放列表">
    <template #icon>
      <TextBulletListLtr24Filled />
    </template>
  </TooltipButton>
</template>
