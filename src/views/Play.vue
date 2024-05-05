<template>
  <div class="container">
    <button @click="utils.play_component.hide()">close</button>
  </div>
</template>

<script>
import PlayerController from '@/components/layout/footer/PlayerController.vue';
import { utils } from '@/stores/utils';

export default {
  name: 'Play',
  components: {
    PlayerController
  },
  data() {
    return {
      utils
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  backdrop-filter: blur(20px);
  height: 100%;
  width: 100%;
  border-radius: 10px;
  justify-content: center;
  z-index: 9;
}
</style>
