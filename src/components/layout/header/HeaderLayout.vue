<template>
    <div class="player">
        <h2>player</h2>
    </div>
</template>

<script>
export default {
    name: 'HeaderLayout',
    props: {
    msg: String
  }
}
</script>

<style scoped>
.player{
    display: flex;
    justify-content: center;
    background-color: rgba(0,0,0,0.7);
    height: 10%;
    border-radius: 20px;
    width: 100%;
}
</style>