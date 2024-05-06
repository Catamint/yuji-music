<template>
    <!-- Piano -->
    <ul class="piano" style="display: ;">
        <li class="key" v-for="ns in NotesInfo">
            <span v-for="n in ns" :class="`${n.type}-key`" :data-key="n.keyCode" :data-note="n.name" :key="n.id"
                @click="playOneNote(n.name)" :id="n.name">
                <div :class="`key-info-${n.type}`">
                    <div class="key-note-name-info">{{ n.name }}</div>
                    <div class="key-keyboard-info">{{ n.key }}</div>
                    <div v-if="n.type == 'black'">⇧</div>
                    <audio :id="`${n.name}-audio`" :src='n.url'></audio>
                </div>
            </span>
        </li>
    </ul>
    <!-- End Piano -->

    <!-- 功能区 -->
    
    <button @click="playMusic(Sanye)" style="font-size: 30px;background-color: aquamarine;">播放三叶的主题曲</button>
    <button @click="playMusic(UnderTale)" style="font-size: 30px;background-color: aquamarine;">播放传说之下</button>
    <hr>
    <div style="margin-top: 20px;">
        <span id="recordStatus">未在录制</span>
        <button @click="record()">录制</button>
        <button @click="finishRecord()">结束录制</button>
        <button @click="playRecord()">播放录制</button>
    </div>
    <hr>
    <div>
        <button @click="downloadRecord">导出录制文件</button>
        导出文件名：<input type="text" v-model="musicFileName">
    </div>
    <hr>
    <div>
        上传录制文件json：<input type="file" name="" id="" @change="handleUploadFile">
        <button @click="playMusic(recordFile)">播放上传的录制文件</button>
    </div>
    <hr>
    <div style="margin-top: 20px;">
        播放倍速：{{ times }}<input type="range" v-model="times" max="5" step="1" min="1">
    </div>
    
    <!-- End 功能区 -->
</template>

