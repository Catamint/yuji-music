<template>
  <div>
    <div
      class="relative flex justify-center items-center h-full cursor-pointer truncate"
      v-show="playlistNotNull"
      @click=""
    >
      <img class="album-image w-3xs aspect-square mb-4" :src="picurl" alt="" />
    </div>
    <div class="info-container">
      <p class="music-name truncate">
        {{ playlistNotNull ? songOnPlay.name : "正在播放" }}
      </p>
      <p class="info">
        <span @click="onArtistClick">{{
          playlistNotNull ? songOnPlay.artist.name : "歌手"
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import player2 from "@/stores/player2";
import { ChevronDoubleUp16Filled } from "@vicons/fluent";
import songService from "@/services/songService.js";
import { useUiStore } from "@/stores/uiStore";

export default {
  name: "FooterLayout",
  props: {
    msg: String,
  },
  components: {
    ChevronDoubleUp16Filled,
  },
  data() {
    return {
      player: player2.state,
      picurl: "",
      uiStore: useUiStore(),
    };
  },
  computed: {
    songOnPlay() {
      return this.player.playlist.at(this.player.currentIndex) || {};
    },
    playlistNotNull() {
      return this.player.playlist.length != 0;
    },
  },
  methods: {
    async getPicUrl(musicInfo) {
      this.picurl = await songService.getPicUrl(musicInfo, 600);
    },
    onArtistClick() {
      if (this.songOnPlay.artist.id) {
        this.$router.push({ name: "artist", params: { id: this.songOnPlay.artist.id } });
      }
    },
  },
  watch: {
    songOnPlay: {
      immediate: true,
      handler(newSong) {
        if (newSong) {
          this.getPicUrl(newSong);
        }
      },
    },
  },
};
</script>

<style scoped>
.album-image {
  /* height: 100%; */
  /* aspect-ratio: 1; */
  /* width: 48px; */
  border-radius: 10px;
  transition: all 0.3s ease;
}

.info-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  /* padding: 5px; */
}

.music-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.info {
  font-size: 14px;
  color: #666;
  margin: 0;
}
.info span {
  text-decoration: none;
  cursor: pointer;
}
</style>
