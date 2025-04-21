<template>
    <div class="container">
        <div style="height: 100%; padding: 10px">
            <img v-if="playlistNotNull" style="height: 100%; border-radius: 10px; " :src="songOnPlay.album_img" alt="">
        </div>
        <div>
            <h3>{{ playlistNotNull ? songOnPlay.song_name : "正在播放" }}</h3>
        <p>
            <span>{{ playlistNotNull ? songOnPlay.author_name : "歌手" }}</span>
            <!-- <span>{{ playlistNotNull ? songOnPlay.album_name : "专辑" }}</span> -->
        </p>
        </div>
        <n-button round style="font-size: 18px; margin-left: 5px;">
            <template #icon>
                <n-icon><Heart28Regular /></n-icon>
            </template>
        </n-button>
        <n-button round style=" margin-left: 5px;" 
        @click="utils.play_component.showing ? utils.play_component.hide() : utils.play_component.show()">
            <template #icon>
                <n-icon><ChevronDoubleUp16Filled /></n-icon>
            </template>
            详情页
        </n-button>
        <!-- <button @click="utils.play_component.show()">播放详情页</button> -->
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import { player } from "@/stores/player";
import { Heart28Regular, ChevronDoubleUp16Filled } from '@vicons/fluent/lib';
import { NButton, NIcon } from 'naive-ui';

export default {
    name: 'FooterLayout',
    props: {
    msg: String
  },
    components:{
        Heart28Regular,
        NButton,
        NIcon,
        ChevronDoubleUp16Filled
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
    height: 100%;
    border-radius: 20px;
    min-width: 100px;
}
</style>