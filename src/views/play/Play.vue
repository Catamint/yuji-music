<template>
  <div class="box">
    <n-button round style="" @click="utils.play_component.hide()">
      <template #icon>
        <n-icon><ChevronDoubleDown16Filled /></n-icon>
      </template>
      close
    </n-button>
    <div class="line">
      <MusicInfo />
      <n-divider vertical style="height: 80%" />
      <canvas id="myCanvas"></canvas>
    </div>
    <div></div>
  </div>
</template>

<script>
import PlayerController from "@/components/footer/PlayerController.vue";
import { utils } from "@/stores/utils";
import MusicInfo from "./MusicInfo.vue";
import { NButton, NDivider, NIcon } from "naive-ui";
import { ChevronDoubleDown16Filled } from "@vicons/fluent";

export default {
  name: "Play",
  data() {
    return {
      utils,
      canvas: null,
    };
  },
  mounted() {
    var c = document.getElementById("myCanvas");
    this.canvas = c.getContext("2d");
    let ctx = this.canvas;
    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 250, 20);
  },
  created() {
    console.log("play created");
  },
  components: {
    MusicInfo,
    NDivider,
    PlayerController,
    ChevronDoubleDown16Filled,
    NButton,
    NIcon,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  backdrop-filter: blur(20px);
  height: 100%;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 9;
}
.line {
  min-height: 40%;
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
}
</style>
