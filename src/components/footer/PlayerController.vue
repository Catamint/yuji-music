<template>
    <div></div>
    <n-icon size="32" @click="player.play_prev()">
        <Previous32Filled />
    </n-icon>
    <n-icon v-if="player.is_playing" size="40" @click="playOrPause">
        <Pause48Filled />
    </n-icon>
    <n-icon v-else size="40" @click="playOrPause">
        <Play32Filled />
    </n-icon>
    <n-icon size="32" @click="player.play_next()">
        <Next32Filled />
    </n-icon>
    <h4 style="margin-left: 10px;">{{ currentMinSec(player.currentTime) }}</h4>
    <n-slider style="width: 30vw; margin-left: 10px;" v-model:value="player.currentTime" :step="1" :max="player.duration"
        :on-dragstart="onDragstart" :on-dragend="onDragend" :tooltip="false" />
    <h4 style="margin-left: 10px;">{{ currentMinSec(player.duration) }}</h4>
    <!-- <n-slider style="width: 100px; margin-left: 10px;" :tooltip="false" /> -->

    <audio autoplay @play="starting" @pause="pausing" @ended="onEnded" @timeupdate="onCurrentTime"
        @durationchange="onDuration" :src="get_current_url" ref="audio"></audio>
</template>

<script>

import { Previous32Filled, Next32Filled, Play32Filled, Pause48Filled } from "@vicons/fluent";
import { NIcon, NSlider } from "naive-ui";
import { player } from "@/stores/player";

export default {
    name: 'PlayerController',
    components: {
        NIcon,
        Previous32Filled,
        Next32Filled,
        Pause48Filled,
        Play32Filled,
        NSlider
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
}
</style>
