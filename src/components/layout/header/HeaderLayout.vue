<template>
    <div class="player">
        <h2>烟火音乐</h2>
        <n-input v-model:value="value" round type="text" placeholder="搜索" />
        <n-button>设置</n-button>
        <n-button>登录</n-button>
    </div>
</template>

<script>
import { NButton, NInput } from 'naive-ui';

export default {
    name: 'HeaderLayout',
    props: {
    msg: String
  },
    components:{
        NInput,
        NButton
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
    max-width: 200px;
    height: 80%;
    max-height: 34px;
}
</style>