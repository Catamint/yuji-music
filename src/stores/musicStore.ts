import { defineStore } from 'pinia';
import api from '@/services/api';
import { useUserStore } from './userStore';
import songService from '@/services/songService';
import Music from '@/model/Music';

interface DailyRecommend {
  picUrl: string;
  songs: Music[];
  updateTime: number;
}

function createDefaultDailyRecommend(): DailyRecommend {
  return {
    picUrl: '',
    songs: [],
    updateTime: 0,
  };
}

export const useMusicStore = defineStore('music', {
  state: () => ({
    likeList: [] as string[],
    dailyRecommend: createDefaultDailyRecommend(),
    defaultApi: 'https://ncm-api-enhanced.vercel.app',
  }),
  actions: {
    addToLikeList(id: string) {
      if (!this.likeList.includes(id)) {
        this.likeList.push(id);
        }
    },
    resetApi() {
      this.defaultApi = 'https://ncm-api-enhanced.vercel.app';
    },
    removeFromLikeList(id: string) {
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
      if (!this.dailyRecommend) {
        this.dailyRecommend = createDefaultDailyRecommend();
      }

      const todayStartTs = new Date().setHours(6, 0, 0, 0); // number
      if ((this.dailyRecommend.updateTime ?? 0) < todayStartTs) {
        const res = (await songService.getDailyRecommendedSongs()) ?? [];
        this.dailyRecommend = {
          ...this.dailyRecommend,
          updateTime: todayStartTs,
          songs: res,
        };
        return res;
      } else {
        console.log(
          '使用缓存的每日推荐歌曲',
          new Date(this.dailyRecommend.updateTime),
          new Date(todayStartTs)
        );
        return this.dailyRecommend.songs || [];
      }
    },
    async freshDailyRecommend() {
      if (!this.dailyRecommend) {
        this.dailyRecommend = createDefaultDailyRecommend();
      }
      const songs = (await songService.getDailyRecommendedSongs()) ?? [];
      this.dailyRecommend = {
        ...this.dailyRecommend,
        songs,
        updateTime: new Date().setHours(6, 0, 0, 0),
      };
      return this.dailyRecommend.songs;
    },
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