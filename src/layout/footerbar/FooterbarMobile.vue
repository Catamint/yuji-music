<template>
  <div
    class="flex flex-col h-full w-full justify-center"
    @click="uiStore.togglePlayerPage"
  >
    <!-- <PlaySlider class="slider" /> -->
    <div class="grid grid-cols-[3fr_1fr] items-center px-2 py-1 box-border relative z-10">
      <MusicInfo
        :imgSize="12"
        :animation="false"
        class="flex flex-1 justify-start items-center"
      />
      <!-- <PlaybuttonBatch class="flex flex-1 items-center justify-center" /> -->
      <div @click.stop class="flex gap-2 flex-1 justify-end items-center">
        <PlayToggle class="mr-2" />
        <!-- <PlayTime class="mr-2 text-xs" /> -->
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
import PlayToggle from "@/components/playercontroller/buttons/PlayToggle.vue";
import { useUiStore } from "@/stores/uiStore";

const uiStore = useUiStore();
</script>

<style scoped>
.slider {
  position: absolute;
  top: calc(0% - 8px);
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
