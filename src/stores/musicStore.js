import { defineStore } from 'pinia';
import api from '@/services/api';
import { useUserStore } from './userStore';
import songService from '@/services/songService';
export const useMusicStore = defineStore('music', {
  state: () => ({
    likeList: [],
    dailyRecommend: {
      id: 0,
      name: '每日推荐',
      artist: '',
      picUrl: '/src/assets/image/background2.jpeg',
      songs: [],
      updateTime: 0,
    },
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
    },
    async getDailyRecommend() {
      const todayStartTs = new Date().setHours(0, 0, 0, 0); // number
      if ((this.dailyRecommend.updateTime ?? 0) < todayStartTs) {
        const res = await songService.getDailyRecommendedSongs();
        this.dailyRecommend.updateTime = todayStartTs;
        this.dailyRecommend.songs = res;
        return res;
      } else {
        console.log(
          '使用缓存的每日推荐歌曲',
          new Date(this.dailyRecommend.updateTime),
          new Date(todayStartTs)
        );
        return this.dailyRecommend.songs;
      }
    }
  },
      persist: {
        enabled: true,
        strategies: [
            {
                key: 'musicStore',
                storage: localStorage,
            },
        ],
    },
});