<template>
    <div class="container">
        <div v-show="current_login" id="content">
            <span id="type-name">用户登录</span>
            <div><img class="round_icon" id="login_icon" src="" alt=""></div>
            <form action="#" method="post" id="info">
                <input v-model="username" class="info-input" type="text" name="uid" id="uid" placeholder="账号">
                <input v-model="pwd" class="info-input" type="password" name="password" id="password" placeholder="密码">
                <p v-show="onError" style="color: red;">账号或密码错误</p>
            </form>
            <n-button @click="login" type="primary" style="width: 80%; height:45px; ">登录</n-button>
            <p id="change-type">还没有账号?<a @click="current_login = false">点击注册</a></p>
        </div>
        <div v-show="!current_login">
            <span id="type-name">用户注册</span>
            <form id="info" enctype="multipart/form-data">
                <div>
                    <div id="b1">
                        <a onclick="" id="avator-upload">
                            <input name="avator" id="avator" type="file" style="display: none">
                            <img class="round_icon" id="signup_icon" src="" alt="">
                        </a>
                        <div id="change-type-box">
                            <span id="change-type">已经有账号?<a @click="current_login = true" >点击登录</a></span>
                        </div>
                    </div>
                    <div id="b2">
                        <div>
                            <input class="info-input" type="text" name="uid" id="uid" placeholder="账号">
                            <input class="info-input" type="username" name="username" id="username" placeholder="昵称">
                        </div>
                        <div>
                            <input class="info-input" type="password" name="pw" id="pw" placeholder="密码">
                            <input class="info-input" type="password" name="cpw" id="cpw" placeholder="确认密码">
                        </div>
                        <div>
                            <button id="btn-sumit" disabled class="btn-signup">开始音乐之旅吧！</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import { NButton } from 'naive-ui';
import querystring from 'querystring'

// import {user_default} from '../assets/image/user_default.png';

export default {
    name: 'Login',
    data(){
        return {
            username : '',
            pwd : '',
            utils,
            onError: false,
            current_login: true
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
            var url = "/host/login";
            this.$axios.post(url, querystring.stringify({
                    uid: this.username,
                    pw: this.psw
            })).then(res => {
                var data = res.data
                if(data.status == 'true') {
                    this.onError = false;
                    this.utils.uid = uid;
                    this.$router.push({ path: '/'});
                } else {
                    this.onError = true;
                    console.log(data.error);
                }
                console.log(data);
            }).catch(function (error) {
                console.log(error);
            })
        }
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
    color: aliceblue;
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

#login_icon{
    width: 150px;
    height: 150px;
}

#signup_icon{
    width: 150px;
    height: 150px;
}

.round_icon{
    /* display: flex; */
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 5px solid white;
  }

#content{
    display: block;
    position: absolute;
    justify-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
}

input{
    border-radius: 5px;
    border: none;
    height: 30px;
    width: 200px;
    margin: 20px;
    margin-bottom: 5px;
    /* border: 1px solid black; */
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
    padding: 10px;
    /* margin-bottom: 10px; */
    font-weight: bold;
}

.info-input{
    margin: 10px 3px 3px 3px; /* top-buttom left-right */
}

input:focus{
    outline: 0;
    box-shadow: 0px 0px 10px 0px #616edb;
}

.btn-signup{
    margin-top: 10px;
    width: 100%;
    height: 45px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 5px 0px black;
    color: #D9D9D9;
    background-color: #7F7F7F;
    font-size: 24px;
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
    background-color: rgba(0, 0, 0, 0.8);
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
