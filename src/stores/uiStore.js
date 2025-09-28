import { defineStore } from 'pinia';
import { useMediaQuery } from '@vueuse/core';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isMobile: false,
    domVisible: {
      playingPage: false,
      playList: false,
      sideBarMobile: false,
      contextList: false,
    },
  }),
  actions: {
    updateUiState() {
      this.isMobile = useMediaQuery('(max-width: 768px)').value;
    },
    toggleDomVisible(key) {
      console.log("toggleDomVisible", key);
      this.domVisible[key] = !this.domVisible[key];
    },
    setDomVisible(key, value) {
      console.log("setDomVisible", key, value);
      this.domVisible[key] = value;
    },
  },
  getters: {
    // layoutClass: (state) => ({
    //   mobile: state.isMobile,
    //   desktop: !state.isMobile
    // }),
    
    // 是否有弹窗开启
    hasOpenModal: (state) => {
      return Object.values(state.domVisible).some(Boolean)
    }
  }
});