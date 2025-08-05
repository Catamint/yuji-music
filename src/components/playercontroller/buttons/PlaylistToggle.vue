<script setup>
import { ref } from "vue";
import TooltipButton from "@/components/public/TooltipButton.vue";
import PlayListContainer from "@/components/playlist/PlayListContainer.vue";
import { TextBulletListLtr24Filled } from "@vicons/fluent";
</script>

<template>
  <PlayListContainer :model-value="false">
    <template #trigger>
      <TooltipButton tooltipText="播放列表" class="">
        <template #icon>
          <TextBulletListLtr24Filled />
        </template>
      </TooltipButton>
    </template>
  </PlayListContainer>
</template>
