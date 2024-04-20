<template>
    <div class="player">
        <p>player</p>
    </div>
</template>

<script>
export default {
    name: 'FooterLayout',
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
    height: 80px;
    border-radius: 20px;
    width: 100%;
}
</style>