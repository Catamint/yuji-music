<template>
    <n-slider
        class="slider"
        :value="dragging ? tempCurrentTime : player2.state.currentTime"
        :step="1"
        :max="player2.state.duration"
        :tooltip="false"
        @update:value="onSliderChange"
        @dragstart="onDragstart"
        @dragend="onDragend"
    />

    <div class="container playbutton-container">
        <n-icon class='playbutton' size="32" @click="player2.prev()">
            <Previous32Filled />
        </n-icon>
        <n-icon class='playbutton' size="40" @click="player2.toggle()">
            <Pause48Filled v-if="player2.state.isPlaying" />
            <Play32Filled v-else />
        </n-icon>
        <n-icon class='playbutton' size="32" @click="player2.next()">
            <Next32Filled />
        </n-icon>
    </div>

    <div class='container'>
        <span class="time">{{ currentMinSec(player2.state.currentTime) }} / {{ currentMinSec(player2.state.duration) }}</span>
        <n-tooltip trigger="hover">
            <template #trigger>
                <n-button class='playbutton' text style="font-size: 32px" @click="player2.setMode(getNextMode(player2.state.mode))">
                    <n-icon v-if="player2.state.mode === PlayMode.SEQUENTIAL">
                        <ArrowSync24Filled />
                    </n-icon>
                    <n-icon v-else-if="player2.state.mode === PlayMode.RANDOM">
                        <ArrowRotateCounterclockwise24Filled />
                    </n-icon>
                    <n-icon v-else>
                        <Pause48Filled />
                    </n-icon>
                    <!-- 顺序/随机/单曲循环 -->
                </n-button>
            </template>
            {{
                player2.state.mode === PlayMode.SEQUENTIAL ? "列表循环"
                : player2.state.mode === PlayMode.RANDOM ? "随机播放"
                : "单曲循环"
            }}
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
</template>

<script>

import { Previous32Filled, Next32Filled, Play32Filled, Pause48Filled, ArrowSync24Filled, ArrowRotateCounterclockwise24Filled,TextBulletListLtr24Filled,Heart28Regular } from "@vicons/fluent";
import { NIcon, NSlider, NButton, NTooltip } from "naive-ui";
import player2, {PlayMode} from "@/stores/player2";

export default {
    name: 'player2Controller',
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
            player2,
            PlayMode,
            dragging: false, // 用于标记是否正在拖动滑块
            tempCurrentTime: 0 // 用于存储临时的当前时间
        }
    },
    mounted() {
        player2.initAudio();
    },
    methods: {
        // 获取下一个播放模式
        getNextMode(currentMode) {
            const modes = [PlayMode.SEQUENTIAL, PlayMode.RANDOM, PlayMode.REPEAT_ONE];
            const idx = modes.indexOf(currentMode);
            return modes[(idx + 1) % modes.length];
        },
        currentMinSec(SecTime) {
            let min = parseInt(SecTime / 60).toString();
            let sec = parseInt(SecTime % 60);
            if (sec < 10) sec = '0' + sec;
            return min + ":" + sec;
        },
        onDragstart() {
            this.dragging = true;
            this.tempCurrentTime = player2.state.currentTime // 初始化拖动时的值
            console.log('0')
        },
        onDragend() {
            this.player2.set_current_time(this.tempCurrentTime);
            this.dragging = false;
            console.log('1')
        },
         onSliderChange(val) {
            // 仅更新临时变量，不影响真正播放
            // if (dragging.value) {
                this.tempCurrentTime = val
            // } else {
                // player2.setCurrentTime(val) // 不是拖动情况下的正常点击
            // }
        }
    },
    computed: {
        get_current_url() {
            if (this.player2.state.playlist.length != 0) {
                return this.player2.state.playlist.at(this.player2.state.current).url; //播放列表非空
            } else {
                return "";
            }
        },
        setCurrentTime() {
            if (!this.player2.state.dragging) {
                return this.player2.state.currentTime;
            } else {
                this.player2.state.currentTime = this.$refs.slider.value;
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
