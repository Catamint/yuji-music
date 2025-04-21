<template>
    <div class="player">
        <music-info />
        <PlayerController />
        <router-link to="/playlist">
            <n-button round style="">
                <template #icon>
                    <n-icon><TextBulletListLtr24Filled /></n-icon>
                </template>
                播放列表
            </n-button>
        </router-link>
        <!-- <button>播放列表</button> -->
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import PlayerController from './PlayerController.vue';
import MusicInfo from './MusicInfo.vue';
import { TextBulletListLtr24Filled } from '@vicons/fluent/lib';
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
        NIcon
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
</style>