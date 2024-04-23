<template>
    <div class="container">
        <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
        <!-- <router-link to="/">首页</router-link>
        <router-link to="/favorite">收藏</router-link>
        <router-link to="/mv">mv</router-link> -->
        <router-link to="/settings">设置</router-link>
        <router-link to="/play">播放页**</router-link>
        <router-link to="/list">列表**</router-link>
        <router-link to="/playlist">播放列表**</router-link>
    </div>
</template>

<script>
import { h, Component } from "vue";
import { NButton, NIcon, NMenu } from "naive-ui";
import { RouterLink } from "vue-router";
import { Home24Filled, MoviesAndTv24Filled, Star12Regular } from "@vicons/fluent";

function renderIcon (icon) {
    return () => h(NIcon, null, {default: () => h(icon) });
}

const menuOptions = [
    {
        label: () => h(
            RouterLink,
            {
                to: "/"
            },
            { default: () => "首页" }
        ),
        key: "home",
        icon: renderIcon(Home24Filled)
    },{
        label: () => h(
            RouterLink,
            {
                to: "/favorite"
            },
            { default: () => "收藏" }
        ),
        key: "favorite",
        icon: renderIcon(Star12Regular)
    },{
        label: () => h(
            RouterLink,
            {
                to: "/playlist"
            },
            { default: () => "播放列表" }
        ),
        key: "mv",
        icon: renderIcon(MoviesAndTv24Filled)
    }
];

export default {
  name: 'SidebarLayout',
  props: {
    msg: String
  },
  components: {
    NButton,
    NMenu,
    NIcon,
    Home24Filled,
    Star12Regular,
    MoviesAndTv24Filled
  },
  setup(){
    return {
        menuOptions
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    /* border: 50px; */
    border-radius: 10px;
    background-color: rgba(0,0,0,0.5);
}
</style>