<template>
  <div>
    <div
      class="aspect-square relative overflow-hidden"
      :class="{ 'w-12': imgSize == 12, 'w-14': imgSize == 14, 'w-16': imgSize == 16 }"
      v-if="playlistNotNull"
    >
      <img class="w-full h-full rounded-md" :src="picurl" alt="" />
    </div>
    <div class="info-container ml-3 flex flex-1 items-center gap-2">
      <p class="text-[16px] font-bold truncate" :class="{ 'animate-marquee': animation }">
        {{ playlistNotNull ? songOnPlay.name : "正在播放" }}
      </p>
      <p class="hidden md:block hover:underline info">
        <span @click.stop="onArtistClick">{{
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

export default {
  name: "FooterLayout",
  props: {
    msg: String,
    imgSize: {
      type: Number,
      default: 12,
    },
    animation: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    ChevronDoubleUp16Filled,
  },
  data() {
    return {
      player: player2.state,
      picurl: "",
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
      this.picurl = await songService.getPicUrl(musicInfo);
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

.animate-marquee {
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
  text-decoration: none;
  cursor: pointer;
}
</style>
