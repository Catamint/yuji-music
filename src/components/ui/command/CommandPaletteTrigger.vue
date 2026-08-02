<script setup>
import { defineProps } from "vue";
import { SearchIcon } from "@lucide/vue";
import { useUiStore } from "@/stores/uiStore";

const props = defineProps({
  payload: { type: Object, required: false, default: () => ({}) },
  label: { type: String, required: false, default: "搜索" },
  class: { type: String, required: false, default: "" },
});

const uiStore = useUiStore();
function openPalette() {
  uiStore.openCommandPalette(props.payload);
}
</script>

<template>
  <button
    type="button"
    :class="[
      'w-full cursor-text rounded-lg border border-border bg-background px-3 py-2 text-left text-sm text-muted-foreground transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
      props.class,
    ]"
    @click="openPalette"
  >
    <div class="flex justify-center items-center gap-2">
      <SearchIcon class="size-4 opacity-50" />
      <span class="truncate">搜索</span>
    </div>
  </button>
</template>
