<template>
    <div class="
        bg-white/15 backdrop-blur-3xl border-[#ffffff29]
        flex justify-between items-center m-2.5 p-2.5 h-20 box-border
        rounded-xl relative z-10 border">
        <MusicInfo />
        <PlayerController />
        <!-- <button>播放列表</button> -->
    </div>
</template>

<script>
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
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(140px);
    height: 80px;
    border: 2px;
    border-color: #ffffff29;
    border-radius: 14px;
    z-index: 10;
    position: relative;
    /* bottom: 0; */
}
</style>