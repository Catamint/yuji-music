<template>
    <div class="container">
        <div style="height: 100%;">
            <img style="height: 100%;" src="../../../assets/image/default_covor.jpg" alt="">
        </div>
        <div>
            <h3>{{ playlistNotNull ? songOnPlay.song_name : "正在播放" }}</h3>
        <p>
            <span>{{ playlistNotNull ? songOnPlay.author_name : "歌手" }}</span> · 
            <span>{{ playlistNotNull ? songOnPlay.album_name : "专辑" }}</span>
        </p>
        </div>
        <button @click="utils.play_component.show()">播放详情页</button>
        <button>收藏</button>
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import { player } from "../../../stores/player";

export default {
    name: 'FooterLayout',
    props: {
    msg: String
  },
    components:{
    },
    data(){
        return {
            utils,
            player
        }
    },
    computed: {
        songOnPlay(){
            return this.player.playlist.at(this.player.current);
        },
        playlistNotNull(){
            return this.player.playlist.length != 0;
        }
    }
}
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.3);
    height: 100%;
    border-radius: 20px;
    min-width: 100px;
}
</style>