<template>
    <div class="container">
        <ul>
            <li v-for="music_detials in player.playlist">
            {{music_detials.song_name}}
            <span @click="player.play_in_playlist()" >播放 </span>
            <span @click="player.del_from_list(music_detials)">删除 </span>
            {{music_detials.playing}}
            <!-- <span @click="">添加到播放列表 </span> -->
            </li>
        </ul>
    </div>

</template>

<script>
import { player } from "../stores/player";

export default {
  name: 'PlayList',
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
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
}
</style>
