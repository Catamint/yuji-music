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
      commandPalette: false,
      detailMenu: false,
    },
    commandPalettePayload: null,
    detailMenuPayload: null,
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
    openCommandPalette(payload = {}) {
      console.log("openCommandPalette", payload);
      this.commandPalettePayload = payload;
      this.domVisible.commandPalette = true;
    },
    closeCommandPalette() {
      this.domVisible.commandPalette = false;
      this.commandPalettePayload = null;
    },
    openDetailMenu(payload = null) {
      console.log("openDetailMenu", payload);
      this.detailMenuPayload = payload;
      this.domVisible.detailMenu = true;
    },
    closeDetailMenu() {
      this.domVisible.detailMenu = false;
      this.detailMenuPayload = null;
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