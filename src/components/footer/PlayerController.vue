<template>
  <PlaySlider class="slider" />

  <PlaybuttonBatch />

  <div class="flex justify-center items-center space-x-4">
    <PlayTime />
    <PlayModeButton />
    <!-- <n-slider style="width: 100px; margin-left: 10px;" :tooltip="false" /> -->
    <n-button class="playbutton" text style="font-size: 24px">
      <n-icon><Heart28Regular /></n-icon>
    </n-button>
    <router-link class="playlist-link" to="/playlist">
      <n-button class="playbutton" text style="font-size: 24px">
        <n-icon><TextBulletListLtr24Filled /></n-icon>
      </n-button>
    </router-link>
  </div>
</template>

<script>
import { TextBulletListLtr24Filled, Heart28Regular } from "@vicons/fluent";
import { NIcon, NButton } from "naive-ui";
import player2, { PlayMode } from "@/stores/player2";
import PlaySlider from "../playercontroller/PlaySlider.vue";
import PlayModeButton from "../playercontroller/buttons/PlayMode.vue";
import PlaybuttonBatch from "../playercontroller/buttons/PlaybuttonBatch.vue";
import PlayTime from "../playercontroller/PlayTime.vue";
export default {
  name: "player2Controller",
  components: {
    NIcon,
    TextBulletListLtr24Filled,
    Heart28Regular,
    PlaySlider,
    PlayModeButton,
    PlaybuttonBatch,
    PlayTime,
  },
  data() {
    return {
      player2,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  height: 100%;
  /* width: 50%; */
  /* border: 50px; */
  border-radius: 10px;
  /* background-color: rgba(255, 255, 255, 0.3); */
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.slider {
  position: absolute;
  top: calc(0% - 8px);
  left: 0;
  right: 0;
  padding-inline: 14px;
  width: 100%;
  box-sizing: border-box;
  /* margin-left: 10px; */
}
.playlist-link {
  display: flex;
  align-items: center;
}
</style>
