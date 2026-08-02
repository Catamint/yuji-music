<template>
  <div>
    <div
      class="relative flex justify-center items-center h-full cursor-pointer truncate"
      v-show="playlistNotNull"
      @click=""
    >
      <img class="album-image w-3xs aspect-square mb-4" :src="songOnPlay?.getPicUrl(600)" alt="" />
    </div>
    <div class="info-container">
      <p class="music-name truncate">
        {{ playlistNotNull ? songOnPlay?.name : "正在播放" }}
      </p>
      <p class="info">
        <span @click="onArtistClick">{{
          playlistNotNull ? songOnPlay?.getArtistInfo()?.name : "歌手"
        }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import player2 from "@/stores/player2";
import { ChevronDoubleUp16Filled } from "@vicons/fluent";
import songService from "@/services/songService";
import { useUiStore } from "@/stores/uiStore";
import defaultPic from "@/assets/image/default_cover.jpg";
import type { Music } from "@/model";

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
      picurl: defaultPic,
      uiStore: useUiStore(),
    };
  },
  computed: {
    songOnPlay(): Music | null {
      return this.player.playlist.at(this.player.currentIndex) || null;
    },
    playlistNotNull() {
      return this.player.playlist.length != 0;
    },
  },
  methods: {

    onArtistClick() {
      if (this.songOnPlay?.getArtistInfo()?.id) {
        this.$router.push({ name: "artist", params: { id: this.songOnPlay.getArtistInfo().id } });
      }
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
