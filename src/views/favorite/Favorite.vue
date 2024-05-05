<template>
  <List  v-for="info in musicinfo_list" :music_info="info" />
</template>

<script>
import List from '@/components/public/List.vue';
import { utils } from '@/stores/utils';

const info = {
  hash: "71194BC4C1F44C344774719CED11839B"
}

export default {
  name: 'Favorite',
  components: {
    List
  },
  data() {
    return {
      musicinfo_list: [],
      logined: false
    }
  },
  created() {
    this.musicinfo_list = [info]
    console.log(this.musicinfo)
  },
  methods: {
    getFavorites() {
      if (this.utils.user_config.uid == ""){
        logined = false;
      } else {
        this.onError = false;
        var url = "/host/get_collections";
        this.$axios.post(url, querystring.stringify({
          uid: this.utils.user_config.uid
        })).then(res => {
          var data = res.data;
          this.musicinfo_list = data;
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
