<template>
  <div>
    <!-- <CardContainer head="今日推荐" layout="card" :music_info_list="music_info_list" /> -->
    <div class="search-container backdrop-blur-lg">
      <h2>搜索音乐</h2>
      <SearchBox class="max-w-[300px]"></SearchBox>
    </div>
    <!-- <AlbumCardContainer :music_info_list="[album]" layout="card" /> -->
    <BaseMusicItem
      layout="card"
      mediaType="Album"
      :musicInfo="{
        id: 0,
        name: '每日推荐',
        artist: '',
        picUrl: bg2,
      }"
      @click="$router.push({ name: 'daily' })"
      @play="player2.playMulti(DailyRecommend)"
    ></BaseMusicItem>
    <!-- <CardContainer head="推荐" subcomponent="halflist" :music_info_list="top_10_list" /> -->
    <CardContainer
      class="shadow-2xl shadow-black md:shadow-none dark:shadow-none bg-card backdrop-blur-lg dark:backdrop-blur-none rounded-t-3xl pt-1"
      head="每日推荐"
      layout="list"
      :music_info_list="DailyRecommend"
    />
  </div>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import bg2 from "@/assets/image/background2.jpeg";
import AlbumCardContainer from "@/components/public/AlbumCardContainer.vue";
import songService from "@/services/songService.js";
import SearchBox from "@/components/public/SearchBox.vue";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";
import player2 from "@/stores/player2";
import { useMusicStore } from "@/stores/musicStore";
// import CardContainerCol from "@/components/public/CardContainerCol.vue";
// import HotSongs from "./HotSongs.vue"

export default {
  name: "Home",
  components: {
    // HotSongs,
    CardContainer,
  },
  data() {
    return {
      music_info_list: [],
      DailyRecommend: [],
      hot_list: [],
      album: [],
      userStore: useUserStore(),
      player2,
      bg2,
    };
  },
  methods: {
    async getTopMusic() {
      try {
        const songList = this.album.songs || [];
        // console.log("获取到的album:", this.album);
        // console.log("获取到的歌曲信息:", songList);
        this.music_info_list = songList;
      } catch (error) {
        console.error("Error fetching top music:", error.message);
      }
    },
    async getDailyRecommend() {
      const musicStore = useMusicStore();
      if (this.userStore.cookies) {
        this.DailyRecommend = await musicStore.getDailyRecommend();
        console.log("获取到的每日推荐歌曲:", this.DailyRecommend);
      } else {
        console.log("未登录");
      }
    },
    async getAlbum() {
      this.album = await songService.getAlbum("245695664");
    },
  },
  async created() {
    await this.getAlbum();
    await this.getDailyRecommend();
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-container {
  margin: 20px;
  padding: 10px;
  max-width: 400px;
  background-color: #ffffff23;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
