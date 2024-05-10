<template>
<div class="box">
    <!-- Drum -->
    <section class="main-wrapper glass">
        <div class="drum-kit-wrapper">
          <img class="crash-cymbal" id="crash-ride" :src='crashImg' alt="Crash cymbal">
          <img id="hihat-top" class="hihat-top-cymbal" :src="hihatTopImg" alt="Hi Hat cymbal">
          <div data-key="74" class="key snare">
            <kbd>J</kbd>
          </div>
          <div data-key="66" class="key kick">
            <kbd>B</kbd>
          </div>
          <div data-key="86" class="key kick2">
            <kbd>V</kbd>
          </div>
          <div data-key="72" class="key tom-high">
            <kbd>H</kbd>
          </div>
          <div data-key="71" class="key tom-mid">
            <kbd>G</kbd>
          </div>
          <div data-key="70" class="key tom-low">
            <kbd>F</kbd>
          </div>
          <div data-key="69" class="key crash">
            <kbd>E</kbd>
          </div>
          <div data-key="82" class="key ride">
            <kbd>R</kbd>
          </div>
          <div data-key="73" class="key hihat-open">
            <kbd>I</kbd>
          </div>
          <div data-key="75" class="key hihat-close">
            <kbd>K</kbd>
          </div>
          <img class="drum-kit" :src="drumKitImg" alt="Drum Kit" />
        </div>
      </section>
    <!-- End Drum -->
    
    <audio data-key="74" :src="snareSound"></audio>
    <audio data-key="66" :src="kitSoundsKick"></audio>
    <audio data-key="86" :src="kitSoundsKick"></audio>
    <audio data-key="72" :src="kitSoundsTomHigh"></audio>
    <audio data-key="71" :src="kitSoundsTomMid"></audio>
    <audio data-key="70" :src="kitSoundsTomLow"></audio>
    <audio data-key="69" :src="crashSound"></audio>
    <audio data-key="82" :src="rideSound"></audio>
    <audio data-key="73" :src="hihatOpenSound"></audio>
    <audio data-key="75" :src="hihatCloseSound"></audio>

    <!-- 功能区 -->
    <div class="glass" style="width:100%; margin-top:10px;" v-if="!props.asComponent">
        <div class="message" style="width:100%">
            <span style="margin-left:15px;" id="recordStatus">未在录制</span>
        </div>
        <div class="controls">
            <n-space>
                <n-button type="success" @click="record">录制</n-button>
                <n-button type="error" @click="finishRecord">停止录制</n-button>
                <n-button @click="playRecord">播放录制</n-button>
                <n-button @click="downloadRecord">导出录制文件</n-button>
            </n-space>
            <div>
                <n-button @click="uploadFile">{{ fileName }}</n-button>
                <input type="file" style="display:none;" name="" id="uploadFileBtn" @change="handleUploadFile">
                <n-button style="margin-left:10px;" @click="playMusic(recordFile)">播放上传的录制文件</n-button>
            </div>
            <div>
                播放倍速：{{ times }}<input type="range" v-model="times" max="5" step="1" min="1">
            </div>
        </div>
    </div>
    <div style="margin-left:25px;" v-if="!props.asComponent">
        <!-- <n-button class="function-btn" @click="playMusic(Test)">播放测试文件</n-button> -->
    </div>
</div>
</template>
    
    
<script lang='ts' setup>
    
import {onMounted,nextTick,ref} from 'vue';
import crashImg from '@/music_create/static/images/drum/crash.png';
import hihatTopImg from '@/music_create/static/images/drum/hihat-top.png';
import drumKitImg from '@/music_create/static/images/drum/drum-kit.png';

import snareSound from '@/music_create/static/sounds/drum/snare.wav';
import kitSoundsKick from '@/music_create/static/sounds/drum/kit_sounds_kick.wav';
import kitSoundsTomHigh from '@/music_create/static/sounds/drum/kit_sounds_tom-high.wav';
import kitSoundsTomMid from '@/music_create/static/sounds/drum/kit_sounds_tom-mid.wav';
import kitSoundsTomLow from '@/music_create/static/sounds/drum/kit_sounds_tom-low.wav';
import crashSound from '@/music_create/static/sounds/drum/crash.wav';
import rideSound from '@/music_create/static/sounds/drum/ride.wav';
import hihatOpenSound from '@/music_create/static/sounds/drum/hihat-open.wav';
import hihatCloseSound from '@/music_create/static/sounds/drum/hihat-close.wav';
import { NButton, NInput, NSlider, NFloatButton, NIcon, NSpace } from 'naive-ui'


