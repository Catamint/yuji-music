<template>
    <n-slider class="slider" v-model:value="player.currentTime" :step="1" :max="player.duration"
    :on-dragstart="onDragstart" :on-dragend="onDragend" :tooltip="false" />

    <div class="container playbutton-container">
        <n-icon class='playbutton' size="32" @click="player.play_prev()">
            <Previous32Filled />
        </n-icon>
        <n-icon class='playbutton' v-if="player.is_playing" size="40" @click="playOrPause">
            <Pause48Filled />
        </n-icon>
        <n-icon class='playbutton' v-else size="40" @click="playOrPause">
            <Play32Filled />
        </n-icon>
        <n-icon class='playbutton' size="32" @click="player.play_next()">
            <Next32Filled />
        </n-icon>
    </div>

    <div class='container'>
        <span class="time">{{ currentMinSec(player.currentTime) }} / {{ currentMinSec(player.duration) }}</span>
        <n-tooltip trigger="hover">
            <template #trigger>
                <n-button class='playbutton' text style="font-size: 32px" @click="player.set_loop((player.playmode + 1) % 2)">
                    <n-icon v-if="player.playmode">
                        <ArrowRotateCounterclockwise24Filled />
                    </n-icon>
                    <n-icon v-else>
                        <ArrowSync24Filled />
                    </n-icon>
                    <!-- 列表循环 -->
                </n-button>
            </template>
            {{ player.playmode ? "单曲循环" : "列表循环" }}
        </n-tooltip>
        <!-- <n-slider style="width: 100px; margin-left: 10px;" :tooltip="false" /> -->
        <n-button class='playbutton' text style="font-size: 32px;">
            <n-icon><Heart28Regular /></n-icon>
        </n-button>
        <router-link class="playlist-link" to="/playlist">
            <n-button class='playbutton' text style="font-size: 32px">
                    <n-icon><TextBulletListLtr24Filled /></n-icon>
            </n-button>
        </router-link>
    </div>
    <audio autoplay @play="starting" @pause="pausing" @ended="onEnded" @timeupdate="onCurrentTime"
        @durationchange="onDuration" :src="get_current_url" ref="audio"></audio>
</template>

<script>

import { Previous32Filled, Next32Filled, Play32Filled, Pause48Filled, ArrowSync24Filled, ArrowRotateCounterclockwise24Filled,TextBulletListLtr24Filled,Heart28Regular } from "@vicons/fluent";
import { NIcon, NSlider, NButton, NTooltip } from "naive-ui";
import { player } from "@/stores/player";

export default {
    name: 'PlayerController',
    components: {
        NIcon,
        Previous32Filled,
        Next32Filled,
        Pause48Filled,
        Play32Filled,
        ArrowSync24Filled,
        ArrowRotateCounterclockwise24Filled,
        TextBulletListLtr24Filled,
        Heart28Regular,
    },
    data() {
        return {
            player
        }
    },
    mounted() {

    },
    methods: {
        // 用player控制dom播放/暂停
        playOrPause() {
            if (this.player.is_playing) {
                // console.log(this.$refs.audio.value)
                this.$refs.audio.pause();
                // this.player.set_pause(); //弃用，已改为绑定dom事件实现
            } else {
                if (this.player.playlist.length != 0) {
                    this.$refs.audio.play(); //如果播放列表中有歌曲
                }
                // this.player.set_play();
            }
        },
        // 当dom的状态改变，让player的状态跟着改变
        starting() {
            this.player.set_play();
        },
        pausing() {
            this.player.set_pause();
        },
        onEnded() {
            this.$refs.audio.load(); // 重新加载音频
            this.player.end_and_next();
        },
        onCurrentTime() {
            // console.log(this.player.dragging)
            if (!this.player.dragging) {
                this.player.set_current_time(this.$refs.audio.currentTime);
            }
        },
        onDuration() {
            this.player.set_duration(this.$refs.audio.duration);
        },
        currentMinSec(SecTime) {
            let min = parseInt(SecTime / 60).toString();
            let sec = parseInt(SecTime % 60);
            if (sec < 10) sec = '0' + sec;
            return min + ":" + sec;
        },
        onDragstart() {
            this.player.dragging = true;
            // this.player.currentTime = this.$refs.slider.value;
            // console.log('0')
        },
        onDragend() {
            this.player.dragging = false;
            this.$refs.audio.currentTime = this.player.currentTime;
            // console.log('1')
        }
    },
    computed: {
        get_current_url() {
            if (this.player.playlist.length != 0) {
                return this.player.playlist.at(this.player.current).url; //播放列表非空
            } else {
                return "";
            }
        },
        setCurrentTime() {
            if (!this.player.dragging) {
                return this.player.currentTime;
            } else {
                this.player.currentTime = this.$refs.slider.value;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    display: flex;
    height: 100%;
    /* width: 50%; */
    /* border: 50px; */
    border-radius: 10px;
    /* background-color: rgba(255, 255, 255, 0.3); */
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.slider {
    position: absolute;
    top: calc(0% - 8px);
    left: 0;
    right: 0;
    padding-inline: 14px;
    width: 100%;
    box-sizing: border-box;
    /* margin-left: 10px; */
}
.playlist-link {
    display: flex;
    align-items: center;
}
.time {
    /* font-size: 20px; */
    color: #afafaf;
}
.playbutton-container{
    position: absolute;
    z-index: -1;
    /* padding-inline: 14px; */
    width: 100%;
    box-sizing: border-box;
}
.playbutton:hover {
    background-color: #ffffff69;
    cursor: pointer;
    padding: 5px;
}
.playbutton {
    transition: all 0.3s ease;
    border-radius: 50%;
    padding: 2px;
}
</style>
