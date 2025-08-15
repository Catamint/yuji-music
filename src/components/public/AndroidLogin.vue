<script setup lang="ts">
import { ref, onMounted } from "vue";
import { CookieManager } from "my-cookie-manager/src";
const isLoggedIn = ref(false);
const cookies = ref("");
import { toast } from "vue-sonner";
import { Button } from "../ui/button";
const emit = defineEmits(["loginCookies"]);

async function getCookie() {
  try {
    const result = await CookieManager.getCookies({
      url: "https://y.music.163.com",
    });
    console.log("Got cookies from native:", result);
    cookies.value = result.cookies;
    if (!cookies.value) {
      throw new Error("未获取到cookies");
    }
    const match = cookies.value.match(/MUSIC_U=([^;]+)/);
    if (match) {
      // 将 cookies 传递给父组件
      emit("loginCookies", "MUSIC_U=" + match[1]);
    } else {
      throw new Error("cookies不包含MUSIC_U");
    }
  } catch (err) {
    console.error("获取失败", err);
    toast.error("获取失败：" + err, {
      richColors: true,
    });
  }
}
</script>

<template>
  <Button @click="getCookie">获取cookie</Button>
</template>