<script lang="ts" setup>
import a49 from '@/music_create/static/sounds/piano/a49.mp3'
import b49 from '@/music_create/static/sounds/piano/b49.mp3'
import a50 from '@/music_create/static/sounds/piano/a50.mp3'
import b50 from '@/music_create/static/sounds/piano/b50.mp3'
import a51 from '@/music_create/static/sounds/piano/a51.mp3'
import a52 from '@/music_create/static/sounds/piano/a52.mp3'
import b52 from '@/music_create/static/sounds/piano/b52.mp3'
import a53 from '@/music_create/static/sounds/piano/a53.mp3'
import b53 from '@/music_create/static/sounds/piano/b53.mp3'
import a54 from '@/music_create/static/sounds/piano/a54.mp3'
import b54 from '@/music_create/static/sounds/piano/b54.mp3'
import a55 from '@/music_create/static/sounds/piano/a55.mp3'
import a56 from '@/music_create/static/sounds/piano/a56.mp3'
import b56 from '@/music_create/static/sounds/piano/b56.mp3'
import a57 from '@/music_create/static/sounds/piano/a57.mp3'
import b57 from '@/music_create/static/sounds/piano/b57.mp3'
import a65 from '@/music_create/static/sounds/piano/a65.mp3'
import a66 from '@/music_create/static/sounds/piano/a66.mp3'
import b66 from '@/music_create/static/sounds/piano/b66.mp3'
import a67 from '@/music_create/static/sounds/piano/a67.mp3'
import b67 from '@/music_create/static/sounds/piano/b67.mp3'
import a68 from '@/music_create/static/sounds/piano/a68.mp3'
import b68 from '@/music_create/static/sounds/piano/b68.mp3'
import a69 from '@/music_create/static/sounds/piano/a69.mp3'
import b69 from '@/music_create/static/sounds/piano/b69.mp3'
import a70 from '@/music_create/static/sounds/piano/a70.mp3'
import a71 from '@/music_create/static/sounds/piano/a71.mp3'
import b71 from '@/music_create/static/sounds/piano/b71.mp3'
import a72 from '@/music_create/static/sounds/piano/a72.mp3'
import b72 from '@/music_create/static/sounds/piano/b72.mp3'
import a73 from '@/music_create/static/sounds/piano/a73.mp3'
import b73 from '@/music_create/static/sounds/piano/b73.mp3'
import a74 from '@/music_create/static/sounds/piano/a74.mp3'
import b74 from '@/music_create/static/sounds/piano/b74.mp3'
import a75 from '@/music_create/static/sounds/piano/a75.mp3'
import a76 from '@/music_create/static/sounds/piano/a76.mp3'
import b76 from '@/music_create/static/sounds/piano/b76.mp3'
import a78 from '@/music_create/static/sounds/piano/a78.mp3'
import a79 from '@/music_create/static/sounds/piano/a79.mp3'
import b79 from '@/music_create/static/sounds/piano/b79.mp3'
import a80 from '@/music_create/static/sounds/piano/a80.mp3'
import b80 from '@/music_create/static/sounds/piano/b80.mp3'
import a81 from '@/music_create/static/sounds/piano/a81.mp3'
import b81 from '@/music_create/static/sounds/piano/b81.mp3'
import a82 from '@/music_create/static/sounds/piano/a82.mp3'
import a83 from '@/music_create/static/sounds/piano/a83.mp3'
import b83 from '@/music_create/static/sounds/piano/b83.mp3'
import a84 from '@/music_create/static/sounds/piano/a84.mp3'
import b84 from '@/music_create/static/sounds/piano/b84.mp3'
import a85 from '@/music_create/static/sounds/piano/a85.mp3'
import a86 from '@/music_create/static/sounds/piano/a86.mp3'
import b86 from '@/music_create/static/sounds/piano/b86.mp3'
import a87 from '@/music_create/static/sounds/piano/a87.mp3'
import b87 from '@/music_create/static/sounds/piano/b87.mp3'
import a88 from '@/music_create/static/sounds/piano/a88.mp3'
import a89 from '@/music_create/static/sounds/piano/a89.mp3'
import b89 from '@/music_create/static/sounds/piano/b89.mp3'
import a90 from '@/music_create/static/sounds/piano/a90.mp3'
import b90 from '@/music_create/static/sounds/piano/b90.mp3'
import a77 from '@/music_create/static/sounds/piano/a77.mp3'

import {ref} from 'vue';


