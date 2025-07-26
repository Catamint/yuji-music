<template>
    <div class="container">
        <div class="line">
            <div style="height: 100%; padding: 10px">
                <img v-if="playlistNotNull" style="height: 100%; border-radius: 10px; " :src="songOnPlay.album_img" alt="">
            </div>
            <div>
                <h1 style="white-space: nowrap;">{{ playlistNotNull ? songOnPlay.song_name : "正在播放" }}</h1>
                <p>
                    <span  style="white-space: nowrap;">{{ playlistNotNull ? songOnPlay.author_name : "歌手" }}</span>
                    <!-- <span>{{ playlistNotNull ? songOnPlay.album_name : "专辑" }}</span> -->
                </p>
            </div>
        </div>
        <div>
            <n-button round style="font-size: 18px; margin-left: 5px;">
                <template #icon>
                    <n-icon><Heart28Regular /></n-icon>
                </template>
            </n-button>
            <n-button round style="font-size: 18px; margin-left: 5px;">
                <template #icon>
                    <n-icon><Heart28Regular /></n-icon>
                </template>
            </n-button>
            <n-button round style="font-size: 18px; margin-left: 5px;">
                <template #icon>
                    <n-icon><Heart28Regular /></n-icon>
                </template>
            </n-button>
        </div>
    </div>
</template>

<script>
import { player } from '@/stores/player';
import { utils } from '@/stores/utils';
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
            return this.player.playlist.at(this.player.currentIndex);
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: rgba(255, 255, 255, 0.3); */
    height: 100%;
    border-radius: 20px;
    margin: 20px;
    /* width: 100%; */
}
.line{
  /* min-height: 30%; */
  min-width: fit-content ;
  display: flex;
  margin-bottom: 40px;
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
}
</style>