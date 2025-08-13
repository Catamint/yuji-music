<template>
  <div class="min-h-full">
    <!-- <CardContainer head="今日推荐" layout="card" :music_info_list="music_info_list" /> -->
    <div class="search-container bg-card backdrop-blur-lg m-2 p-2">
      <h2>搜索音乐</h2>
      <SearchBox class="max-w-[300px]"></SearchBox>
    </div>
    <!-- <AlbumCardContainer :music_info_list="[album]" layout="card" /> -->
    <NoLoginBox>
      <template #content>
        <UserCard
          class="search-container m-2 p-2 min-w-[300px]"
          :user="{
            avatarUrl: userStore.user.avatarUrl,
            nickname: userStore.user.nickname,
            signature: userStore.user.signature || '这个人很神秘，什么都没写~',
            IP: userStore.user.lastLoginIP,
            uid: userStore.user.userId,
          }"
        />
        <div class="flex">
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
          <BaseMusicItem
            layout="card"
            mediaType="Album"
            :musicInfo="{
              id: 0,
              name: '我的收藏',
              artist: '',
              picUrl: cover,
            }"
            @click="$router.push({ name: 'favorite' })"
          ></BaseMusicItem>
        </div>
      </template>
    </NoLoginBox>

    <div
      v-if="0"
      class="flex-1 shadow-2xl shadow-black md:shadow-none dark:shadow-none bg-card backdrop-blur-lg dark:backdrop-blur-none rounded-t-3xl pt-1"
    ></div>
  </div>
</template>

<script>
import CardContainer from "@/components/public/CardContainer.vue";
import bg from "@/assets/image/background.png";
import bg2 from "@/assets/image/bg2.jpeg";
import cover from "@/assets/image/cover.png";
import songService from "@/services/songService.js";
import SearchBox from "@/components/public/SearchBox.vue";
import { useUserStore } from "@/stores/userStore";
import player2 from "@/stores/player2";
import { useMusicStore } from "@/stores/musicStore";

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
      bg,
      cover,
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
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
