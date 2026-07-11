<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <GridLayout
      v-model:layout="layout"
      :col-num="3"
      :row-height="180"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="saveLayout"
    >
      <!-- 搜索卡片 -->
      <GridItem v-for="item in cardList" :key="item.i" v-bind="item">
        <component :is="item.component" />
      </GridItem>
    </GridLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GridLayout, GridItem } from "vue-grid-layout";
import { useUserStore } from "@/stores/userStore";
import { useMusicStore } from "@/stores/musicStore";

// 已有封装组件
import BaseCardLayout from "@/components/layout/BaseCardLayout.vue";
import BaseMusicItem from "@/components/public/BaseMusicItem.vue";
import CardContainer from "@/components/public/CardContainer.vue";
// import UserInfoCard from "@/components/UserInfoCard.vue";
// import LoginPromptCard from "@/components/LoginPromptCard.vue";
import SearchBox from "@/components/public/SearchBox.vue";
// import LyricDisplay from "@/components/LyricDisplay.vue";

const userStore = useUserStore();
const musicStore = useMusicStore();

const dailyRecommend = ref([]);
const myCollections = ref([]);
const myLikes = ref([]);
const currentLyric = ref("");

// 卡片组件映射
const cardList = ref([
  { i: "search", x: 0, y: 0, w: 3, h: 1, component: SearchBox },
  //   {
  //     i: "userinfo",
  //     x: 0,
  //     y: 1,
  //     w: 1,
  //     h: 2,
  //     component: userStore.cookies ? UserInfoCard : LoginPromptCard,
  //   },
  {
    i: "collections",
    x: 1,
    y: 1,
    w: 2,
    h: 2,
    component: {
      template: `<BaseCardLayout head="📂 我的收藏列表"><CardContainer :music_info_list="myCollections" layout="list"/></BaseCardLayout>`,
      components: { BaseCardLayout, CardContainer },
      setup() {
        return { myCollections };
      },
    },
  },
  //   {
  //     i: "likes",
  //     x: 0,
  //     y: 3,
  //     w: 1,
  //     h: 2,
  //     component: {
  //       template: `<BaseCardLayout head="❤️ 我喜欢"><CardContainer :music_info_list="myLikes" layout="list"/></BaseCardLayout>`,
  //       components: { BaseCardLayout, CardContainer },
  //       setup() {
  //         return { myLikes };
  //       },
  //     },
  //   },
  {
    i: "daily",
    x: 1,
    y: 3,
    w: 2,
    h: 2,
    component: {
      template: `    <BaseMusicItem
      layout="card"
      mediaType="Album"
      :musicInfo="{
        id: 0,
        name: '每日推荐',
        artist: '',
        picUrl: bg2,
      }"
      @click="$router.push({ name: 'daily' })"
      @play="player2.playMulti(DailyRecommend)"
    ></BaseMusicItem>`,
      components: { BaseMusicItem },
      setup() {
        return { dailyRecommend };
      },
    },
  },
  //   {
  //     i: "lyric",
  //     x: 0,
  //     y: 5,
  //     w: 3,
  //     h: 3,
  //     component: {
  //       template: `<BaseCardLayout head="📝 当前歌词"><LyricDisplay :lyric="currentLyric"/></BaseCardLayout>`,
  //       components: { BaseCardLayout, LyricDisplay },
  //       setup() {
  //         return { currentLyric };
  //       },
  //     },
  //   },
]);

// 布局数据
const layout = ref([]);

// 保存布局
const saveLayout = (newLayout) => {
  localStorage.setItem("homeLayout", JSON.stringify(newLayout));
};

// 获取每日推荐
async function getDailyRecommend() {
  const musicStore = useMusicStore();
  if (userStore.cookies) {
    dailyRecommend.value = await musicStore.getDailyRecommend();
    console.log("获取到的每日推荐歌曲:", dailyRecommend.value);
  } else {
    console.log("未登录");
  }
}
// 加载布局
onMounted(async () => {
  const savedLayout = localStorage.getItem("homeLayout");
  if (savedLayout) {
    layout.value = JSON.parse(savedLayout);
  } else {
    layout.value = cardList.value.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }));
  }

  if (userStore.cookies) {
    dailyRecommend.value = await musicStore.getDailyRecommend();
    // myCollections.value = await musicStore.getMyCollections();
    // myLikes.value = await musicStore.getMyLikes();
    // currentLyric.value = await musicStore.getCurrentLyric();
  }
});
</script>

<style>
.vue-grid-layout {
  background: transparent;
}
.vue-grid-item {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
</style>
