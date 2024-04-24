<template>
    <div class="player">
        <music-info />
        <PlayerController />
        <button>播放列表</button>
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import PlayerController from './PlayerController.vue';
import MusicInfo from './MusicInfo.vue';

export default {
    name: 'FooterLayout',
    props: {
    msg: String
  },
    components:{
        PlayerController,
        MusicInfo
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: rgba(0,0,0,0.7); */
    height: 80px;
    border-radius: 20px;
    width: 100%;
}
</style>