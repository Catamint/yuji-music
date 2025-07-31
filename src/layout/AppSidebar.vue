<script setup>
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next"
import {
  Sidebar,
} from "@/components/ui/sidebar"

import { useColorMode } from '@vueuse/core'
import { utils } from '@/stores/utils';

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
    url: "#/search",
    icon: Search,
  },
];
const mode = useColorMode()
function toggleColorMode() {
  mode.value = mode.value === 'light' ? 'dark' : 'light';
}

const options = [
  {
    label: "设置",
    key: "settings",
    icon: Settings,
  },
  {
    label: "注销",
    key: "logout",
  },
];

function handleSelect(key) {
    utils.user_config.logout();
    location.reload();
}
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <div class="flex m-2 items-center space-x-2">
        <!-- <img src="@/assets/logo.png" alt="Logo" class="h-8 w-8" /> -->
        <div class="flex items-end space-x-2">
          <span class="text-2xl font-semibold">Music!</span>
          <span class="text">Beta</span>
        </div>
      </div>
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
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="#" @click.prevent="toggleColorMode">
              <span>切换主题</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="#/settings">
              <Settings />
              <span>设置</span>
            </a>
          </SidebarMenuButton>

        </SidebarMenuItem>
      </SidebarMenu>
      <div v-if="utils.user_config.uid != ''">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              {{ utils.user_config.name }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuContent>
              <DropdownMenuItem @click="handleSelect">退出</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>