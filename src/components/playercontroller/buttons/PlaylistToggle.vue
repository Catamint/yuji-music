<script setup>
import { ref } from "vue";
import TooltipButton from "@/components/public/TooltipButton.vue";
import PlayListContainer from "@/components/playlist/PlayListContainer.vue";
</script>

<template>
  <PlayListContainer :model-value="false">
    <template #trigger>
      <TooltipButton icon="TextBulletListLtr24Filled" tooltipText="播放列表" class="" />
    </template>
  </PlayListContainer>
</template>
