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
      <n-divider vertical style="height:80%;" />
    </div>
    <div></div>
  </div>
</template>

<script>
import PlayerController from '@/components/layout/footer/PlayerController.vue';
import { utils } from '@/stores/utils';
import MusicInfo from './MusicInfo.vue';
import { NButton, NDivider, NIcon } from 'naive-ui';
import { ChevronDoubleDown16Filled } from '@vicons/fluent';

export default {
  name: 'Play',
  data() {
    return {
      utils
    }
  },
  components:{
    MusicInfo,
    NDivider,
    PlayerController,
    ChevronDoubleDown16Filled,
    NButton,
    NIcon
  }
}
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
.line{
  min-height: 40%;
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
}
</style>
