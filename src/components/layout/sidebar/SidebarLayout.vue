<template>
    <div class="container">
        <n-menu :options="menuOptions" @update:value="handleUpdateValue" :default-expanded-keys="defaultExpandedKeys" />
    </div>
</template>

<script>
import { h } from "vue";
import { NButton, NIcon, NMenu } from "naive-ui";
import { RouterLink } from "vue-router";
import { Heart28Filled, Home24Filled, MoviesAndTv24Filled, Star12Regular, TextBulletListSquare24Filled } from "@vicons/fluent";

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
        icon: renderIcon(Heart28Filled)
    },{
        label: () => h(
            RouterLink,
            {
                to: "/playlist"
            },
            { default: () => "播放列表" }
        ),
        key: "playlist",
        icon: renderIcon(TextBulletListSquare24Filled)
    },
    {
        label: "音乐工坊",
        key: "create",
        icon: renderIcon(TextBulletListSquare24Filled),
        children: [
            {
                label: () => h(
                    RouterLink,
                    {
                        to: "/piano"
                    },
                    { default: () => "钢琴" }
                ),
                key: "piano",
                icon: renderIcon(TextBulletListSquare24Filled)
            },{
                label: () => h(
                    RouterLink,
                    {
                        to: "/drum"
                    },
                    { default: () => "鼓" }
                ),
                key: "drum",
                icon: renderIcon(TextBulletListSquare24Filled)
            },{
                label: () => h(
                    RouterLink,
                    {
                        to: "/guitar"
                    },
                    { default: () => "吉他" }
                ),
                key: "guitar",
                icon: renderIcon(TextBulletListSquare24Filled)
            }
        ]
    },
    {
        label: () => h(
            RouterLink,
            {
                to: "/together"
            },
            { default: () => "音乐共创" }
        ),
        key: "ChooseTeam",
        icon: renderIcon(TextBulletListSquare24Filled)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: "/generate"
            },
            { default: () => "音乐生成" }
        ),
        key: "音乐生成",
        icon: renderIcon(TextBulletListSquare24Filled)
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
    MoviesAndTv24Filled,
    Heart28Filled,
    TextBulletListSquare24Filled
  },
  setup(){
    return {
        menuOptions,
        defaultExpandedKeys: ["create"]
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
    /* padding: 1%; */
    width: 18%;
    min-width: 160px;
    max-width: 230px;
    height: 100%;
    /* border: 50px; */
    border-radius: 10px;
    /* background-color: rgba(0,0,0,0.5); */
}
</style>