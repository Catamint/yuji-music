<template>
    <div class="absolute flex h-full w-full items-center justify-center rounded-lg">
        <div class="absolute block rounded-lg p-5 text-center">
            <h1 class="text-3xl">绑定网易云</h1>
            <div class="mt-5 flex items-center justify-center">
                <input 
                    v-model="username" 
                    type="text" 
                    name="uid" 
                    id="uid" 
                    placeholder="uid"
                    class="h-10 w-[200px] rounded-l-lg border-none px-3 font-bold shadow-md 
                           focus:outline-none focus:shadow-[0_0_10px_0_#616edb]"
                >
                <button 
                    class="h-10 w-15 rounded-r-lg border-none shadow-md bg-gradient-to-r from-[#03a9f4] to-[#03a9f4] 
                               bg-[length:400%_100%] text-white text-xl uppercase hover:before:animate-sun focus:shadow-[0_0_10px_0_#616edb]" 
                    @click="login" 
                    type="primary"
                >
                    OK
                </button>
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
    border-radius: 10px;
    justify-content: center;
    align-items: center;
}
form{
    margin-bottom: 20px;
}

form a{
    color: white;
    text-decoration: none;
}

#type-name{
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
}

.input-model{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

input{
    border-radius: 5px 0 0 5px;
    border: none;
    width: 200px;
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
    height: 40px;
    border-radius: 0 5px 5px 0;
    border: none;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
}


.btn-signup-light{
    margin-top: 10px;
    text-decoration: none;
    border: none;
    font-size: 24px;
    box-shadow: 0px 0px 10px 0px black;
    background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
    background-size: 400%;
    width: 100%;
    height: 45px;
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
