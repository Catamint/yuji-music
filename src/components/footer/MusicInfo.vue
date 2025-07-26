<template>
    <div class="container">
        <div class="album-container" v-if="playlistNotNull" @click="toggleDetails">
            <img class="album-image" :src="songOnPlay.album.img" alt="">
            <div class="hover-overlay">
                <n-icon size="32">
                    <ChevronDoubleUp16Filled />
                </n-icon>
            </div>
        </div>
        <div>
            <h3>{{ playlistNotNull ? songOnPlay.name : "正在播放" }}</h3>
            <p>
                <span>{{ playlistNotNull ? songOnPlay.artist.name : "歌手" }}</span>
            </p>
        </div>

    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import { player } from "@/stores/player";
import { Heart28Regular, ChevronDoubleUp16Filled } from '@vicons/fluent/lib';
import { NButton, NIcon } from 'naive-ui';

export default {
    name: 'FooterLayout',
    props: {
        msg: String
    },
    components: {
        Heart28Regular,
        NButton,
        NIcon,
        ChevronDoubleUp16Filled
    },
    data() {
        return {
            utils,
            player
        }
    },
    computed: {
        songOnPlay() {
            return this.player.playlist.at(this.player.currentIndex);
        },
        playlistNotNull() {
            return this.player.playlist.length != 0;
        }
    },
    methods: {
        toggleDetails() {
            this.utils.play_component.showing ? this.utils.play_component.hide() : this.utils.play_component.show();
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 20px;
    min-width: 100px;
    gap: 10px;
}

.album-container {
    position: relative;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
}

.album-image {
    height: 100%;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: all 0.3s ease;
    border-radius: 10px;
}

.album-container:hover .album-image {
    filter: brightness(50%);
}

.album-container:hover .hover-overlay {
    opacity: 1;
}
</style>