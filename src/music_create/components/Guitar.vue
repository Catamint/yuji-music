<template>

<!-- Guitar  -->
<div class="box">
<div id = "guitar">
 
  <div id="guitar-body">
  <div id="addon3">
    <div id="bridge"></div>
  </div>
  <div id= "addon1"></div>
  <div id="hole-and-neck"> 
    <div id = "neck"></div>
    <div id = "hole"></div>
  </div>
  <div id="addon2">
    <div id="addon2-neck"></div>
  </div>
  <div id="addon4">
    <div id="guitar-edge"></div>
    <div id="addon4-neck"></div>
  </div>
    <!--guitar body-->
  </div>

  
   <div id="strings-group">
     <p id="shim">ololo</p>
  <hr id = "first-string" @click="playNote('first')" class="string">
  <hr id = "second-string" @click="playNote('second')" class="string">
  <hr id = "third-string" @click="playNote('third')" class="string">
  <hr id = "fourth-string" @click="playNote('fourth')" class="string">
  <hr id = "fifth-string" @click="playNote('fifth')" class="string">
  <hr id = "sixth-string" @click="playNote('sixth')" class="string">
  </div>
  
  <!-- guitar -->
</div>
<br>
<div id="footer">
  <button id="first-btn" class="btn-string" @click="playNote('first')">MI<div class="key-info">S</div></button>
  <button id="second-btn" class="btn-string" @click="playNote('second')">LA<div class="key-info">D</div></button>
  <button id="third-btn" class="btn-string" @click="playNote('third')">RE<div class="key-info">F</div></button>
  <button id="fourth-btn" class="btn-string" @click="playNote('fourth')">SOL<div class="key-info">J</div></button>  
  <button id="fifth-btn" class="btn-string" @click="playNote('fifth')">SI<div class="key-info">K</div></button>  
  <button id="sixth-btn" class="btn-string" @click="playNote('sixth')">MI<div class="key-info">L</div></button>  
</div>

<audio id="first-note" :src="firstNote"></audio>
<audio id="second-note" :src="secondNote"></audio>
<audio id="third-note" :src="thirdNote"></audio>
<audio id="fourth-note" :src="fourthNote"></audio>
<audio id="fifth-note" :src="fifthNote"></audio>
<audio id="sixth-note" :src="sixthNote"></audio>
<!-- End Guitar  -->


<!-- 功能区 -->
<!-- <button class="function-btn" @click="playMusic(Test)">播放测试文件</button>
<br>

<div>
    <button class="function-btn" @click="record">录制</button>
    <button class="function-btn" @click="finishRecord">停止录制</button>
    <button class="function-btn" @click="playRecord">播放录制</button>
    <span id="recordStatus">未在录制</span>
</div>
<br>
<div>
    <button class="function-btn" @click="downloadRecord">导出录制文件</button>
    录制文件名字：<input type='text' v-model="downloadFile" style='height:25px'>
</div>
<br>
<div>
    <input type='file' @change="handleUploadFile">
    <button class="function-btn" @click="playMusic(recordFile)">播放上传的录制文件</button>
</div>
<br>
<div style="margin-top: 20px;">
    播放倍速：{{ times }}<input type="range" v-model="times" max="5" step="1" min="1">
</div> -->
<!-- End 功能区 -->
</div>
</template>



<script lang="ts" setup>
import firstNote from '@/music_create/static/sounds/guitar/egs-1.mp3';
import secondNote from '@/music_create/static/sounds/guitar/egs-2.mp3';
import thirdNote from '@/music_create/static/sounds/guitar/egs-3.mp3';
import fourthNote from '@/music_create/static/sounds/guitar/egs-4.mp3';
import fifthNote from '@/music_create/static/sounds/guitar/egs-5.mp3';
import sixthNote from '@/music_create/static/sounds/guitar/egs-6.mp3';

const props = defineProps({
    asComponent: {
        type: Boolean,
        default: false
    }
});

let keyNoteMap = {
    'S':'first',
    'D':'second',
    'F':'third',
    'J':'fourth',
    'K':'fifth',
    'L':'sixth'
}

function shakeElement(id:string) {
    var element = document.getElementById(id);
    element?.classList.add('shaking');
    setTimeout(function() {
        element?.classList.remove('shaking');
    }, 1000); // 设置与动画持续时间相同的延迟时间
}

function playNote(pos:string){
    shakeElement(pos + '-string')
    let audio = document.getElementById(pos+'-note')
    if(audio.currentTime < 0.5){
        let a = document.createElement('audio')
        a.src = audio.src
        a.play()
    }
    else{
        audio.currentTime = 0
        audio?.play()
    }

    
}


document.addEventListener("keydown", (event) => {
    const key = event.key;
    if(key.toUpperCase() in keyNoteMap){
        let pos = keyNoteMap[key.toUpperCase()]
        playNote(pos)
        document.getElementById(pos + '-btn')?.classList.add('activeButton')
    }
})

document.addEventListener("keyup", (event) => {
    const key = event.key;
    if(key.toUpperCase() in keyNoteMap){
        let pos = keyNoteMap[key.toUpperCase()]
        document.getElementById(pos + '-btn')?.classList.remove('activeButton')
    }
})

    
</script>


