<template>
    <div class="player">
        <p>player</p>
    </div>
</template>

<script>
export default {
    name: 'PlayerControl',
    props: {
    msg: String
  }
}
</script>

<style>
.player{
    display: flex;
    width: 100%;
    align-content: center;
    background-color: gray;
    position: absolute;
    bottom: 0;
}
</style>