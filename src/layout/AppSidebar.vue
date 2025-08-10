<script setup>
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next";
import { Sidebar } from "@/components/ui/sidebar";

import { useColorMode } from "@vueuse/core";
import { useUserStore } from "@/stores/userStore";

// Menu items.
const items = [
  {
    title: "首页",
    url: "#",
    icon: Home,
  },
  {
    title: "收藏",
    url: "#/favorite",
    icon: Inbox,
  },
  {
    title: "播放列表",
    url: "#/playlist",
    icon: Calendar,
  },
  {
    title: "搜索",
    url: "#",
    icon: Search,
  },
  {
    title: "登录",
    url: "#/login_netease",
    icon: Settings,
  },
];
const mode = useColorMode();
const userStore = useUserStore();
function toggleColorMode() {
  mode.value = mode.value === "light" ? "dark" : "light";
}

function handleSelect(key) {
  // if (key === "logout") {
  userStore.logout();
  location.reload();
  // }
}
</script>

<template>
  <Sidebar class="backdrop-blur-3xl glass-filter">
    <SidebarHeader>
      <div class="flex m-2 items-center space-x-2">
        <!-- <img src="@/assets/logo.png" alt="Logo" class="h-8 w-8" /> -->
        <div class="flex items-end space-x-2">
          <span class="text-2xl font-semibold">Music!</span>
          <span class="text">Beta</span>
        </div>
      </div>
      <UserCard
        v-if="userStore.loggedIn()"
        class=""
        :short="true"
        :user="{
          avatarUrl: userStore.user.avatarUrl,
          nickname: userStore.user.nickname,
          IP: userStore.user.lastLoginIP,
        }"
      />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <!-- <SidebarGroupLabel>Application</SidebarGroupLabel> -->
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter class="p-4 border-t">
      <SidebarMenu class="space-y-2">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a
              href="#"
              @click.prevent="toggleColorMode"
              class="flex items-center space-x-2 text-sm hover:bg-secondary/80 rounded-md p-2 transition-colors"
            >
              <Sun v-if="mode.value === 'dark'" class="h-4 w-4" />
              <Moon v-else class="h-4 w-4" />
              <span>切换主题</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a
              href="#/settings"
              class="flex items-center space-x-2 text-sm hover:bg-secondary/80 rounded-md p-2 transition-colors"
            >
              <Settings class="h-4 w-4" />
              <span>设置</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <div v-if="userStore.loggedIn()" class="mt-4">
        <DropdownMenu>
          <DropdownMenuTrigger class="w-full">
            <Button variant="outline" class="w-full justify-start gap-2 cursor-pointer">
              <UserCircle class="h-4 w-4" />
              {{ userStore.user.nickname }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="handleSelect" class="cursor-pointer">
              退出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
