<template>
    <div class="container">
        <div class="album-container" v-if="playlistNotNull" @click="toggleDetails">
            <img class="album-image" :src="picurl" alt="">
            <div class="hover-overlay">
                <n-icon size="32">
                    <ChevronDoubleUp16Filled />
                </n-icon>
            </div>
        </div>
        <div class="info-container">
            <p class="music-name">{{ playlistNotNull ? songOnPlay.name : "正在播放" }}</p>
            <p class="info">
                <span @click="onArtistClick" >{{ playlistNotNull ? songOnPlay.artist.name : "歌手" }}</span>
            </p>
        </div>

    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import player2 from "@/stores/player2";
import { Heart28Regular, ChevronDoubleUp16Filled } from '@vicons/fluent/lib';
import { NButton, NIcon } from 'naive-ui';
import songService from '@/services/songService.js';
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
            player: player2.state,
            songName: this.playlistNotNull ? this.songOnPlay.name : "正在播放",
            picurl: "",
        }
    },
    computed: {
        songOnPlay() {
            return this.player.playlist.at(this.player.currentIndex) || {};
        },
        playlistNotNull() {
            return this.player.playlist.length != 0;
        }
    },
    methods: {
        async getPicUrl(musicInfo) {
            this.picurl = await songService.getPicUrl(musicInfo);
        },
        toggleDetails() {
            this.utils.play_component.showing ? this.utils.play_component.hide() : this.utils.play_component.show();
        },
        onArtistClick() {
            if (this.songOnPlay.artist.id) {
                this.$router.push({ name: 'artist', params: { id: this.songOnPlay.artist.id } });
            }
        }
    },
    watch: {
        songOnPlay: {
        immediate: true,
        handler(newSong) {
            if (newSong) {
            this.getPicUrl(newSong)
            }
        }
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
    width: 35%;
    gap: 10px;
}

.album-container {
    position: relative;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
}

.album-image {
    height: 100%;
    aspect-ratio: 1;
    /* width: 48px; */
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

.info-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  /* padding: 5px; */
}

.music-name {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    display: inline-block;
    animation: marquee 10s linear infinite;
}

@keyframes marquee {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(-100%);
    }
}

.info {
    font-size: 14px;
    color: #666;
    margin: 0;
}
.info span {
    /* color: #42b983; */
    text-decoration: none; 
    cursor: pointer;
}
.info span:hover {
    /* text-decoration: underline; */
}

</style>