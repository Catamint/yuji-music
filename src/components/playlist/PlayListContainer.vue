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
</script>

<template>
  <Sheet
    :open="useUiStore().domVisible.playList"
    @update:open="
      (event) => {
        useUiStore().setDomVisible('playList', event);
      }
    "
    v-if="!useUiStore().isMobile"
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
        useUiStore().setDomVisible('playList', event);
      }
    "
    :open="useUiStore().domVisible.playList"
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
