<template>
    <div class="container">
        <div class="line-4">
        </div>
        <div class="line-6"></div>
    </div>

</template>

<script>

export default {
  name: 'Card',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 50px;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
}
.col-4{
    background-color: rgba(0,0,0,0.5);
    margin: 50px;
    border-radius: 10px;
    height: 40%;
}
.col-6{
    background-color: rgba(0,0,0,0.5);
    margin: 50px;
    border-radius: 10px;
    height: 60%;
}
</style>
