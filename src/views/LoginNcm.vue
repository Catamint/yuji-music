<template>
    <div class="container">
        <div id="content">
            <span id="type-name">绑定网易云</span>
            <div style="margin-top: 20px;">
                <form style="display: flex; justify-content: center; align-items:center; " action="#" method="post" id="info">
                    <input v-model="username" class="info-input" type="text" name="uid" id="uid" placeholder="uid">
                    <n-button class="btn-signup" @click="login" type="primary">OK</n-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import { NButton } from 'naive-ui';
import querystring from 'querystring';

export default {
    name: 'LoginNcm',
    data(){
        return {
            username : '',
            pwd : '',
            utils,
            // onError: false,
            // user_default
        }
    }, 
    mounted(){

    },
    components:{
        NButton
    },
    methods:{
        login(){
            this.utils.user_config.login(this.username, "netease");
            this.$router.push({ path: '/favorite'});
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    /* border: 50px; */
    border-radius: 10px;
    /* background-color: rgba(255, 255, 255, 0.5); */
    justify-content: center;
    align-items: center;
    /* z-index: 9; */
}
form{
    margin-bottom: 20px;
}

form a{
    color: white;
    text-decoration: none;
}

#type-name{
    /* color: aliceblue; */
    font-size: 30px;
}

#change-type{
    color: white;
    font-weight: bolder;
    font-size: large;
    margin-top: 10px;
}

#change-type a{
    text-decoration: underline;
    color: white;
    
}

#content{
    display: block;
    position: absolute;
    justify-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    /* background-color: rgba(255, 255, 255, 0.5); */
    /* box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3); */
}

input{
    border-radius: 5px 0 0 5px;
    border: none;
    width: 200px;
    /* margin-bottom: 5px; */
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    padding: 10px;
    height: 40px;
    font-weight: bold;
}

input:focus{
    outline: 0;
    box-shadow: 0px 0px 10px 0px #616edb;
}

.btn-signup{
    /* margin-top: 10px; */
    /* width: 100%; */
    height: 40px;
    border-radius: 0 5px 5px 0;
    border: none;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
    /* color: #D9D9D9; */
    /* background-color: #7F7F7F; */
    /* font-size: 24px; */
}


.btn-signup-light{  /*去掉下划线*/
    margin-top: 10px;
    text-decoration: none;  
    /* position: absolute; */
    /* left: 50%;
    top: 50%; */
    /* transform: translate(-50%,-50%); */
    /* 设置字体大小 */
    border: none;
    font-size: 24px;
    box-shadow: 0px 0px 10px 0px black;;
    background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
    background-size: 400%;
    width: 100%;
    height: 45px;
    /* line-height: 100px; */
    text-align: center;
    color: #fff;
    /* 字母变大写 */
    text-transform: uppercase;
    /* 设置成胶囊状 */
    border-radius: 5px;
    z-index: 1;
}
/* 设置发光 */
.btn-signup-light::before{
    content: "";
    /* position: absolute; */
    /* left: -5px;
    right: -5px;
    top: -5px;
    bottom: -5px; */
    background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
    background-size: 400%;
    border-radius: 50px;
    filter: blur(20px);
    z-index: -1;
}
.btn-signup-light:hover::before{
    animation: sun 8s infinite;
}
.btn-signup-light:hover{
    animation: sun 8s infinite;
}
/* 设置流光 */
@keyframes sun{
    100%{
        background-position: -400% 0;
    }
}

#b2,#b1{
    float: left;
    margin: 30px;
}

#change-type-box{
    margin-top: 20px;
}

.message-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    /* background-color: rgba(0, 0, 0, 0.8); */
    color: white;
    border-radius: 10px;
    opacity: 1;
    transition: opacity 5s ease; /* 设置透明度渐变的过渡效果 */
    pointer-events: none; /* 禁止交互，使其不会影响其他元素 */
    z-index: 10;
  }

  /* 当透明度为0时隐藏提示框 */
  .message-box.hidden {
    opacity: 0;
    pointer-events: none;
  }
</style>
