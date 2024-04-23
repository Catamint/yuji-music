<template>
    <div class="container">
        <ul>
            <li v-for="item in player.playlist">
            {{item.song_name}}
            <span>播放</span>
            <span>删除</span>
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
    console.log(this.player);
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
