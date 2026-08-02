<template>
  <div class="min-h-full">
    <!-- <CardContainer head="今日推荐" layout="card" :music_info_list="music_info_list" /> -->
    <NoLoginBox>
      <template #content>
        <UserCard
          class="search-container m-2 p-2 min-w-[300px]"
          :user="{
            avatarUrl: userStore.user.avatarUrl,
            nickname: userStore.user.nickname,
            signature: userStore.user.signature || '这个人很神秘，什么都没写~',
            // IP: userStore.user.lastLoginIP,
            uid: userStore.user.userId,
          }"
        />
        <div class="flex">
          <BaseCardLayout
            layout="card"
            title="每日推荐"
            :image="cover"
            @click="$router.push({ name: 'daily' })"
            @play="player2.playMulti(dailyRecommend)"
          ></BaseCardLayout>
          <BaseCardLayout
            layout="card"
            title="我的收藏"
            :image="bg2"
            @click="$router.push({ name: 'favorite' })"
          ></BaseCardLayout>
        </div>
      </template>
    </NoLoginBox>

    <div
      v-if="0"
      class="flex-1 shadow-2xl shadow-black md:shadow-none dark:shadow-none bg-card backdrop-blur-lg dark:backdrop-blur-none rounded-t-3xl pt-1"
    ></div>
  </div>
</template>

<script lang="ts">
import cover from "@/assets/image/cover.png";
import bg2 from "@/assets/image/bg2.jpeg";
import songService from "@/services/songService";
import SearchBox from "@/components/public/SearchBox.vue";
import { useUserStore } from "@/stores/userStore";
import player2 from "@/stores/player2";
import { useMusicStore } from "@/stores/musicStore";
import type { Music, Album } from "@/model";

export default {
  name: "Home",
  data() {
    return {
      musicList: [],
      dailyRecommend: [],
      hotList: [],
      userStore: useUserStore(),
      player2,
      bg2,
      cover,
    };
  },
  methods: {
    
    async getDailyRecommend() {
      const musicStore = useMusicStore();
      if (this.userStore.cookies) {
        this.dailyRecommend = await musicStore.getDailyRecommend();
        console.log("获取到的每日推荐歌曲:", this.dailyRecommend);
      } else {
        console.log("未登录");
      }
    },
  },
  async created() {
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
