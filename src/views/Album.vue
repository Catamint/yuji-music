<template>
  <n-scrollbar>
    <AlbumHeader :album="album.album" />
    <CardContainer layout="compact" :music_info_list="music_info_list" />
  </n-scrollbar>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import { NScrollbar } from "naive-ui";
import api from "@/stores/api.js";
import songService from "@/services/songService.js";
import AlbumHeader from "@/views/AlbumHeader.vue";

export default {
  name: 'album',
  components: {
    CardContainer,
    NScrollbar,
    AlbumHeader
  },
  data(){
    return {
        album:[],
        music_info_list: [],
    }
  },
  props:{
    id: {
        type: String,
        default: '',
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
    async getAlbum(){
      this.album  = await songService.getAlbum(this.id)
    },
  },
  async created() {
    await this.getAlbum();
    console.log("获取到的专辑信息:", this.album);
    this.getTopMusic();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