const props = defineProps({
    asComponent: {
        type: Boolean,
        default: false
    }
});

let downloadFile = '我的演奏'

let keyCodeMap = {
    "J":"74",
    "B":"66",
    "V":"86",
    "H":"72",
    "G":"71",
    "F":"70",
    "E":"69",
    "R":"82",
    "I":"73",
    "K":"75"
}


const animateCrashOrRide = () => {
    crashRide.style.transform = 'rotate(0deg) scale(1.5)'; // ER部分的敲击样式
};

const animateHiHatClosed = () => {
    hiHatTop.style.top = '171px'; // IK部分的敲击样式
};

const playSound = e => {
    const keyCode = e.keyCode,
        keyElement = document.querySelector(`div[data-key="${keyCode}"]`);

    if(!keyElement) return;

    const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
    audioElement.currentTime = 0;
    audioElement.play();

    switch(keyCode) {
        case 69:
        case 82:
            animateCrashOrRide();
            break;
        case 75:
            animateHiHatClosed();
            break;
    }

    keyElement.classList.add(playingClass); // 添加敲击样式
};

const removeCrashRideTransition = e => {
    if(e.propertyName !== 'transform') return;

    e.target.style.transform = 'rotate(-7.2deg) scale(1.5)'; // ER部分敲完后样式回调
};

const removeHiHatTopTransition = e => {
    if(e.propertyName !== 'top') return;

    e.target.style.top = '166px'; // IK部分样式回调
};	

const removeKeyTransition = e => {
    if(e.propertyName !== 'transform') return;

    e.target.classList.remove(playingClass) // 去除按键敲击样式
};



let hiHatTop
let crashRide

const playingClass = 'playing'
window.addEventListener('keydown', playSound);

onMounted(()=>{
    
    crashRide = document.getElementById('crash-ride')
    hiHatTop = document.getElementById('hihat-top')
    const drumKeys = Array.from(document.querySelectorAll('.key'));
    drumKeys.forEach(key => {
        key.addEventListener('transitionend', removeKeyTransition);
    });
    crashRide.addEventListener('transitionend', removeCrashRideTransition);
    hiHatTop.addEventListener('transitionend', removeHiHatTopTransition);
})

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playSoundByKeyCode(keyCode){
    
    let keyElement = document.querySelector(`div[data-key="${keyCode}"]`);

    const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
    audioElement.currentTime = 0;
    audioElement.play();

    switch(keyCode) {
        case 69:
        case 82:
            animateCrashOrRide();
            break;
        case 75:
            animateHiHatClosed();
            break;
    }

    keyElement.classList.add(playingClass); // 添加敲击样式

}


function playMultiKeyCode(keyCodes,wait){
    keyCodes.forEach(keyCode => {
        playSoundByKeyCode(keyCode)
    });
}

let isRecording = false
let times = ref(1)
let recordFile
let recordData = []

import Test from '@/music_create/static/music/drum/测试.json';

async function playMusic(file){
    console.log('@@@',file[0]['keyCode'])
    for(let i = 0;i<file.length;i++){
        await playMultiKeyCode(file[i]['keyCode'],file[i]['wait'])
        await delay(file[i]['wait'] * 1000 / times.value)
    };

}

var fileName = ref("上传文件")
function handleUploadFile(event){
    const target = event.target as HTMLInputElement;
      const file = target.files?.[0]; // 获取上传的文件
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        try {
          const jsonData = JSON.parse(result); // 解析 JSON 文件内容
          // 处理 JSON 数据，例如保存到组件的 data 中或发送到服务器等
          recordFile = jsonData
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      fileName.value = file.name;
      reader.readAsText(file); // 以文本格式读取文件内容
    }

function uploadFile(){
    document.getElementById('uploadFileBtn').click()
}

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if(isRecording){
        if(key.toUpperCase() in keyCodeMap){
            recordData.push({'key':key,'time':getTimeNow(),'keyCode':keyCodeMap[key.toUpperCase()]})
        }
    }
})

function  getTimeNow() {
    var date = new Date();
    var timeStamp = date.getTime()
    return timeStamp
};



function record(){
    recordData = [];
    isRecording = true;
    document.getElementById('recordStatus').innerHTML = '正在录制'
}

function finishRecord(){
    isRecording = false;
    console.log(recordData)
    document.getElementById('recordStatus').innerHTML = '未在录制'
}

function playRecord(){
    document.getElementById('recordStatus').innerHTML = '播放录制中'
    record = recordToMusic(recordData)
    playMusic(record)
}