let noteBaseUrl = '../static/piano/'
let NotesInfo = [
    [{ id: 1, name: 'C2', keyCode: '49', key: '1', url: a49, type: 'white' },
    { id: 36, name: 'C#2', keyCode: 'b49', key: '1', url: b49, type: 'black' }],
    [{ id: 2, name: 'D2', keyCode: '50', key: '2', url: a50, type: 'white' },
    { id: 37, name: 'D#2', keyCode: 'b50', key: '2', url: b50, type: 'black' }],
    [{ id: 3, name: 'E2', keyCode: '51', key: '3', url: a51, type: 'white' }],
    [{ id: 4, name: 'F2', keyCode: '52', key: '4', url: a52, type: 'white' },
    { id: 38, name: 'F#2', keyCode: 'b52', key: '4', url: b52, type: 'black' }],
    [{ id: 5, name: 'G2', keyCode: '53', key: '5', url: a53, type: 'white' },
    { id: 39, name: 'G#2', keyCode: 'b53', key: '5', url: b53, type: 'black' }],
    [{ id: 6, name: 'A2', keyCode: '54', key: '6', url: a54, type: 'white' },
    { id: 40, name: 'A#2', keyCode: 'b54', key: '6', url: b54, type: 'black' }],
    [{ id: 7, name: 'B2', keyCode: '55', key: '7', url: a55, type: 'white' }],


    [{ id: 8, name: 'C3', keyCode: '56', key: '8', url: a56, type: 'white' },
    { id: 41, name: 'C#3', keyCode: 'b56', key: '8', url: b56, type: 'black' }],
    [{ id: 9, name: 'D3', keyCode: '57', key: '9', url: a57, type: 'white' },
    { id: 42, name: 'D#3', keyCode: 'b57', key: '9', url: b57, type: 'black' }],
    [{ id: 10, name: 'E3', keyCode: '48', key: '0', url: b57, type: 'white' }],
    [{ id: 26, name: 'F3', keyCode: '81', key: 'Q', url: a81, type: 'white' },
    { id: 43, name: 'F#3', keyCode: 'b81', key: 'Q', url: b81, type: 'black' }],
    [{ id: 32, name: 'G3', keyCode: '87', key: 'W', url: a87, type: 'white' },
    { id: 44, name: 'G#3', keyCode: 'b87', key: 'W', url: b87, type: 'black' }],
    [{ id: 14, name: 'A3', keyCode: '69', key: 'E', url: a69,type: 'white'},
    { id: 45, name: 'A#3', keyCode: 'b69', key: 'E', url: b69, type: 'black' }],
    [{ id: 27, name: 'B3', keyCode: '82', key: 'R', url: a82, type: 'white' }],



    [{ id: 29, name: 'C4', keyCode: '84', key: 'T', url: a84, type: 'white' },
    { id: 46, name: 'C#4', keyCode: 'b84', key: 'T', url: b84, type: 'black' }],
    [{ id: 34, name: 'D4', keyCode: '89', key: 'Y', url: a89, type: 'white' },
    { id: 47, name: 'D#4', keyCode: 'b89', key: 'Y', url: b89, type: 'black' }],
    [{ id: 30, name: 'E4', keyCode: '85', key: 'U', url: a85, type: 'white' }],
    [{ id: 18, name: 'F4', keyCode: '73', key: 'I', url: a73, type: 'white' },
    { id: 48, name: 'F#4', keyCode: 'b73', key: 'I', url: b73, type: 'black' }],
    [{ id: 24, name: 'G4', keyCode: '79', key: 'O', url: a79, type: 'white' },
    { id: 49, name: 'G#4', keyCode: 'b79', key: 'O', url: b79, type: 'black' }],
    [{ id: 25, name: 'A4', keyCode: '80', key: 'P', url: a80, type: 'white' },
    { id: 50, name: 'A#4', keyCode: 'b80', key: 'P', url: b80, type: 'black' }],
    [{ id: 10, name: 'B4', keyCode: '65', key: 'A', url: a65, type: 'white' }],


    [{ id: 28, name: 'C5', keyCode: '83', key: 'S', url: a83, type: 'white' },
    { id: 51, name: 'C#5', keyCode: 'b83', key: 'S', url: b83, type: 'black' }],
    [{ id: 13, name: 'D5', keyCode: '68', key: 'D', url: a68, type: 'white' },
    { id: 52, name: 'D#5', keyCode: 'b68', key: 'D', url: b68, type: 'black' }],
    [{ id: 15, name: 'E5', keyCode: '70', key: 'F', url: a70, type: 'white' }],
    [{ id: 16, name: 'F5', keyCode: '71', key: 'G', url: a71, type: 'white' },
    { id: 53, name: 'F#5', keyCode: 'b71', key: 'G', url: b71, type: 'black' }],
    [{ id: 17, name: 'G5', keyCode: '72', key: 'H', url: a72, type: 'white' },
    { id: 54, name: 'G#5', keyCode: 'b72', key: 'H', url: b72, type: 'black' }],
    [{ id: 19, name: 'A5', keyCode: '74', key: 'J', url: a74, type: 'white' },
    { id: 55, name: 'A#5', keyCode: 'b74', key: 'J', url: b74, type: 'black' }],
    [{ id: 20, name: 'B5', keyCode: '75', key: 'K', url: a75, type: 'white' }],


    [{ id: 21, name: 'C6', keyCode: '76', key: 'L', url: a76, type: 'white' },
    { id: 56, name: 'C#6', keyCode: 'b76', key: 'L', url: b76, type: 'black' }],
    [{ id: 35, name: 'D6', keyCode: '90', key: 'Z', url: a90, type: 'white' },
    { id: 57, name: 'D#6', keyCode: 'b90', key: 'Z', url: b90, type: 'black' }],
    [{ id: 33, name: 'E6', keyCode: '88', key: 'X', url: a88, type: 'white' }],
    [{ id: 12, name: 'F6', keyCode: '67', key: 'C', url: a67, type: 'white' },
    { id: 58, name: 'F#6', keyCode: 'b67', key: 'C', url: b67, type: 'black' }],
    [{ id: 31, name: 'G6', keyCode: '86', key: 'V', url: a86, type: 'white' },
    { id: 59, name: 'G#6', keyCode: 'b86', key: 'V', url: b86, type: 'black' }],
    [{ id: 11, name: 'A6', keyCode: '66', key: 'B', url: a66, type: 'white' },
    { id: 60, name: 'A#6', keyCode: 'b66', key: 'B', url: b66, type: 'black' }],
    [{ id: 23, name: 'B6', keyCode: '78', key: 'N', url: a78, type: 'white' }],

    [{ id: 22, name: 'C7', keyCode: '77', key: 'M', url: a77, type: 'white' }],
]

