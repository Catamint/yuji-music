<script setup>
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ref, watch, onMounted, onUnmounted } from "vue";
import PlayList from "@/components/playlist/PlayList.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

// 响应式判断当前是否为桌面端
const isDesktop = ref(window.innerWidth >= 768);
const handleResize = () => {
  isDesktop.value = window.innerWidth >= 768;
};

// 监听窗口尺寸变化
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <Sheet
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    v-if="isDesktop"
  >
    <SheetTrigger>
      <slot name="trigger" />
    </SheetTrigger>
    <SheetContent side="right" class="w-full md:w-[450px] lg:w-[500px]">
      <SheetHeader class="mb-4">
        <SheetTitle>播放列表</SheetTitle>
        <SheetDescription>当前播放的歌曲列表</SheetDescription>
      </SheetHeader>
      <PlayList class="overflow-y-auto" />
    </SheetContent>
  </Sheet>

  <Sheet
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    v-else
  >
    <SheetTrigger>
      <slot name="trigger" />
    </SheetTrigger>
    <SheetContent side="bottom" class="h-full rounded-t-lg">
      <SheetHeader class="mb-4">
        <SheetTitle>播放列表</SheetTitle>
        <SheetDescription>当前播放的歌曲列表</SheetDescription>
      </SheetHeader>
      <PlayList class="overflow-y-auto" />
    </SheetContent>
  </Sheet>
</template>