<style scoped>
@import url(https://fonts.googleapis.com/css?family=Alfa+Slab+One);
@import url(https://fonts.googleapis.com/css?family=Roboto+Slab);

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

.function-btn{
    font-size:30px;
    background-color:skyblue

}

#guitar{
    box-shadow: 0px 0px 10px 5px black;
}

.key-info{
    color: brown;
}

.string:hover{
    box-shadow: 0px 0px 0px 0.5px rgb(106, 148, 165);
    background-color: rgb(46, 60, 65);
}

.activeButton{
    background-color: skyblue;
}

body {
font-family: 'Roboto Slab', serif;
font-weight: bold;
}
header {
text-align: center;
margin: 10px;
}
button {
margin: 10px;
background-color: white;
border: 1px solid black;
font-size: 150%;
font-family: 'Roboto Slab', serif;
font-weight: bold;
}

#start-and-stop:active {
background-color: #848482;
}


header h1 {
font-family: 'Alfa Slab One', cursive;
}

#bridge {
position: relative;
top: 35px;
left: 100px;
height: 200px;
width: 50px;
background-color: black;
border: 5px solid #2B1B17;
}
#addon3 {
border-top: 1px solid black;
border-left: 1px solid black;
border-bottom: 1px solid black;
float:left;
background-color: #c25c05;
height: 280px;
width: 160px;
display:none;
}
#addon1 {
border-top: 1px solid black;
border-bottom: 1px solid black;
display: none;
background-color: #c25c05;
float:left;
width: 160px;
height: 280px;
}
#addon2 {
border-top: 1px solid black;
border-bottom: 1px solid black;
display: none;
background-color: #c25c05;
width: 160px;
height: 280px;
float:left;
}
#addon4 {
border-top: 1px solid black;
border-bottom: 1px solid black;
border-right: 1px solid black;
display:none;
width: 160px;
height: 280px;
float:left;
}
#guitar-edge {
width: 80px;
height: 280px;
border-right: 1px solid black;
background-color: #c25c05;
border-top-right-radius: 30px 140px;
border-bottom-right-radius: 30px 140px;
}
#hole-and-neck {
border-top: 1px solid black;
border-bottom: 1px solid black;
width: 330px;
height: 280px;
background-color: #c25c05;
float:left;
}

/* @keyframes shake {
0% { transform: translate(-50%, -50%); }
20% { transform: translate(-50%, -45px); }
40% { transform: translate(-50%, -55px); }
60% { transform: translate(-50%, -45px); }
80% { transform: translate(-50%, -55px); }
100% { transform: translate(-50%, -50%); }
} */


@keyframes shake {
0% { transform: translate(0px, -2px); }
10% { transform: translate(0px, 2px); }
20% { transform: translate(0px, -2px); }
30% { transform: translate(0px, 2px); }
40% { transform: translate(0px, -2px); }
50% { transform: translate(0px, 2px); }
60% { transform: translate(0px, -2px); }
70% { transform: translate(0px, 2px); }
80% { transform: translate(0px, -2px); }
90% { transform: translate(0px, 2px); }
100% { transform: translate(0px, 0px); }
}

#hole {
background-color: black;
width: 200px;
height: 200px;
border: 15px solid brown;
border-radius: 50%;
position: relative;
top: -125px;
left: 15px;
}
#neck {
width: 120px;
height: 150px;
background-color: #2B1B17;
position: relative;
top: 65px;
left: 210px;
}
#addon2-neck {
height: 150px;
width: 100%;
background-color: #2B1B17;
position: relative;
top: 65px;
}
#addon4-neck {
position: relative;
height: 150px;
width: 100%;
background-color: #2B1B17;
top: -215px;
}
hr {
position: relative;
z-index: 1;
height: 5px;
background-color: black;
}
#first-string {
top: -242px;
}
#second-string {
top: -232px;
}
#third-string {
top: -222px;
}
#fourth-string {
top: -212px;
}
#fifth-string {
top: -202px;
}
#sixth-string {
top: -192px;
}
#guitar {
margin: auto;
height: 280px;
width: 329px;
}
@media screen and (min-width: 680px) {
#guitar {
    width: 655px;
}
hr {
    width: 648px;
    left: -2px;
}
#hole-and-neck {
    margin: 0px;
}
#addon1 {
    display: block;
}
#addon2 {
    display: block;
}
}
@media screen and (min-width: 970px) {
#guitar {
    width: 978px;
}
#addon3 {
    display:block;
}
#addon4 {
    display:block;
}
#addon1 {
    display: block;
}
#addon2 {
    display: block;
}
hr {
    left: 50px; 
    width: 865px;
}
}

#footer {
text-align: center;
}
#strings-group {
position: relative;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
}
#guitar-body {
position: relative;
top: 0px;
left: 0px;
}
#shim {
visibility: hidden;
}


.shaking {
    animation: shake 0.2s ease; /* 减少动画持续时间 */
}


.shaking {
    animation: shake 0.5s ease;
}
</style>