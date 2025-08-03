<template>
  <PlaySlider class="slider" />

  <div class="container w-full playbutton-container">
    <n-icon class="playbutton" size="28" @click="player2.prev()">
      <Previous32Filled />
    </n-icon>
    <n-icon class="playbutton" size="36" @click="player2.toggle()">
      <Pause48Filled v-if="player2.state.isPlaying" />
      <Play32Filled v-else />
    </n-icon>
    <n-icon class="playbutton" size="28" @click="player2.next()">
      <Next32Filled />
    </n-icon>
  </div>

  <div class="flex justify-center content-center space-x-4">
    <span class="time"
      >{{ currentMinSec(player2.state.currentTime) }} /
      {{ currentMinSec(player2.state.duration) }}</span
    >
    <PlayModeButton />
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button
          class="playbutton"
          text
          style="font-size: 24px"
          @click="player2.setMode(getNextMode(player2.state.mode))"
        >
          <n-icon v-if="player2.state.mode === PlayMode.SEQUENTIAL">
            <ArrowSync24Filled />
          </n-icon>
          <n-icon v-else-if="player2.state.mode === PlayMode.RANDOM">
            <ArrowRotateCounterclockwise24Filled />
          </n-icon>
          <n-icon v-else>
            <Pause48Filled />
          </n-icon>
          <!-- 顺序/随机/单曲循环 -->
        </n-button>
      </template>
      {{
        player2.state.mode === PlayMode.SEQUENTIAL
          ? "列表循环"
          : player2.state.mode === PlayMode.RANDOM
          ? "随机播放"
          : "单曲循环"
      }}
    </n-tooltip>
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
import {
  Previous32Filled,
  Next32Filled,
  Play32Filled,
  Pause48Filled,
  ArrowSync24Filled,
  ArrowRotateCounterclockwise24Filled,
  TextBulletListLtr24Filled,
  Heart28Regular,
} from "@vicons/fluent";
import { NIcon, NSlider, NButton, NTooltip } from "naive-ui";
import player2, { PlayMode } from "@/stores/player2";
import PlaySlider from "../playercontroller/PlaySlider.vue";
import PlayModeButton from "../playercontroller/buttons/PlayMode.vue";
export default {
  name: "player2Controller",
  components: {
    NIcon,
    Previous32Filled,
    Next32Filled,
    Pause48Filled,
    Play32Filled,
    ArrowSync24Filled,
    ArrowRotateCounterclockwise24Filled,
    TextBulletListLtr24Filled,
    Heart28Regular,
    PlaySlider,
    PlayModeButton,
  },
  data() {
    return {
      player2,
      PlayMode,
    };
  },
  mounted() {},
  methods: {
    // 获取下一个播放模式
    getNextMode(currentMode) {
      const modes = [PlayMode.SEQUENTIAL, PlayMode.RANDOM, PlayMode.REPEAT_ONE];
      const idx = modes.indexOf(currentMode);
      return modes[(idx + 1) % modes.length];
    },
    currentMinSec(SecTime) {
      let min = parseInt(SecTime / 60).toString();
      let sec = parseInt(SecTime % 60);
      if (sec < 10) sec = "0" + sec;
      return min + ":" + sec;
    },
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
.time {
  /* font-size: 20px; */
  color: #afafaf;
}
.playbutton-container {
  position: absolute;
  z-index: 1;
  /* padding-inline: 14px; */
  width: 100%;
  box-sizing: border-box;
  pointer-events: none; /* 禁止鼠标事件 */
}
.playbutton:hover {
  background-color: #ffffff69;
  cursor: pointer;
  padding: 5px;
}
.playbutton {
  transition: all 0.3s ease;
  border-radius: 50%;
  padding: 2px;
  z-index: 2;
  pointer-events: auto; /* 恢复鼠标事件 */
}
</style>
