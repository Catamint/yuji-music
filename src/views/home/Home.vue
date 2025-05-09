<template>
  <n-scrollbar>
    <CardContainer subcomponent="list" :music_info_list="music_info_list" />
    <!-- <CardContainer head="精选" :music_info_list="top_10_list" /> -->
    <!-- <CardContainer head="推荐" subcomponent="halflist" :music_info_list="top_10_list" /> -->
  </n-scrollbar>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import { NScrollbar } from "naive-ui";
import api from "@/stores/api.js";
import { formatSongList } from "@/services/songService.js"
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
    }
  },
  methods:{
    async getTopMusic() {
      try {
        const res = await api.search("美好的非人类生活"); 
        // let res = await api.gdstudioSearch('海阔天空');
        // let res = await api.gdstudioGetSong('netease','347230');
        console.log(res);
        const songList = await formatSongList(res.result);
        console.log(songList);
        this.music_info_list = songList;
      } catch (error) {
        console.error("Error fetching top music:", error.message);
      }
      // var axios = require('axios');

      // var config = {
      //   method: 'get',
      //   url: 'https://music-api.gdstudio.xyz/api.php?types=search&source=netease&name=海阔天空&count=20&pages=1',
      //   headers: { }
      // };

      // axios(config)
      // .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      
    },
    getTop10Music(){
      this.$axios.get("/host/get_home_info").then(res => {
        let getted = res.data;
        this.top_10_list = getted;
        console.log(getted);
        // console.log(getted);
      })
    },
    getHotMusic(){
      this.$axios.get("/host/get_home_info_2").then(res => {
        var getted2 = res.data;
        this.hot_list = getted2;
        // console.log(getted);
      })
    }
  },
  created() {
    this.getTopMusic();
    // this.getTop10Music();
    // this.getHotMusic();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
