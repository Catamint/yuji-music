<script setup lang="ts">
import { MoreVertical20Filled } from "@vicons/fluent";
import TooltipButton from "../layout/TooltipButton.vue";
import { useUiStore } from "@/stores/uiStore";
import type { Music } from "@/model";

const props = defineProps({
  music: { type: Object as () => Music, required: true },
  id: { type: String, required: true },
});

const uiStore = useUiStore();
function openDetailMenu() {
  uiStore.openDetailMenu({
    music: props.music,
    id: props.id,
  });
}
</script>

<template>
  <TooltipButton tooltipText="更多操作" @click="openDetailMenu">
    <template #icon>
      <MoreVertical20Filled />
    </template>
  </TooltipButton>
</template>
