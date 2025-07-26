<template>
  <detail-layout>
    <template #header>
      <!-- <h1>专辑详情</h1> -->
      <album-header :album="album" />
    </template>

    <template #tabs>
      <!-- 可以添加标签页内容 -->
    </template>
    
    <template #content>
      <card-container layout="compact" :music_info_list="music_info_list" />
    </template>
  </detail-layout>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import DetailLayout from "@/components/page/DetailLayout.vue";
import api from "@/stores/api.js";
import songService from "@/services/songService.js";
import AlbumHeader from "@/views/AlbumHeader.vue";

export default {
  name: 'album',
  components: {
    CardContainer,
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
    async getMusic() {
      try {
        const songList = this.album.songs || []; 
        console.log("获取到的album:", this.album);
        console.log("获取到的歌曲信息:", songList);
        this.music_info_list = songList;
      } catch (error) {
        console.error("Error fetching music:", error.message);
      }
    },
    async getAlbum(){
      this.album  = await songService.getAlbum(this.id)
    },
  },
  async created() {
    await this.getAlbum();
    console.log("获取到的专辑信息:", this.album);
    this.getMusic();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
