<template>
    <div class="no-login-box" v-if="player.state.playlist.length == 0">
      <n-empty size="large" description="空空如也">
        <template #icon>
          <n-icon>
            <TextBulletListSquare24Filled />
          </n-icon>
        </template>
      </n-empty>
    </div> 
    <template v-else>
      <n-scrollbar>
        <PlayListItem class="item" v-for="info in player.state.playlist" :music_info="info" :key="info.id" />
      </n-scrollbar>
    </template>
</template>

<script> 
import PlayListItem from "@/components/public/PlayListItem.vue";
import player2 from "../stores/player2";
import { TextBulletListSquare24Filled } from "@vicons/fluent";
import { NButton, NEmpty, NIcon, NScrollbar } from 'naive-ui';

export default {
  name: 'PlayList',
  components: {
    PlayListItem,
    TextBulletListSquare24Filled,
    NEmpty,
    NIcon,
    NButton,
    NScrollbar
  },
  data() {
    return{
        player:player2,
    }
  },
  mounted(){
    console.log(this.player.state);
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
