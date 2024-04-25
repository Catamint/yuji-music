<template>
  <HotSongs :music_info_list="music_info_list" />
  <HotSongs :music_info_list="music_info_list" />
  <HotSongs :music_info_list="music_info_list" />
</template>

<script>
import HotSongs from "./HotSongs.vue"

export default {
  name: 'Home',
  components: {
    HotSongs
  },
  data(){
    return {
        music_info_list: []
    }
  },
  methods:{
    getTopMusic() {
            this.$axios.get("/mobilecdngz-kugou/api/v3/rank/song?version=9068&ranktype=2&plat=0&pagesize=100&area_code=1&page=1&volid=34533&rankid=8888&with_res_tag=1").then(res => {
                var getted = JSON.parse(res.data.replace("<!--KG_TAG_RES_START-->","").replace("<!--KG_TAG_RES_END-->","")).data.info.slice(82,92);
                this.music_info_list = getted;
                // console.log(getted);
            })
            // return
    }
  },
  mounted() {
    this.getTopMusic();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
