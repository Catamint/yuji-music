<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <n-button class="toggle-button" @click="toggleSidebar" :class="{ collapsed: !isCollapsed }">
      {{ isCollapsed ? '>' : '<' }}
    </n-button>
    <n-menu
      :mode="menuMode"
      :options="menuOptions"
      :default-expanded-keys="defaultExpandedKeys"
      :collapsed="isCollapsed"
    />

  </div>
</template>

<script>
import { h, ref, onMounted, onBeforeUnmount } from "vue";
import { NButton, NIcon, NMenu } from "naive-ui";
import { RouterLink } from "vue-router";
import { Guitar20Filled, Heart28Filled, Home24Filled, KeyboardLayoutOneHandedLeft24Filled, MathFormula24Filled, MoviesAndTv24Filled, MusicNote120Filled, PeopleCommunity24Filled, SportHockey24Filled, TextBulletListSquare24Filled } from "@vicons/fluent";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: () => h(
      RouterLink,
      { to: "/" },
      { default: () => "首页" }
    ),
    key: "home",
    icon: renderIcon(Home24Filled)
  },
  {
    label: () => h(
      RouterLink,
      { to: "/favorite" },
      { default: () => "收藏" }
    ),
    key: "favorite",
    icon: renderIcon(Heart28Filled)
  },
  {
    label: () => h(
      RouterLink,
      { to: "/playlist" },
      { default: () => "播放列表" }
    ),
    key: "playlist",
    icon: renderIcon(TextBulletListSquare24Filled)
  },
  {
    label:() => h(
      RouterLink,
      { to: "/settings" },
      { default: () => "设置" }
    ),
    key: "settings",
    icon: renderIcon(SportHockey24Filled)
  }
  // {
  //   label: "音乐工坊",
  //   key: "create",
  //   icon: renderIcon(MusicNote120Filled),
  //   children: [
  //     {
  //       label: () => h(
  //         RouterLink,
  //         { to: "/piano" },
  //         { default: () => "钢琴" }
  //       ),
  //       key: "piano",
  //       icon: renderIcon(KeyboardLayoutOneHandedLeft24Filled)
  //     },
  //     {
  //       label: () => h(
  //         RouterLink,
  //         { to: "/drum" },
  //         { default: () => "鼓" }
  //       ),
  //       key: "drum",
  //       icon: renderIcon(SportHockey24Filled)
  //     },
  //     {
  //       label: () => h(
  //         RouterLink,
  //         { to: "/guitar" },
  //         { default: () => "吉他" }
  //       ),
  //       key: "guitar",
  //       icon: renderIcon(Guitar20Filled)
  //     }
  //   ]
  // },
  // {
  //   label: () => h(
  //     RouterLink,
  //     { to: "/together" },
  //     { default: () => "音乐共创" }
  //   ),
  //   key: "ChooseTeam",
  //   icon: renderIcon(PeopleCommunity24Filled)
  // },
  // {
  //   label: () => h(
  //     RouterLink,
  //     { to: "/generate" },
  //     { default: () => "音乐生成" }
  //   ),
  //   key: "音乐生成",
  //   icon: renderIcon(MathFormula24Filled)
  // }
];

export default {
  name: "SidebarLayout",
  setup() {
    const isCollapsed = ref(false);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    // 响应式菜单模式
    const menuMode = ref(window.innerWidth < 768 ? 'vertical' : 'horizontal')

    function updateMenuMode() {
      menuMode.value = window.innerWidth < 768 ? 'vertical' : 'horizontal'
    }

    onMounted(() => {
      window.addEventListener('resize', updateMenuMode)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateMenuMode)
    })
    return {
      menuOptions,
      defaultExpandedKeys: ["create"],
      isCollapsed,
      toggleSidebar
    };
  }
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 200px;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 50px;
}

@media (max-width: 600px) {
  .sidebar {
    width: 100%;
  }
}

.toggle-button {
  align-self: flex-end;
  margin-inline: 10px;
  /* background-color: #007bff; */
  /* color: white; */
  /* border: none; */
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 12px;
}
.toggle-button.collapsed{
    z-index: 10;
    margin: 10px;
    position: absolute;
}

.n-menu {
  transition: all 0.3s ease;
}

.n-menu.collapsed .n-menu-item-content {
  display: none;
}
</style>