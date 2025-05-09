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
      <List v-for="info in musicinfo_list" :music_info="info" :isFavorite="true"/>
    </n-scrollbar>
  </template>
</template>

<script>
import { utils } from '@/stores/utils';
import { Heart28Filled } from '@vicons/fluent';
import { NButton, NEmpty, NIcon, NScrollbar } from 'naive-ui';
import querystring from 'querystring';

const info = {
  hash: "71194BC4C1F44C344774719CED11839B"
}

export default {
  name: 'Favorite',
  components: {
    NEmpty,
    NIcon,
    NButton,
    Heart28Filled,
    NScrollbar
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
    getFavorites() {
      if (this.utils.user_config.uid == "") {
        // logined = false;
        // console.log("未登录")
      } else {
        var url = "/host/get_collections";
        this.$axios.post(url, querystring.stringify({ 
            uid: this.utils.user_config.uid
        })).then(res => { 
            var data =res.data
            // console.log(data);
            this.musicinfo_list = data;
        }).catch(function (error) {
            console.log(error);
        })
      }
    },
    search_music(page){

    },
    gotoLogin() {
      this.$router.push({
        path: 'login'
      });
    }
  }
}
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
