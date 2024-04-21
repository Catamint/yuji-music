<template>
    <div class="player">
        <h3>正在播放</h3>
        <PlayerController />
        <h3>00:00</h3>
    </div>
</template>

<script>
import PlayerController from './PlayerController.vue';

export default {
    name: 'FooterLayout',
    props: {
    msg: String
  },
    components:{
        PlayerController
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