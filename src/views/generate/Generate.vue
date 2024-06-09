<template>
    <div class="container">
        <div class="col-6">
            <n-card class="card" title="工作区"></n-card>
            <div style="display: flex; padding:0 10px 10px 10px;">
                <div class="col-5">
                    <n-card class="card" style="height: 100%;" title="提示词">
                        <n-space style="height: 100%;" vertical>
                            <n-input maxlength="600" show-count type="textarea"
                            :autosize="{ minRows: 14, maxRows: 18 }">
                                <template #count="{ value }">
                                    {{ value.length }} / 600
                                </template>
                            </n-input>
                            <n-flex justify="end">
                                <n-button type="success">掷骰子</n-button>
                            </n-flex>
                        </n-space>
                    </n-card>
                </div>
                <div class="col-5">
                    <n-card class="card" title="生成选项">
                        <n-space vertical>
                            歌曲名称
                            <n-input size="large" v-model:value="songName" />
                            <!-- <n-input-group-label>.mp3</n-input-group-label> -->
                            歌曲时长
                            <n-slider style="width: 50%;" v-model:value="timeSecond" :step="1" />
                            <n-input-number size="large" v-model:value="timeSecond" >
                                <template #suffix>
                                    秒
                                </template>
                            </n-input-number>
                        </n-space>
                    </n-card>
                    <n-flex>
                        <n-button size="large" type="success" style="width: 100%" @click="generate()">生成</n-button>
                    </n-flex>
                    <audio id="audio1"  :src="audio1"></audio>
                    <audio id="audio2"  :src="audio2"></audio>
                </div>
            </div>
        </div>
        <div class="col-4">
            <n-card class="card" title="歌曲列表">
            </n-card>
                <n-card v-if="generated > 0" class="list" content-style="padding: 0; display: flex; align-items: center;">
                    <n-flex style="width:100%; justify-content: space-between; padding-right: 10px;">
                        <div class="text">
                            <n-ellipsis style="font-size: 1.5rem; font-weight: bold;">
                                song
                            </n-ellipsis>
                            <!-- <span class="info" style="padding-left: 20px;">详细信息</span> -->
                        </div>
                        <n-flex>
                            <n-button class="play-button" style="font-size: 15px" @click="play()">
                                <template #icon>
                                    <n-icon><Play24Regular/></n-icon>
                                </template>
                                播放
                            </n-button>
                        </n-flex>
                    </n-flex>
                </n-card>
                <n-card v-if="generated > 1" class="list" content-style="padding: 0; display: flex; align-items: center;">
                    <n-flex style="width:100%; justify-content: space-between; padding-right: 10px;">
                        <div class="text">
                            <n-ellipsis style="font-size: 1.5rem; font-weight: bold;">
                                happy
                            </n-ellipsis>
                            <!-- <span class="info" style="padding-left: 20px;">详细信息</span> -->
                        </div>
                        <n-flex>
                            <n-button class="play-button" style="font-size: 15px" @click="play()">
                                <template #icon>
                                    <n-icon><Play24Regular/></n-icon>
                                </template>
                                播放
                            </n-button>
                        </n-flex>
                    </n-flex>
                </n-card>
        </div>
    </div>
</template>

<script>
import { NButton, NCard, NEllipsis, NFlex, NH6, NIcon, NInput, NInputGroup, NInputGroupLabel, NInputNumber, NSlider, NSpace } from 'naive-ui';
import audio1 from "@/views/generate/static/audio.wav"
import audio2 from "@/views/generate/static/audio_0.wav"
import { Play24Regular } from '@vicons/fluent';

export default {
  name: 'Generate',
  components:{
    NCard,
    NInput,
    NInputGroup,
    NInputGroupLabel,
    NSlider,
    NSpace,
    NFlex,
    NInputNumber,
    NButton,
    NH6,
    NIcon,
    Play24Regular,
    NEllipsis
  },
  data(){
    return{
        timeSecond : 10,
        generated: 0,
        flag:null,
        audio1,
        audio2,
        songName: ""
    }
  },
  methods:{
    generate(){
        this.flag= window.setTimeout(()=>{
            // console.log("22222")
            this.generated ++;
        },3000)
    },
    play(){
        var a = document.getElementById('audio' + this.generated)
        // let a = document.createElement('audio')
        // a.src = audio.src
        a.play()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card{
    margin-bottom: 20px;
    min-width: 200px;
}
.container{
    display: flex;
    height: 100%;
    border: 50px;
    border-radius: 10px;
    /* background-color: rgba(0,0,0,0.5); */
    justify-content: center;
}
.col-4{
    background-color: rgba(255, 255, 255, 0.2);
    margin: 20px;
    border-radius: 10px;
    width: 30%;
}
.col-5{
    /* background-color: rgba(255, 255, 255, 0.2);; */
    box-sizing: border-box;
    border-radius: 10px;
    width: 50%;
    margin: 5px;
}
.col-6{
    display: flex;
    flex-direction:column;
    background-color: rgba(255, 255, 255, 0.2);;
    margin: 20px;
    /* padding: 40px 40px 40px 40px; */
    box-sizing: border-box;
    border-radius: 10px;
    width: 60%;
}
.list {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 100%;
    padding: 10px;
    /* max-width: 260px; */
    height: 80px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 8px 12px;
}

.text {
    display: flex;
    align-items: center;
    padding-left: 10px;
}
.text .info {
    font-size: medium;
    padding-left: 10px;
}

</style>