let NotesMap = [
    { name: 'C2', file: 'a49.mp3', key: '1' },
    { name: 'D2', file: 'a50.mp3', key: '2' },
    { name: 'E2', file: 'a51.mp3', key: '3' },
    { name: 'F2', file: 'a52.mp3', key: '4' },
    { name: 'G2', file: 'a53.mp3', key: '5' },
    { name: 'A2', file: 'a54.mp3', key: '6' },
    { name: 'B2', file: 'a55.mp3', key: '7' },
    { name: 'C3', file: 'a56.mp3', key: '8' },
    { name: 'D3', file: 'a57.mp3', key: '9' },
    { name: 'E3', file: 'a48.mp3', key: '0' },
    { name: 'F3', file: 'a81.mp3', key: 'Q' },
    { name: 'G3', file: 'a87.mp3', key: 'W' },
    { name: 'A3', file: 'a69.mp3', key: 'E' },
    { name: 'B3', file: 'a82.mp3', key: 'R' },
    { name: 'C4', file: 'a84.mp3', key: 'T' },
    { name: 'D4', file: 'a89.mp3', key: 'Y' },
    { name: 'E4', file: 'a85.mp3', key: 'U' },
    { name: 'F4', file: 'a73.mp3', key: 'I' },
    { name: 'G4', file: 'a79.mp3', key: 'O' },
    { name: 'A4', file: 'a80.mp3', key: 'P' },
    { name: 'B4', file: 'a65.mp3', key: 'A' },
    { name: 'C5', file: 'a83.mp3', key: 'S' },
    { name: 'D5', file: 'a68.mp3', key: 'D' },
    { name: 'E5', file: 'a70.mp3', key: 'F' },
    { name: 'F5', file: 'a71.mp3', key: 'G' },
    { name: 'G5', file: 'a72.mp3', key: 'H' },
    { name: 'A5', file: 'a74.mp3', key: 'J' },
    { name: 'B5', file: 'a75.mp3', key: 'K' },
    { name: 'C6', file: 'a76.mp3', key: 'L' },
    { name: 'D6', file: 'a90.mp3', key: 'Z' },
    { name: 'E6', file: 'a88.mp3', key: 'X' },
    { name: 'F6', file: 'a67.mp3', key: 'C' },
    { name: 'G6', file: 'a86.mp3', key: 'V' },
    { name: 'A6', file: 'a66.mp3', key: 'B' },
    { name: 'B6', file: 'a78.mp3', key: 'N' },
    { name: 'C7', file: 'a77.mp3', key: 'M' },

    { name: 'C#2', file: 'b49.mp3', key: '[SHIFT]!' },
    { name: 'D#2', file: 'b50.mp3', key: '[SHIFT]@' },
    { name: 'F#2', file: 'b52.mp3', key: '[SHIFT]$' },
    { name: 'G#2', file: 'b53.mp3', key: '[SHIFT]%' },
    { name: 'A#2', file: 'b54.mp3', key: '[SHIFT]^' },
    { name: 'C#3', file: 'b56.mp3', key: '[SHIFT]*' },
    { name: 'D#3', file: 'b57.mp3', key: '[SHIFT](' },
    { name: 'F#3', file: 'b81.mp3', key: '[SHIFT]Q' },
    { name: 'G#3', file: 'b87.mp3', key: '[SHIFT]W' },
    { name: 'A#3', file: 'b69.mp3', key: '[SHIFT]E' },
    { name: 'C#4', file: 'b84.mp3', key: '[SHIFT]T' },
    { name: 'D#4', file: 'b89.mp3', key: '[SHIFT]Y' },
    { name: 'F#4', file: 'b73.mp3', key: '[SHIFT]I' },
    { name: 'G#4', file: 'b79.mp3', key: '[SHIFT]O' },
    { name: 'A#4', file: 'b80.mp3', key: '[SHIFT]P' },
    { name: 'C#5', file: 'b83.mp3', key: '[SHIFT]S' },
    { name: 'D#5', file: 'b68.mp3', key: '[SHIFT]D' },
    { name: 'F#5', file: 'b71.mp3', key: '[SHIFT]G' },
    { name: 'G#5', file: 'b72.mp3', key: '[SHIFT]H' },
    { name: 'A#5', file: 'b74.mp3', key: '[SHIFT]J' },
    { name: 'C#6', file: 'b76.mp3', key: '[SHIFT]L' },
    { name: 'D#6', file: 'b90.mp3', key: '[SHIFT]Z' },
    { name: 'F#6', file: 'b67.mp3', key: '[SHIFT]C' },
    { name: 'G#6', file: 'b86.mp3', key: '[SHIFT]V' },
    { name: 'A#6', file: 'b66.mp3', key: '[SHIFT]B' }
]

