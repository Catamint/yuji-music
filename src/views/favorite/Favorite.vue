<template>
    <div class="container">
        <div class="col-3"></div>
        <div class="col-7"></div>
    </div>

</template>

<script>
export default {
  name: 'Favorite',
  props: {
    msg: String
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
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
}
.col-3{
    background-color: rgba(0,0,0,0.5);
    margin: 50px;
    border-radius: 10px;
    width: 30%;
}
.col-7{
    background-color: rgba(0,0,0,0.5);
    margin: 50px;
    border-radius: 10px;
    width: 70%;
}
</style>
