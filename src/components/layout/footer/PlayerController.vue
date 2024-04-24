<template>
    <div class="container">
        <n-icon size="32" @click="player.play_prev()">
            <Previous32Filled />
        </n-icon>
        <n-icon v-if="player.is_playing" size="40" @click="playOrPause">
            <Pause48Filled />
        </n-icon>
        <n-icon v-else size="40" @click="playOrPause">
            <Play32Filled />
        </n-icon>
        <n-icon size="32" @click="player.play_next()">
            <Next32Filled />
        </n-icon>
        <h3>00:00</h3>
        <audio autoplay controls @play="starting" @pause="pausing" @ended="onEnded" :src="get_current_url" ref="audio"></audio>
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
  mounted(){
    
  },
  methods:{
    // 用player控制dom播放/暂停
    playOrPause(){
        if(this.player.is_playing){
            // console.log(this.$refs.audio.value)
            this.$refs.audio.pause();
            // this.player.set_pause(); //弃用，已改为绑定dom事件实现
        }else{
            if(this.player.playlist.length != 0){
                this.$refs.audio.play(); //如果播放列表中有歌曲
            }
            // this.player.set_play();
        }
    },
    // 当dom的状态改变，让player的状态跟着改变
    starting(){
        this.player.set_play();
    },
    pausing(){
        this.player.set_pause();
    },
    onEnded(){
        this.player.end_and_next();
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
