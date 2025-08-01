<template>
  <div class="grid grid-cols-[1fr_3fr_1fr] ml-2 items-center">
    <SidebarTrigger class="" />
    <div class="flex w-full items-center justify-center">
      <SearchBox class="max-w-md py-1 flex-1"></SearchBox>
    </div>

    <!-- <router-link to="/settings"><n-button>设置</n-button></router-link> -->
    <!-- <router-link v-if="utils.user_config.uid == ''" to="/login"><n-button>登录</n-button></router-link> -->
  </div>
</template>

<script>
import { utils } from "@/stores/utils";
import { NButton, NInput, NSpace, NInputGroup, NDropdown } from "naive-ui";
import { Button } from "@/components/ui/button";
import { RouterLink } from "vue-router";
import SearchBox from "@/components/public/SearchBox.vue";

export default {
  name: "HeaderLayout",
  props: {
    msg: String,
  },
  components: {
    NInput,
    NInputGroup,
    NButton,
    RouterLink,
    NSpace,
    NDropdown,
    Button,
    SearchBox,
  },
  mounted() {},
  data() {
    return {
      kw: "",
      utils,
    };
  },
  methods: {
    search_music() {
      // this.$router.push({path: '/'})
      // this.reloadPage();
      var kw = this.kw;
      this.reloadPage();
      this.$router.push({
        name: "searchpage",
        params: {
          kw: kw,
          page: 1,
          qurl: "/host/get_search_result",
        },
      });
      this.reloadPage();
    },
    handleSelect(key) {
      // console.log(key);
      if (key == "logout") {
        this.utils.user_config.logout();
        location.reload();
      }
    },
  },
  inject: ["reloadPage"],
};
</script>

<style scoped>
.player {
  box-sizing: border-box;
  padding-left: 40px;
  padding-right: 40px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  /* height: 10%; */
  border-radius: 20px;
  width: 100%;
}

.n-input {
  display: inline-flex;
  align-items: center;
  width: 40%;
  max-width: 200px;
  height: 80%;
  max-height: 34px;
}
</style>
