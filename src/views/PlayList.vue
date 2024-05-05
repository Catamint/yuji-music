<template>
    <div class="no-login-box" v-if="player.playlist.length == 0">
      <n-empty size="large" description="空空如也">
        <template #icon>
          <n-icon>
            <TextBulletListSquare24Filled />
          </n-icon>
        </template>
        <!-- <template #extra>
          <n-button @click="gotoLogin" size="small">
            登录
          </n-button>
        </template> -->
      </n-empty>
    </div>
    <template v-else>
      <PlayListContent class="item" v-for="info in player.playlist" :music_info="info" :key="info.hash" />
    </template>
</template>

<script>
import PlayListContent from "@/components/public/PlayListContent.vue";
import { player } from "../stores/player";
import { TextBulletListSquare24Filled } from "@vicons/fluent";
import { NButton, NEmpty, NIcon } from 'naive-ui';

export default {
  name: 'PlayList',
  components: {
    PlayListContent,
    TextBulletListSquare24Filled,
    NEmpty,
    NIcon,
    NButton
  },
  data() {
    return{
        player
    }
  },
  mounted(){
    // console.log(this.player);
  },
  methods:{
    // play()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    display: flex;
    height: 100%;
    border: 50px;
    border-radius: 10px;
    /* background-color: rgba(0,0,0,0.5); */
    justify-content: center;
}
.no-login-box {
  display: flex;
  height: 60vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