let keyNonteMap = {'1': 'C2', '2': 'D2', '3': 'E2', '4': 'F2', '5': 'G2', '6': 'A2', '7': 'B2', '8': 'C3', '9': 'D3', '0': 'E3', 'Q': 'F3', 'W': 'G3', 'E': 'A3', 'R': 'B3', 'T': 'C4', 'Y': 'D4', 'U': 'E4', 'I': 'F4', 'O': 'G4', 'P': 'A4', 'A': 'B4', 'S': 'C5', 'D': 'D5', 'F': 'E5', 'G': 'F5', 'H': 'G5', 'J': 'A5', 'K': 'B5', 'L': 'C6', 'Z': 'D6', 'X': 'E6', 'C': 'F6', 'V': 'G6', 'B': 'A6', 'N': 'B6', 'M': 'C7', '[SHIFT]!': 'C#2', '[SHIFT]@': 'D#2', '[SHIFT]$': 'F#2', '[SHIFT]%': 'G#2', '[SHIFT]^': 'A#2', '[SHIFT]*': 'C#3', '[SHIFT](': 'D#3', '[SHIFT]Q': 'F#3', '[SHIFT]W': 'G#3', '[SHIFT]E': 'A#3', '[SHIFT]T': 'C#4', '[SHIFT]Y': 'D#4', '[SHIFT]I': 'F#4', '[SHIFT]O': 'G#4', '[SHIFT]P': 'A#4', '[SHIFT]S': 'C#5', '[SHIFT]D': 'D#5', '[SHIFT]G': 'F#5', '[SHIFT]H': 'G#5', '[SHIFT]J': 'A#5', '[SHIFT]L': 'C#6', '[SHIFT]Z': 'D#6', '[SHIFT]C': 'F#6', '[SHIFT]V': 'G#6', '[SHIFT]B': 'A#6'}

