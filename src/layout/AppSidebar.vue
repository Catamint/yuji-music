<script setup>
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  if (key === "logout") {
    utils.user_config.logout();
    location.reload();
  } else if (key === "settings") {
    // Handle settings action if needed
  }
}
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <a :href="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
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
            <n-dropdown n-button :options="options" @select="handleSelect">
                <Button>{{ utils.user_config.name }}</Button>
            </n-dropdown>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>