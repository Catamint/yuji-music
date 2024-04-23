<template>
    <div class="player">
        <h3>正在播放</h3>
        <PlayerController />
        <h3>00:00</h3>
        <button @click="utils.play_component.show()">播放详情页</button>
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import PlayerController from './PlayerController.vue';

export default {
    name: 'FooterLayout',
    props: {
    msg: String
  },
    components:{
        PlayerController
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
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.7);
    height: 80px;
    border-radius: 20px;
    width: 100%;
}
</style>