<template>
    <div class="container">
      <button @click="utils.play_component.hide()">close</button>
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import PlayerController from './layout/footer/PlayerController.vue';

export default {
  name: 'Play',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    /* display: flex; */
    position: fixed;
    bottom:0;
    height: 100%;
    width: 100%;
    /* border: 50px; */
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    justify-content: center;
    z-index: 9;
}
</style>
