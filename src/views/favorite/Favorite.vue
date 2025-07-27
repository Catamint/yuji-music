<template>
  <div class="no-login-box" v-if="utils.user_config.uid == ''">
    <n-empty size="large" description="登录后查看你的收藏">
      <template #icon>
        <n-icon>
          <Heart28Filled />
        </n-icon>
      </template>
      <template #extra>
        <n-button @click="gotoLogin" size="small">
          登录
        </n-button>
      </template>
    </n-empty>
  </div>
  <template v-else>
    <n-scrollbar>
      <songlist-card-container
        v-if="musicinfo_list.length > 0"
        :music_info_list="musicinfo_list"
        head="我的收藏"
        layout="card"
      />
      <n-empty v-else size="large" description="暂无收藏">
        <template #icon>
          <n-icon>
            <Heart28Filled />
          </n-icon>
        </template>
      </n-empty>
    </n-scrollbar>
  </template>
</template>

<script>
import { utils } from '@/stores/utils';
import { Heart28Filled } from '@vicons/fluent';
import { NButton, NEmpty, NIcon } from 'naive-ui';
import songlistCardContainer from '@/components/public/SonglistCardContainer.vue';
import songService from '@/services/songService.js';

export default {
  name: 'Favorite',
  components: {
    NEmpty,
    NIcon,
    NButton,
    Heart28Filled,
  },
  data() {
    return {
      musicinfo_list: [],
      logined: false,
      utils
    }
  },
  created() {
    this.getFavorites();
    console.log(this.musicinfo_list);
  },
  mounted() {

  },
  methods: {
    async getFavorites() {
      const uid = this?.utils?.user_config?.uid;
      if (uid) {
        console.log("获取收藏列表" + uid);
        this.musicinfo_list = await songService.getUserSonglist(uid);
      }
    },
    gotoLogin() {
      this.$router.push({
        path: 'login_netease',
      });
    }
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
