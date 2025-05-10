<template>
    <div class="player">
        <music-info />
        <PlayerController />
        <n-button text style="font-size: 32px;">
            <n-icon><Heart28Regular /></n-icon>
        </n-button>
        <router-link class="playlist-link" to="/playlist">
            <n-button text style="font-size: 32px">
                    <n-icon><TextBulletListLtr24Filled /></n-icon>
            </n-button>
        </router-link>
        <!-- <button>播放列表</button> -->
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import PlayerController from './PlayerController.vue';
import MusicInfo from './MusicInfo.vue';
import { TextBulletListLtr24Filled, Heart28Regular } from '@vicons/fluent/lib';
import { NButton, NIcon } from 'naive-ui';

export default {
    name: 'FooterLayout',
    props: {
    msg: String
  },
    components:{
        PlayerController,
        MusicInfo,
        TextBulletListLtr24Filled,
        NButton,
        NIcon,
        Heart28Regular
    },
    data(){
        return {
            utils
        }
    }
}
</script>

<style scoped>
.player{
    box-sizing: border-box;
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
    height: 80px;
    border: 2px;
    border-color: #ffffff29;
    border-radius: 14px;
    /* border-top-right-radius: 20px; */
    /* width: 100%; */
    z-index: 10;
}
.playlist-link {
    display: flex;
    align-items: center;
}
</style>