var use_shift_flag = false

var keys = ['C#2', 'D#2', 'F#2', 'G#2', 'A#2', 'C#3', 'D#3', 'F#3', 'G#3', 'A#3', 'C#4', 'D#4', 'F#4', 'G#4', 'A#4', 'C#5', 'D#5', 'F#5', 'G#5', 'A#5', 'C#6', 'D#6', 'F#6', 'G#6', 'A#6', 'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6', 'F6', 'G6', 'A6', 'B6', 'C7',]

var musicFileName = '我的演奏'

function getFileNameByName(name: string) {
    // console.log(name)
    for (let i = 0; i < NotesMap.length; i++) {
        if (NotesMap[i]['name'] == name) {
            var file = NotesMap[i]['file']
            return file
        }
    }
}

function getNoteNameByKey(key: string): string {
    console.log(key)
    for (let i = 0; i < NotesMap.length; i++)
        if (NotesMap[i]['key'] == key)
            return NotesMap[i]['name']
    return ''
}


function playOneNote(name: string) {
    var audio = document.getElementById(name + '-audio')
    if(audio?.currentTime < 0.5){
        // alert(audio.currentTime)
        let a = document.createElement('audio')
        a.src = audio.src
        a.play()

    }
    else{
        audio.currentTime = 0
        audio?.play()
    }

    
}

function removePlayActive(names:Array<string>){
    names.forEach(name => {
    document.getElementById(name)?.classList.remove('active')
    document.getElementById(name)?.parentElement?.classList.remove('active')
    console.log(name)
})
}

function playMultiNote(names:Array<string>,wait:string){
    names.forEach(name => {
        document.getElementById(name)?.classList.add('active')
        document.getElementById(name)?.parentElement?.classList.add('active')
        let audio = document.getElementById(name + '-audio')
        if(audio?.currentTime < 0.5){
        // alert(audio.currentTime)
        let a = document.createElement('audio')
        a.src = audio.src
        a.play()

        }
        else{
            audio.currentTime = 0
            audio?.onplay()
        }
        const intervalId = setTimeout(function(){ removePlayActive(names);}, 1000 * Number(wait) / times.value);
})
}


function getNoteNamesByKeys(keys:Array<string>){
    let res = []
    for (let i = 0; i < NotesMap.length; i++)
        if (NotesMap[i]['key'] in keys)
            res.push(NotesMap[i]['name'])
    return res

}

function calTimeDelta(t1,t2){
    let delta = t1 - t2
    if(delta < 0)
        return -delta
    return delta
}

function  getTimeNow() {
    var date = new Date();
    var timeStamp = date.getTime()
    return timeStamp
};

function stopOneNote(name: string) {
    let file = getFileNameByName(name)
}

document.addEventListener("keydown", (event) => {
    const key = event.key;



    //   console.log(`用户按下了按键: ${key}`);
    if (key == 'Shift') {
        use_shift_flag = true
        return
    }

    let tmpKey
    if(isRecording){
        console.log(key)
        if(use_shift_flag){
            tmpKey = '[SHIFT]' + key
        }
        else{
            tmpKey = key
        }
        if(tmpKey.toUpperCase() in keyNonteMap){
                console.log('我在里面捏')
                recordData.push({"key":tmpKey,"time":getTimeNow()}) 
        }

    }


    if (use_shift_flag) {
        let notename = getNoteNameByKey('[SHIFT]' + key.toUpperCase())
        console.log(notename)
        document.getElementById(notename)?.classList.add('active')
        document.getElementById(notename)?.parentElement?.classList.add('active')
        playOneNote(notename);
    }
    else {
        let notename = getNoteNameByKey(key.toUpperCase())
        document.getElementById(notename)?.classList.add('active')
        document.getElementById(notename)?.parentElement?.classList.add('active')
        playOneNote(notename);
    }

}
);

