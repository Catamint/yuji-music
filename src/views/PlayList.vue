<template>

      <PlayListContent class="item" v-for="info in player.playlist" :music_info="info" :key="info.hash" />
        <!-- <ul>
            <li v-for="item in player.playlist" :key="item.hash">
            {{item.song_name}}
            <span @click="player.play_in_playlist(item.hash)" >播放 </span>
            <span @click="player.del_from_list(item.hash)">删除 </span>
            {{item.playing}}
            </li>
        </ul> -->

</template>

<script>
import PlayListContent from "@/components/public/PlayListContent.vue";
import { player } from "../stores/player";

export default {
  name: 'PlayList',
  components: {
    PlayListContent
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
</style>
