<template>
  <no-login-box>
    <template #content>
      <songlist-card-container
        v-if="musicinfo_list.length > 0"
        :music_info_list="musicinfo_list"
        :head="userStore?.user?.nickname + '的收藏'"
        layout="card"
      />
      <div class="w-full h-full flex justify-center items-center" v-else>
        <div class="flex flex-col gap-2 items-center">
          <Heart28Filled class="text-primary size-12" />
          <span class="text-xl text-secondary-foreground">空空如也</span>
        </div>
      </div>
    </template>
  </no-login-box>
</template>

<script>
import { Heart28Filled } from "@vicons/fluent";
import songService from "@/services/songService.js";
import { useUserStore } from "@/stores/userStore";
import NoLoginBox from "@/components/public/NoLoginBox.vue";

export default {
  name: "Favorite",
  components: {
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