function recordToMusic(data){
    let record = []
    for(let i =0;i<data.length;i++){
        let wait
        if(i == data.length - 1){
            wait = 0.5
        }
        else{
            wait = (data[i + 1]['time'] - data[i]['time']) / 1000
        }
            
        record.push({
            'key':[data[i]['key']],
            'wait':wait,
            'keyCode':[data[i]['keyCode']]
        })
    }
    return record
}

function downloadRecord(){
    let record = recordToMusic(recordData)
    // 要导出的对象
    const data = record

    // 将对象转换为 JSON 字符串
    const jsonData = JSON.stringify(data);

    // 创建 Blob 对象
    const blob = new Blob([jsonData], { type: "application/json" });

    // 创建下载链接
    const url = URL.createObjectURL(blob);

    // 创建下载按钮
    const downloadButton = document.createElement('a');
    downloadButton.href = url;
    downloadButton.download = downloadFile; // 下载文件的名称
    downloadButton.click()

}

</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Handlee|Pacifico);

.box{
    width:100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    display:flex; 
    flex-direction: column;
    justify-content: center;
    /* align-items:center; */
}

.glass{
    /* padding: 40px; */
    /* padding-left: 80px; */
    /* padding-right: 80px; */
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.2);
    /* box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2); */
}
.message{
    border-radius: 15px 15px 0 0;
    box-sizing: border-box;
    padding: 10px 0 0 0;
    background-color: rgba(255, 255, 255, 0.3);
}
.controls{
    box-sizing: border-box;
    padding: 10px;
    width:100%;
    height: 50px;
    display:flex; 
    justify-content: space-between;
    align-items:center;
    border-radius: 0 0 15px 15px;
    background-color: rgba(255, 255, 255, 0.2);
}

.function-btn{
    font-size:30px;
    background-color:skyblue

}

.function-btn:hover{
    font-size:30px;
    background-color:rgb(99, 146, 165)

}

html,
body {
    padding: 0;
    margin: 0;
    background-color: #fff;
}

.main-wrapper {
    /* margin: 3% auto 0; */
    /* width: 1080px; */
    /* height: 80%; */
    text-align: center;
}


.drum-kit-wrapper {
    position: relative;
    width: 600px;
    margin: 0 auto 0;
}

.drum-kit {
    width: 100%;
    height: 520px;
    position: relative;
}

.crash-cymbal {
    position: absolute;
    top: 114px;
    left: 80px;
    transform: rotate(-7.2deg) scale(1.5);
    transition: all ease-in-out .042s;
}

.hihat-top-cymbal {
    position: absolute;
    top: 166px;
    right: 71px;
    transform: scale(1.35);
    z-index: 0;
    transition: all ease-in-out .042s;
}

.key {
    display: inline-block;
    transition: all ease-in-out .042s;
    position: absolute;
    background: #eaeaea;
    font-size: 1.5em;
    height: 32px;
    width: 32px;
    text-align: center;
    border-radius: 4px;
    border: 3px solid #aaa;
    color: #444;
    box-shadow: 1px 1px 1px rgba(0,0,0,.65);
    z-index: 2;
}

.key.kick {
    top: 355px;
    right: 250px;
}

.key.kick2 {
    top: 355px;
    right: 308px;
}

.key.snare {
    right: 145px;
    top: 280px;
}

.key.tom-high {
    right: 227px;
    top: 240px;
}

.key.tom-mid {
    left: 222px;
    top: 220px;
}

.key.tom-low {
    top: 320px;
    left: 133px;
}

.key.crash {
    top: 80px;
    left: 75px;
}

.key.ride {
    left: 165px;
    top: 87px;
}

.key.hihat-open {
    right: 165px;
    top: 144px;
}

.key.hihat-close {
    right: 60px;
    top: 150px;
}

.playing {
    transform: scale(1.12);
}

.key-map-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    height: 700px;
    background: #111;
    width: 250px;
    z-index: 3;
}

.key-map-wrapper > h2 {
    color: #fff;
    font-family: 'Handlee', cursive;
    margin-bottom: 35px;
    border-bottom: 1px solid #fff;
    padding-bottom: 20px;
}

.key-map-list {
    list-style: none;
    color: #fff;
    text-align: left;
}

.key-map-list > li {
    margin-bottom: 25px;
}

.key-code {
    color: #444;
    background-color: #eaeaea;
    font-size: 1.25em;
    padding: 5px 10px;
    border-radius: 4px;
    border: 3px solid #aaa;
}

.key-sound {
    font-size: 1.2em;
    margin-left: 10px;
    font-family: 'Handlee', cursive;
    vertical-align: middle;
}
</style>