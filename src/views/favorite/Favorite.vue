<template>
  <no-login-box>
    <template #content>
      <songlist-card-container
        v-if="musicinfo_list.length > 0"
        :music_info_list="musicinfo_list"
        :head="userStore?.user?.nickname + '的收藏'"
        layout="card"
      />
      <n-empty v-else size="large" description="暂无收藏">
        <template #icon>
          <n-icon>
            <Heart28Filled />
          </n-icon>
        </template>
      </n-empty>
    </template>
  </no-login-box>
</template>

<script>
import { Heart28Filled } from "@vicons/fluent";
import { NButton, NEmpty, NIcon } from "naive-ui";
import songlistCardContainer from "@/components/public/SonglistCardContainer.vue";
import songService from "@/services/songService.js";
import { useUserStore } from "@/stores/userStore";
import NoLoginBox from "@/components/public/NoLoginBox.vue";

export default {
  name: "Favorite",
  components: {
    NEmpty,
    NIcon,
    NButton,
    Heart28Filled,
    NoLoginBox,
  },
  data() {
    return {
      musicinfo_list: [],
      logined: false,
      user: {},
      userStore: useUserStore(),
    };
  },
  created() {
    this.getFavorites();
    console.log(this.musicinfo_list);
  },
  mounted() {},
  methods: {
    async getFavorites() {
      if (this.userStore.loggedIn()) {
        this.musicinfo_list = await songService.getUserSonglist(
          this.userStore.user.userId
        );
      }
    },
    gotoLogin() {
      this.$router.push({
        path: "login_netease",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.no-login-box {
  display: flex;
  height: 60vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
