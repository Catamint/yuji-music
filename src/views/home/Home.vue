<template>
  <n-scrollbar>
    <CardContainer head="今日推荐" layout="card" :music_info_list="music_info_list" />
    <AlbumCard
      :music_info_list="[album]"
      layout="card"
    />
    <!-- <CardContainer head="精选" :music_info_list="top_10_list" /> -->
    <!-- <CardContainer head="推荐" subcomponent="halflist" :music_info_list="top_10_list" /> -->
  </n-scrollbar>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import AlbumCard from "@/components/public/AlbumCard.vue";
import { NScrollbar } from "naive-ui";
import api from "@/stores/api.js";
import songService from "@/services/songService.js";
// import CardContainerCol from "@/components/public/CardContainerCol.vue";
// import HotSongs from "./HotSongs.vue"

export default {
  name: 'Home',
  components: {
    // HotSongs,
    CardContainer,
    NScrollbar
  },
  data(){
    return {
        music_info_list: [],
        top_10_list: [],
        hot_list: [],
        album: [],
    }
  },
  methods:{
    async getTopMusic() {
      try {
        const songList = this.album.songs || []; 
        console.log("获取到的album:", this.album);
        console.log("获取到的歌曲信息:", songList);
        this.music_info_list = songList;
      } catch (error) {
        console.error("Error fetching top music:", error.message);
      }
    },
    getTop10Music(){
      this.$axios.get("/host/get_home_info").then(res => {
        let getted = res.data;
        this.top_10_list = getted;
        console.log(getted);
        // console.log(getted);
      })
    },
    async getAlbum(){
      this.album  = await songService.getAlbum("245695664")
    },
  },
  async created() {
    await this.getAlbum();
    console.log("获取到的专辑信息:", this.album);
    this.getTopMusic();
    // this.getTop10Music();
    // this.getHotMusic();
  },
  mounted() {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
