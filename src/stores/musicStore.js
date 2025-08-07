import { defineStore } from 'pinia';
import api from '@/services/api';
import { useUserStore } from './userStore';
export const useMusicStore = defineStore('music', {
  state: () => ({
    likeList: [],
  }),
  actions: {
    addToLikeList(id) {
      if (!this.likeList.includes(id)) {
        this.likeList.push(id);
        }
    },
    removeFromLikeList(id) {
      this.likeList = this.likeList.filter(item => item !== id);
    },
    async initLikeList() {
      // 获取用户收藏的歌曲
      const userStore = useUserStore();
      if (!userStore.loggedIn()) {
        return;
      }
      const res = await api.getLikedSongs(userStore.user.userId, userStore.cookies);
      const likeList = res?.ids;
      if (!likeList) {
        console.log('获取用户收藏的歌曲失败');
        return;
      }
      this.likeList = likeList;
    }
  }
});