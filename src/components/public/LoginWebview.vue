<template>
  <Button @click="openAndGetCookies">打开网易云登录页</Button>
</template>

<script setup>
import { Button } from "../ui/button";
const openAndGetCookies = () => {
  // 目标URL，例如你的登录页面
  const targetUrl = "https://music.163.com/#/login";
  const browser = cordova.InAppBrowser.open(targetUrl, "_blank", "location=yes");

  // 当浏览器加载完成时
  browser.addEventListener("loadstop", (event) => {
    // 可以监听URL变化，当登录成功时
    if (event.url.startsWith("https://y.music.163.com/m")) {
      // 在这里执行获取cookie的逻辑，并关闭InAppBrowser
      //   browser.close();
    }
  });

  // 如果需要，你可以监听页面的loadstart, loaderror, exit等事件
  browser.addEventListener("exit", (event) => {
    console.log("InAppBrowser closed");
    // 在这里调用 Capacitor 插件来获取 Cookie
  });
};
</script>
