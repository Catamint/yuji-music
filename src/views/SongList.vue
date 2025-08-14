<template>
  <ContentViewLayout :loading="loading" :onError="onError">
    <template #header>
      <!-- <h1>专辑详情</h1> -->
      <img
        class="ratio-1-1 mr-4 h-40 rounded-xl"
        :src="details?.coverImgUrl + '?param=300y300' || null"
        alt="艺术家封面"
      />
      <div class="h-full flex flex-col gap-4">
        <h1 class="text-4xl font-bold">
          {{ details?.name }}
        </h1>
        <div class="album-meta">{{ songList?.total }}<span> 首音乐</span></div>
        <Button @click="playAll(songList)"> <Play20Regular />播放全部 </Button>
      </div>
    </template>

    <template #tabs>
      <!-- 可以添加标签页内容 -->
    </template>

    <template #content>
      <card-container layout="compact" :music_info_list="songList.songs" />
    </template>
  </ContentViewLayout>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import ContentViewLayout from "@/components/layout/ContentViewLayout.vue";
import songService from "@/services/songService.js";
import player2 from "@/stores/player2.js";
import { Play20Regular } from "@vicons/fluent";
import { toast } from "vue-sonner";

export default {
  name: "songList",
  components: {
    CardContainer,
    Play20Regular,
  },
  data() {
    return {
      details: {},
      songList: {},
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
  async created() {
    try {
      this.details = await songService.getPlaylistDetail(this.id);
      console.log("获取到的歌单详情:", this.details);
      this.songList = await songService.getSonglistContent(this.id);
      console.log("获取到的歌单信息:", this.songList);
    } catch (error) {
      console.error("Error fetching songlist:", error);
      this.onError = true;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    playAll: async (songList) => {
      console.log("播放全部操作");
      console.log("专辑歌曲列表:", songList);
      await player2.playMulti(songList.songs || []);
    },
  },
};
</script>
