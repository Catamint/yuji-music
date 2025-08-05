<template>
  <div class="flex flex-col h-full w-full items-center justify-center gap-4">
    <div class="grid gap-4 items-center justify-center p-4 rounded-2xl bg-card">
      <h1 class="text-2xl">cookies 登录</h1>
      <Input placeholder="cookies" v-model="cookies">
        <template #prefix>
          <img src="@/assets/logo.png" alt="Logo" class="h-8 w-8" />
        </template>
      </Input>
      <Button @click="loginCookies(cookies)">登录</Button>
    </div>
    <div class="flex gap-4 items-center justify-center p-4 rounded-2xl bg-card">
      <h2 class="text-xl">历史记录</h2>
      <Button
        v-for="item in userStore.history"
        :key="item.cookies"
        @click="loginCookies(item.cookies)"
        >{{ item.nickname }}</Button
      >
    </div>
  </div>
</template>

<script>
import Input from "@/components/ui/input/Input.vue";
import { useUserStore } from "@/stores/userStore";
import { toast } from "vue-sonner";

export default {
  name: "LoginNcm",
  data() {
    return {
      username: "",
      pwd: "",
      cookies: "",
      userStore: useUserStore(),
      toast,
    };
  },
  mounted() {},
  components: {
    Input,
  },
  methods: {
    async loginCookies(cookies) {
      const res = await this.userStore.loginCookies(cookies);
      if (res) {
        console.log("登录成功" + this.userStore.user);
        this.$router.push({ path: "/favorite" });
      } else {
        this.toast.error("登录失败", {
          description: "cookies可能错误或过期，请重试o(╥_╥)o",
          richColors: true,
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
