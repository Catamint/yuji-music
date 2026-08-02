<script setup lang="ts">
import DetailMenuTrigger from "@/components/public/DetailMenuTrigger.vue";
import type { Music } from "@/model";

const props = defineProps({
  music: { type: Object as () => Music, required: true },
  id: { type: String, required: true },
});
</script>

<template>
  <DetailMenuTrigger :music="props.music" :id="props.id" />
</template>
