<template>
  <div
    v-if="!userStore.loggedIn()"
    class="flex flex-col h-full w-full items-center justify-center gap-4"
  >

    <div v-if="loginType === 'cookies'" class="grid gap-4 items-center justify-center p-4 rounded-2xl bg-card">
      <h1 class="text-2xl">cookies 登录</h1>
      <p class="text-sm text-muted-foreground">
        PC：打开网易云登录页面，登录成功后在浏览器F12中获取 cookies并粘贴到此处.
      </p>
      <Input placeholder="cookies" v-model="cookies">
        <template #prefix> </template>
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

    <div v-else-if="loginType === 'account'" class="grid gap-4 items-center justify-center p-4 rounded-2xl bg-card">
      <h1 class="text-2xl">手机号登录</h1>
      <p class="text-sm text-muted-foreground">
      </p>
      <InputGroup>
        <InputGroupInput placeholder="手机号" v-model="phoneNumber" @input="phoneNumber = phoneNumber.replace(/\D/g, '').slice(0, 11)" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            :active="!!phoneNumber"
            :disabled="countdown > 0"
            @click="queryCodes(phoneNumber)"
            >{{ countdown > 0 ? `${countdown}s` : '获取验证码' }}</InputGroupButton
          >
        </InputGroupAddon>
      </InputGroup>
      <Input
        placeholder="验证码"
        type="text"
        inputmode="numeric"
        v-model="codes"
        @input="codes = codes.replace(/\D/g, '').slice(0, 6)"
      >
        <template #prefix> </template>
      </Input>
      <Button @click="loginByPhone(phoneNumber, codes)">登录</Button>
    </div>

    <div v-else-if="loginType === 'qr'" class="grid gap-4 items-center justify-center p-4 rounded-2xl bg-card">
      <h1 class="text-2xl">扫码登录</h1>
      <p class="text-sm text-muted-foreground">
        请使用网易云音乐APP扫描二维码进行登录。
      </p>
      <AndroidLogin
        @loginCookies="
          (res) => {
            cookies = res;
          }
        "
      />
    </div>

    <Tabs v-model="loginType">
      <TabsList>
        <TabsTrigger value="cookies">cookies 登录</TabsTrigger>
        <TabsTrigger value="account">手机号登录</TabsTrigger>
        <TabsTrigger value="qr">扫码登录</TabsTrigger>
      </TabsList>
    </Tabs>

    <div class="grid gap-4 items-center w-full max-w-md p-4 rounded-2xl bg-card">
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs/index.js";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group/index.js";
import Input from "@/components/ui/input/Input.vue";
import { useUserStore } from "@/stores/userStore";
import { toast } from "vue-sonner";

export default {
  name: "LoginNcm",
  data() {
    return {
      phoneNumber: "",
      codes: "",
      cookies: "",
      userStore: useUserStore(),
      receivedCookie: "",
      toast,
      loginType: "cookies",
      countdown: 0,
      timer: null,
    };
  },
  beforeUnmount() {
    clearInterval(this.timer);
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
    AndroidLogin
  },
  methods: {
    async loginCookies(cookies) {
      const res = await this.userStore.loginCookies(cookies);
      if (res) {
        console.log("登录成功" + this.userStore.user);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.$router.back();
      } else {
        this.toast.error("登录失败", {
          description: "cookies可能错误或过期，请重试o(╥_╥)o",
          richColors: true,
        });
      }
    },
    isValidPhone(phoneNumber) {
      return /^1[3-9]\d{9}$/.test(phoneNumber);
    },
    isValidCode(codes) {
      return /^\d{4,6}$/.test(codes);
    },
    startCountdown() {
      this.countdown = 60;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.countdown -= 1;
        if (this.countdown <= 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    async loginByPhone(phoneNumber, codes) {
      if (!this.isValidPhone(phoneNumber)) {
        this.toast.error("手机号格式错误", {
          description: "请输入正确的11位手机号",
          richColors: true,
        });
        return;
      }
      if (!this.isValidCode(codes)) {
        this.toast.error("验证码格式错误", {
          description: "请输入4-6位数字验证码",
          richColors: true,
        });
        return;
      }
      const res = await this.userStore.loginByPhone(phoneNumber, codes);
      if (res) {
        console.log("登录成功" + this.userStore.user);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.$router.back();
      } else {
        this.toast.error("登录失败", {
          description: "验证码可能错误或过期，请重试o(╥_╥)o",
          richColors: true,
        });
      }
    },
    async queryCodes(phoneNumber) {
      if (!this.isValidPhone(phoneNumber)) {
        this.toast.error("手机号格式错误", {
          description: "请输入正确的11位手机号",
          richColors: true,
        });
        return;
      }
      const res = await this.userStore.queryCodes(phoneNumber);
      if (res) {
        this.toast.success("验证码发送成功", {
          description: "请注意查收短信，验证码可能会有延迟，请耐心等待o(╥_╥)o",
          richColors: true,
        });
        this.startCountdown();
      } else {
        this.toast.error("验证码发送失败", {
          description: "请检查手机号是否正确，或稍后重试o(╥_╥)o",
          richColors: true,
        });
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
