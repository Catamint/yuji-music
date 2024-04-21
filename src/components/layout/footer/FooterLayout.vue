<template>
    <div class="player">
        <PlayerController />
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
    background-color: rgba(0,0,0,0.7);
    height: 80px;
    border-radius: 20px;
    width: 100%;
}
</style>