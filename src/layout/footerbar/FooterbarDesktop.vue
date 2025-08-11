<template>
  <div class="flex flex-col h-full w-full justify-center">
    <PlaySlider class="slider" />
    <div class="grid grid-cols-[1fr_1fr_1fr] items-center p-2 box-border relative z-10">
      <MusicInfo
        :animation="false"
        :imgSize="12"
        class="flex flex-1 justify-start items-center transition-transform transition-filter duration-300 cursor-pointer transform hover:scale-102 hover:brightness-110 press-active"
        @click="uiStore.togglePlayerPage"
      />
      <PlaybuttonBatch class="flex flex-1 items-center justify-center" />
      <div class="flex flex-1 justify-end items-center gap-1 pr-1">
        <PlayTime class="mr-2 text-xs" />
        <PlayModeButton />
        <PlaylistToggle />
      </div>
    </div>
  </div>
</template>

<script setup>
import MusicInfo from "@/components/playercontroller/MusicInfo.vue";
import PlayModeButton from "@/components/playercontroller/buttons/PlayMode.vue";
import PlaybuttonBatch from "@/components/playercontroller/buttons/PlaybuttonBatch.vue";
import PlayTime from "@/components/playercontroller/PlayTime.vue";
import PlaylistToggle from "@/components/playercontroller/buttons/PlaylistToggle.vue";
import { useUiStore } from "@/stores/uiStore";

const uiStore = useUiStore();
</script>

<style scoped>
.slider {
  position: absolute;
  top: calc(0% - 3px);
  z-index: 100;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
