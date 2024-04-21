<template>
    <div class="player">
        <h2>player</h2>
        <n-input v-model:value="value" type="text" placeholder="搜索" />
    </div>
</template>

<script>
import { NInput } from 'naive-ui';

export default {
    name: 'HeaderLayout',
    props: {
    msg: String
  },
    components:{
        NInput
    }
}
</script>

<style scoped>
.player{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.7);
    height: 10%;
    border-radius: 20px;
    width: 100%;
}
.n-input{
    display: inline-flex;
    align-items: center;
    width: 40%;
    height: 80%;
    max-height: 50px;
}
</style>