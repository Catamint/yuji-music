<template>
  <ContentViewLayout :loading="loading" :onError="onError">
    <template #header>
      <!-- <h1>专辑详情</h1> -->
      <img
        class="ratio-1-1 mr-4 h-40 rounded-xl"
        :src="songList.picUrl + '?param=300y300' || ''"
        alt="艺术家封面"
      />
      <div class="h-full flex flex-col gap-4">
        <h1 class="text-4xl font-bold">
          {{ songList?.name }}
        </h1>
        <div class="album-meta">{{ songList?.trackCount }}<span> 首音乐</span></div>
        <Button @click="playAll(songList)"> <Play20Regular />播放全部 </Button>
      </div>
    </template>

    <template #tabs>
      <!-- 可以添加标签页内容 -->
    </template>

    <template #content>
      <music-container layout="compact" :musicList="musicList" />
    </template>
  </ContentViewLayout>
</template>

<script lang="ts">
import MusicContainer from "@/components/contents/MusicContainer.vue";
import ContentViewLayout from "@/components/layout/ContentViewLayout.vue";
import songService from "@/services/songService";
import player2 from "@/stores/player2";
import { Play20Regular } from "@vicons/fluent";
import type { Music, Album, Artist, SongList } from "@/model";

export default {
  name: "songList",
  components: {
    CardContainer: MusicContainer,
    Play20Regular,
  },
  data() {
    return {
      songList: {} as SongList,
      loading: true,
      onError: false,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  computed: {
    musicList() {
      return this.songList.getMusics();
    },
  },
  async created() {
    try {
      this.songList = await songService.getPlaylistDetail(this.id);
      console.log("获取到的歌单详情:", this.songList);
    } catch (error) {
      console.error("Error fetching songlist:", error);
      this.onError = true;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    playAll: async (songList: SongList) => {
      console.log("播放全部操作");
      console.log("专辑歌曲列表:", songList);
      await player2.playMulti(songList.getMusics() || []);
    },
  },
};
</script>
