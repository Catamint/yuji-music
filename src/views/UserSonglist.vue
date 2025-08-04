<template>
  <songlist-card-container
    class="card-container"
    :music_info_list="music_info_list"
    :head="head + ' : ' + id"
    layout="card"
  />
</template>

<script>
import SonglistCardContainer from "@/components/public/SonglistCardContainer.vue";
import songService from "@/services/songService.js";

export default {
  name: "UserSonglist",
  components: {
    SonglistCardContainer,
  },
  data() {
    return {
      music_info_list: [],
      username: "",
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    head: {
      type: String,
      default: "用户歌单",
    },
  },
  async created() {
    try {
      this.music_info_list = await songService.getUserSonglist(this.id);
      // this.username = await songService.getUsernameById(this.id);
      console.log("获取到的用户歌单信息:", this.music_info_list);
    } catch (error) {
      console.error("Error fetching user songlist:", error);
    }
  },
};
</script>

<style scoped>
/* .card-container {
    margin: 20px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
} */
</style>