document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key == 'Shift') {
        use_shift_flag = false
        for (let i = 0; i < keys.length; i++) {
            document.getElementById(keys[i])?.classList.remove('active')
            document.getElementById(keys[i])?.parentElement?.classList.remove('active')
        }
        return
    }


    if (use_shift_flag) {

        let notename = getNoteNameByKey('[SHIFT]' + key.toUpperCase())
        document.getElementById(notename)?.classList.remove('active')
        document.getElementById(notename)?.parentElement?.classList.remove('active')
        stopOneNote(notename)
    }
    else {
        let notename = getNoteNameByKey(key.toUpperCase())
        document.getElementById(notename)?.classList.remove('active')
        document.getElementById(notename)?.parentElement?.classList.remove('active')
        stopOneNote(notename)
    }

    // if(isRecording){
    //     // recordData.push({"key":key,"time":getTimeNow(),"type":"up"}) 
    //     recordData
    // }

}

);

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
      reader.readAsText(file); // 以文本格式读取文件内容
    }





function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// import * as fs from 'fs'
import Sanye from '@/music_create/static/music/piano/三叶的主题曲.json';
import SanyePeriod from'@/music_create/static/music/piano/三叶的主题曲片段.json';
import UnderTale from'@/music_create/static/music/piano/传说之下.json';
var times = ref(1)

async function playMusic(file){
    for(let i = 0;i<file.length;i++){
        await playMultiNote(file[i]['note'],file[i]['wait'])
        await delay(file[i]['wait'] * 1000 / times.value)
    };

}

var recordFile = null
var isRecording = false;
var recordData = []

function record(){
    isRecording = true
    recordData = []
    document.getElementById('recordStatus').innerHTML = '正在录制'
}

function finishRecord(){
    isRecording = false
    console.log(recordData)
    document.getElementById('recordStatus').innerHTML = '未在录制'


}


function recordToMusic(data){
    let record = []
    for(let i =0;i<data.length;i++){
        let key = data[i]['key']
        let wait
        if(i == data.length - 1){
            wait = 0.5
        }
        else{
            wait = (data[i + 1]['time'] - data[i]['time']) / 1000
        }
            
        let note = keyNonteMap[key.toUpperCase()]
        record.push({
            'key':[key],
            'wait':wait,
            'note':[note]
        })
    }
    return record
}


function playRecord(){
    document.getElementById('recordStatus').innerHTML = '播放录制中'
    // let record = []
    // let skip = 0
    // let confidenceSeconds = 100
    // for(let i =0;i<recordData.length;i++){
    //     if(skip){
    //         skip--
    //         continue
    //     }
    //     let tmpKeys = []
    //     let tmpNotes = []
    //     let wait = 0
    //     let key = recordData[i]['key']
    //     let note = keyNonteMap[key.toUpperCase()]
    //     tmpKeys.push(key)
    //     tmpNotes.push(note)
    //     for(let j = i + 1;j<recordData.length;j++){
    //         let delta = recordData[j]['time'] - recordData[i]['time']
    //         if(delta < confidenceSeconds){
    //             key = recordData[j]['key']
    //             note = keyNonteMap[key.toUpperCase()]
    //             tmpKeys.push(key)
    //             tmpNotes.push(note)
    //             skip ++
    //         } 
    //         else{
    //             wait = delta
    //         }
    //     record.push({'key':tmpKeys,'wait':wait / 1000,'note':tmpNotes})
    //     }

    // }
    // console.log(record)
    record = recordToMusic(recordData)
    playMusic(record)
}

function downloadRecord(){
    record = recordToMusic(recordData)
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
    downloadButton.download = musicFileName; // 下载文件的名称
    downloadButton.click()

}




</script>



<style scoped>
.info {
    font-size: 18px;
    margin: 20px;

    a {
        color: #009dff;
        font-weight: bold;
    }

}


