<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {ref} from 'vue';


console.log(localStorage.getItem('uid'))
let uid
if(localStorage.getItem('uid') == 'null'){
    localStorage.setItem('uid','21106')
    uid = '21106'
}
else{
    uid = localStorage.getItem('uid')
}

function changeUid(){
    let v = document.getElementById('uid').value
    localStorage.uid = v
    console.log(localStorage.getItem('uid'))
}

</script>

<template>
    <div class="nav">
        <RouterLink to="/piano" active-class="active">钢琴</RouterLink>
        <RouterLink to="/guitar" active-class="active">吉他</RouterLink>
        <RouterLink to="/drum" active-class="active">架子鼓</RouterLink>
        <RouterLink to="/together" active-class="active">音乐共创</RouterLink>
        <RouterLink to="/music_generate" active-class="active">音乐生成</RouterLink>
        <RouterLink to="/#" active-class="active">敬请期待</RouterLink>
        <RouterLink to="/admin" active-class="active">数据库可视化管理</RouterLink>
        <input @change="changeUid" type="text" name="" id="uid" :value="uid">
    </div>

</template>

<style scoped>
    .nav{
        box-shadow: 1px 1px 10px black;
        
    }

    .nav a{
        font-size: 40px;
        padding: 10px;
        margin: 10px;
        
    }

    a{
        color: rgb(129, 116, 116);
        text-decoration: none;
    }

    .nav a:hover{
        color: black;
    }

    .active{
        color: black;
    }

    .split{
        margin: 10px;
        width: 1px;
        /* height: 300px; */
        height: 30px;
        padding: 0;

    }
</style>