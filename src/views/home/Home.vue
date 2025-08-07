<template>
  <div>
    <!-- <CardContainer head="今日推荐" layout="card" :music_info_list="music_info_list" /> -->
    <div class="search-container">
      <h2>搜索音乐</h2>
      <SearchBox class="max-w-[300px]"></SearchBox>
    </div>
    <AlbumCardContainer :music_info_list="[album]" layout="card" />
    <CardContainer head="每日推荐" :music_info_list="DailyRecommend" />
    <!-- <CardContainer head="推荐" subcomponent="halflist" :music_info_list="top_10_list" /> -->
  </div>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import AlbumCardContainer from "@/components/public/AlbumCardContainer.vue";
import songService from "@/services/songService.js";
import SearchBox from "@/components/public/SearchBox.vue";
import { useUserStore } from "@/stores/userStore";
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
      if (this.userStore.cookies) {
        this.DailyRecommend = await songService.getDailyRecommendedSongs();
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
