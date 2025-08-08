<template>
  <no-login-box>
    <template #content>
      <ContentViewLayout>
        <template #header>
          <div class="flex flex-col justify-center mx-2 mb-2">
            <h1 class="text-4xl font-bold">{{ userStore?.user?.nickname + "的收藏" }}</h1>
          </div>
        </template>
        <template #tabs>
          <Button @click="ToggleLayout"> 切换布局 </Button>
        </template>
        <template #content>
          <songlist-card-container
            v-if="musicinfo_list.length > 0"
            :music_info_list="musicinfo_list"
            :layout="layout"
          >
          </songlist-card-container>
          <div class="w-full flex flex-1 justify-center items-center" v-else>
            <div class="flex flex-col gap-2 items-center">
              <Heart28Filled class="text-primary size-12" />
              <span class="text-xl text-secondary-foreground">空空如也</span>
            </div>
          </div>
        </template>
      </ContentViewLayout>
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
      layout: "card",
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
    ToggleLayout() {
      if (this.layout === "card") {
        this.layout = "list";
      } else {
        this.layout = "card";
      }
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
