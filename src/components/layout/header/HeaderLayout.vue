<template>
    <div class="player">
        <p>player</p>
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
    align-content: center;
    justify-content: center;
    background-color: white;
    height: 80px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
}
</style>