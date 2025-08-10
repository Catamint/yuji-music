<script setup>
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ref, watch, onMounted, onUnmounted } from "vue";
import PlayList from "@/components/playlist/PlayList.vue";
import { useUiStore } from "@/stores/uiStore";
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
    :open="useUiStore().isPlayListVisible"
    @update:open="
      (event) => {
        useUiStore().isPlayListVisible = event;
      }
    "
    v-if="isDesktop"
  >
    <SheetContent side="right" class="w-full md:w-[450px] lg:w-[500px] fixed z-[1000]">
      <SheetHeader class="mb-4">
        <SheetTitle>播放列表</SheetTitle>
        <SheetDescription>当前播放的歌曲列表</SheetDescription>
      </SheetHeader>
      <PlayList class="overflow-y-auto" />
    </SheetContent>
  </Sheet>

  <Drawer
    @update:open="
      (event) => {
        useUiStore().isPlayListVisible = event;
      }
    "
    :open="useUiStore().isPlayListVisible"
    v-else
  >
    <DrawerContent class="bg-popover fixed z-[1000]">
      <DrawerHeader>
        <DrawerTitle>播放列表</DrawerTitle>
        <DrawerDescription>长按可拖动（假的）</DrawerDescription>
      </DrawerHeader>
      <PlayList class="overflow-y-auto" />
    </DrawerContent>
  </Drawer>
</template>
