<template>
    <div class="container">
        <n-icon size="32">
            <Previous32Filled />
        </n-icon>
        <n-icon v-if="player.is_playing" size="40" @click="playOrPause">
            <Pause48Filled />
        </n-icon>
        <n-icon v-else size="40" @click="playOrPause">
            <Play32Filled />
        </n-icon>
        <n-icon size="32">
            <Next32Filled />
        </n-icon>
        <audio controls :src="get_current_url"></audio>
    </div>

</template>

<script>

import { Previous32Filled, Next32Filled, Play32Filled, Pause48Filled } from "@vicons/fluent";
import { NIcon } from "naive-ui";
import { player } from "../../../stores/player";

export default{
  name: 'PlayerController',
  components: {
    NIcon,
    Previous32Filled,
    Next32Filled,
    Pause48Filled,
    Play32Filled
  },
  data(){
    return {
        player
    }
  },
  methods:{
    playOrPause(event){
        if(this.player.is_playing){
            this.player.is_playing = false;
        }else{
            this.player.is_playing = true;
        }
    }
  },
  computed:{
    get_current_url(){
        if (this.player.playlist.length != 0){
            return this.player.playlist.at(this.player.current).url; //播放列表非空
        }else{
            return "";
        }
    }
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
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
}
</style>
