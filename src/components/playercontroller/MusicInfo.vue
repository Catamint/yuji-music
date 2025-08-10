<template>
  <div class="w-full flex items-center truncate">
    <!-- 图片容器，固定大小，禁止收缩 -->
    <div
      class="aspect-square relative overflow-hidden shrink-0"
      :class="{ 'w-12': imgSize == 12, 'w-14': imgSize == 14, 'w-16': imgSize == 16 }"
      v-if="playlistNotNull"
    >
      <img class="w-full h-full rounded-md" :src="picurl" alt="" />
    </div>

    <!-- 信息容器，允许收缩 -->
    <div class="ml-3 flex flex-1 min-w-0 items-center gap-2">
      <!-- 歌名，flex-1 + min-w-0 保证可收缩 -->
      <p
        class="flex-1 min-w-0 text-[16px] font-bold truncate"
        :class="{ 'animate-marquee': animation }"
      >
        {{ playlistNotNull ? songOnPlay.name : "正在播放" }}
      </p>

      <!-- 歌手，禁止收缩 -->
      <p class="hidden xl:block hover:underline shrink-0">
        <span @click.stop="onArtistClick">
          {{ playlistNotNull ? songOnPlay.artist.name : "歌手" }}
        </span>
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
