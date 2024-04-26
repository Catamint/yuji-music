<template>
    <div class="player">
        <music-info />
        <PlayerController />
        <n-button circle style="font-size: 30px">
            <template #icon>
                <n-icon><TextBulletListLtr24Filled /></n-icon>
            </template>
        </n-button>
        <!-- <button>播放列表</button> -->
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import PlayerController from './PlayerController.vue';
import MusicInfo from './MusicInfo.vue';
import { TextBulletListLtr24Filled } from '@vicons/fluent/lib';

export default {
    name: 'FooterLayout',
    props: {
    msg: String
  },
    components:{
        PlayerController,
        MusicInfo,
        TextBulletListLtr24Filled
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
    /* padding-left: 20px; */
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
    height: 80px;
    border-radius: 20px;
    width: 100%;
}
</style>