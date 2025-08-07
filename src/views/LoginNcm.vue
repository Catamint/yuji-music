<template>
  <div
    v-if="!userStore.loggedIn()"
    class="flex flex-col h-full w-full items-center justify-center gap-4"
  >
    <div class="grid gap-4 items-center justify-center p-4 rounded-2xl bg-card">
      <h1 class="text-2xl">cookies 登录</h1>
      <p class="text-sm text-muted-foreground">
        PC：打开网易云登录页面，登录成功后在浏览器F12中获取 cookies并粘贴到此处.
      </p>
      <Input placeholder="cookies" v-model="cookies">
        <template #prefix>
          <img src="@/assets/logo.png" alt="Logo" class="h-8 w-8" />
        </template>
      </Input>
      <Button @click="loginCookies(cookies)">登录</Button>
      <p class="text-sm text-muted-foreground">
        Android：点击下方按钮打开网易云登录页面，登录成功后返回此处获取 cookies.
      </p>
      <div class="grid grid-cols-2 gap-2">
        <LoginWebview />
        <AndroidLogin
          @loginCookies="
            (res) => {
              cookies = res;
            }
          "
        />
      </div>
    </div>
    <div class="grid gap-4 items-center w-full p-4 rounded-2xl bg-card">
      <h2 class="text-xl">历史记录</h2>
      <Button
        v-for="item in userStore.history"
        :key="item.cookies"
        @click="loginCookies(item.cookies)"
        >{{ item.nickname }}</Button
      >
    </div>
  </div>
  <div v-else class="flex flex-col h-full w-full items-center justify-center gap-4">
    <div class="grid gap-4 items-center justify-center p-4 rounded-2xl bg-card">
      <h1 class="text-2xl">登录成功</h1>
      <p class="text-sm text-muted-foreground">
        欢迎回来，{{ userStore.user.nickname }}!
      </p>
    </div>
  </div>
</template>

<script>
import AndroidLogin from "@/components/public/AndroidLogin.vue";
import LoginWebview from "@/components/public/LoginWebview.vue";
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
      receivedCookie: "",
      toast,
    };
  },
  mounted() {
    window.addEventListener("message", (event) => {
      // 确保消息来自可信源
      if (event.data.type === "inappbrowser-cookie") {
        console.log("Received cookie from InAppBrowser:", event.data.cookie);
        this.receivedCookie = event.data.cookie;
        // 在这里处理接收到的cookie，例如保存到Vuex或Pinia
      }
    });
  },
  components: {
    Input,
    AndroidLogin,
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
