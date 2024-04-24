<template>
    <div class="container">
        <div class="col-6">
            <HotSongs />
        </div>
        <div class="col-4">首页</div>
    </div>

</template>

<script>
import HotSongs from "./HotSongs.vue"

export default {
  name: 'Home',
  components: {
    HotSongs
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    display: flex;
    height: 100%;
    border: 50px;
    border-radius: 10px;
    /* background-color: rgba(0,0,0,0.5); */
    justify-content: center;
}
.col-4{
    background-color: rgba(0,0,0,0.5);
    margin: 10px;
    border-radius: 10px;
    width: 40%;
}
.col-6{
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 10px; 
    border-radius: 10px;
    width: 60%;
}
</style>
