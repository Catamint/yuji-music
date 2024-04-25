<template>
    <div class="player">
        <h2>雨霁音乐</h2>
        <n-input v-model:value="value" round type="text" placeholder="搜索" />
        <div>
            <router-link to="/settings"><n-button>设置</n-button></router-link>
            <n-button>登录</n-button></div>
    </div>
</template>

<script>
import { NButton, NInput } from 'naive-ui';
import { RouterLink } from 'vue-router';

export default {
    name: 'HeaderLayout',
    props: {
    msg: String
  },
    components:{
        NInput,
        NButton,
        RouterLink
    }
}
</script>

<style scoped>
.player{
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    display: inline-flex;
    justify-content:space-between;
    align-items: center;
    height: 10%;
    border-radius: 20px;
    width: 100%;
}
.n-input{
    display: inline-flex;
    align-items: center;
    width: 40%;
    max-width: 200px;
    height: 80%;
    max-height: 34px;
}
</style>