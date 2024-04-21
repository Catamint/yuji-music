<template>
    <div class="container">
        <router-link to="/">首页</router-link>
        <router-link to="/favorite">收藏</router-link>
        <router-link to="/mv">mv</router-link>
    </div>
</template>

<script>
export default {
  name: 'SidebarLayout',
  props: {
    msg: String
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