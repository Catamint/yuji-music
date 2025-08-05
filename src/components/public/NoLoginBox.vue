<template>
  <div class="no-login-box" v-if="!userStore.loggedIn()">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>需要登录</CardTitle>
        <CardDescription>还没有登录哦o(╥_╥)o</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button @click="gotoLogin"> 登录 </Button>
      </CardFooter>
    </Card>
  </div>
  <template v-else>
    <slot name="content"></slot>
  </template>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Button from "@/components/ui/button/Button.vue";

const userStore = useUserStore();
const router = useRouter();

const gotoLogin = () => {
  router.push({ path: "/login_netease" });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.no-login-box {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
