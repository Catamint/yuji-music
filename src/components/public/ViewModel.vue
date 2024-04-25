<template>
  <div class="model">
    <div class="col">

    </div>
  </div>
</template>

<script>
// import HotSongs from "./HotSongs.vue"

export default {
  name: 'ViewModel',
  components: {

  },
  data(){
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.model{
  position: relative;
  top:0;
  bottom:0;
  width: 100%;
}
.col{
    display: block;
    box-sizing: border-box;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.352);
    padding: 20px; 
    /* border-radius: 20px; */
    border-top-left-radius: 20px;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: auto;
}
</style>