.piano {
    /* background: -webkit-linear-gradient(-65deg, #000, #222, #000, #666, #222 75%);
        background: -moz-linear-gradient(-65deg, #000, #222, #000, #666, #222 75%);
        background: -o-linear-gradient(-65deg, #000, #222, #000, #666, #222 75%);
        background: linear-gradient(-65deg, #000, #222, #000, #666, #222 75%);
        border-top: 2px solid #111;
        box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.5), inset 0 -4px 5px #000; */
    margin: 0;
    padding: 0 1% 3%;
    text-align: center;
}

.key {
    display: inline-block;
    position: relative;
    margin: 0 2px;
    width: 2%;
    max-width: 85px;
    box-shadow: 1px 1px 1px;

    &:active,
    &.active {
        .black-key {
            top: -5px;
        }
    }

    .white-key {
        background: -webkit-linear-gradient(-30deg, #f8f8f8, #fff);
        background: -moz-linear-gradient(-30deg, #f8f8f8, #fff);
        background: -o-linear-gradient(-30deg, #f8f8f8, #fff);
        background: linear-gradient(-30deg, #f8f8f8, #fff);
        box-shadow: inset 0 1px 0px rgba(255, 255, 255, 1), inset 0 -1px 0px rgba(255, 255, 255, 1), inset 1px 0px 0px rgba(255, 255, 255, 1), inset -1px 0px 0px rgba(255, 255, 255, 1), 0 4px 3px rgba(0, 0, 0, 0.7), inset 0 -1px 0px rgba(255, 255, 255, 1), inset 1px 0px 0px rgba(255, 255, 255, 1), inset -1px -1px 15px rgba(0, 0, 0, 0.5), -3px 4px 6px rgba(0, 0, 0, 0.5);
        display: block;
        height: 300px;

        &:active,
        &.active {
            box-shadow: inset 0 1px 0px rgba(255, 255, 255, 1), inset 0 -1px 0px rgba(255, 255, 255, 1), inset 1px 0px 0px rgba(255, 255, 255, 1), inset -1px 0px 0px rgba(255, 255, 255, 1), 0 4px 3px rgba(0, 0, 0, 0.7), inset 0 -1px 0px rgba(255, 255, 255, 1), inset 1px 0px 0px rgba(255, 255, 255, 1), inset -1px -1px 15px rgba(0, 0, 0, 1), -3px 4px 6px rgba(0, 0, 0, 0.5);
            position: relative;
            top: -5px;
            height: 295px;
        }

    }

    .black-key {
        content: "";
        box-shadow: inset 0px -1px 2px rgba(255, 255, 255, 0.4), 0 2px 3px rgba(0, 0, 0, 0.4);
        background: -webkit-linear-gradient(-20deg, #222, #000, #222);
        background: -moz-linear-gradient(-20deg, #222, #000, #222);
        background: -o-linear-gradient(-20deg, #222, #000, #222);
        background: linear-gradient(-20deg, #222, #000, #222);
        border-width: 1px 3px 8px;
        border-style: solid;
        border-color: #666 #222 #111 #555;
        height: 160px;
        position: absolute;
        top: 0px;
        right: -40%;
        width: 70%;
        z-index: 10;

        &:active,
        &.active {
            border-bottom-width: 3px;
            top: 0;
        }

    }

}


@media (max-width: 767px) {

    .key {
        width: 8%;

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
            display: none;
        }
    }

}

@media (max-width: 480px) {

    .key {
        width: 12%;

        &:nth-child(11),
        &:nth-child(12),
        &:nth-child(13),
        &:nth-child(14) {
            display: none;
        }
    }

}

.key-info-white {
    float: left;
    width: 100%;
    margin-top: 250px;

}

.key-info-black {
    /* display: none; */
    color: white;
    float: left;
    margin-top: 100px;
    font-size: smaller;
}
</style>