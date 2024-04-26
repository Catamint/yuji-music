<template>
    <div class="player">
        <h1 style="font-weight: bold; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" >雨霁音乐</h1>
        <div style="width: 40%; display: inline-flex; justify-content: end;">
            <n-input-group style="width: 40%; display: inline-flex; justify-content: end;">
                <n-input style="background-color: rgba(255, 255, 255, 0);"
                    v-model:value="kw"  
                    type="text" placeholder="搜索" />
                <n-button ghost @click="search_music"> GO </n-button>
            </n-input-group>
            <NSpace style="padding-left: 20px;">
                <router-link to="/settings"><n-button>设置</n-button></router-link>
                <n-button>登录</n-button>
            </NSpace>
        </div>
    </div>
</template>

<script>
import { NButton, NInput, NSpace, NInputGroup } from 'naive-ui';
import { RouterLink } from 'vue-router';

export default {
    name: 'HeaderLayout',
    props: {
    msg: String
  },
    components:{
        NInput,
        NInputGroup,
        NButton,
        RouterLink,
        NSpace
    },
    mounted(){

    },
    data(){
        return {
            kw: ""
        }
    },
    methods: {
        search_music(){
            this.$router.push({ name: 'listpage', params: {
                    kw: this.kw,
                    page: 1,
                    qurl: '/host/get_search_result'
                }
            });
        }
    }
}
</script>

<style scoped>
.player{
    box-sizing: border-box;
    padding-left: 40px;
    padding-right: 40px;
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