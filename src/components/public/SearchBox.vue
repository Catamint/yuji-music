<script setup>
import CommandPaletteTrigger from "@/components/ui/command/CommandPaletteTrigger.vue";

const triggerPayload = {
  query: "",
  placeholder: "搜索音乐 / 专辑 / 创作者 / 歌单",
  options: [
    { label: "音乐", type: "music" },
    { label: "专辑", type: "album" },
    { label: "艺术家", type: "artist" },
    { label: "歌单", type: "songlist" },
  ],
};
</script>

<template>
  <CommandPaletteTrigger :payload="triggerPayload" label="搜索" />
</template>
