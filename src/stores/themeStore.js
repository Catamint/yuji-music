import { defineStore } from 'pinia';
import bg from '@/assets/image/background.png'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        themes: {
            light: {
                key: 'light', // 添加 key 属性
                name: '浅色',
                backgroundActive: true,
                backgroundImage: bg,
                backgroundSaturation: 1.6,
                containerBackgroundColor: 'rgba(255, 255, 255, 0.6)',
                containerBlur: '0px',
                iconColor: 'rgba(225, 120, 120, 0.9)',
            },
            dark: {
                key: 'dark', // 添加 key 属性
                name: '深色',
                backgroundActive: true,
                backgroundImage: bg,
                backgroundSaturation: 2,
                containerBackgroundColor: 'rgba(15, 15, 15, 0.6)',
                containerBlur: '0px',
                iconColor: 'rgba(225, 120, 120, 0.9)',
            },
        },
        currentTheme: {}, // 当前主题
    }),
    
    getters: {
        // 将 getThemeList 移到 getters 中
        getThemeList: (state) => {
            return () => Object.keys(state.themes).map(key => ({
                label: state.themes[key].name,
                value: key,
            }));
        },
    },
    
    actions: {
        // 保存当前主题到本地存储
        saveCurrentTheme() {
            localStorage.setItem('currentTheme', JSON.stringify(this.currentTheme));
        },

        // 初始化默认主题
        initDefaultTheme() {
            if (localStorage.getItem('currentTheme')) {
                this.currentTheme = JSON.parse(localStorage.getItem('currentTheme'));
            } else {
                this.currentTheme = { ...this.themes.light };
                this.saveCurrentTheme();
            }
        },
        
        // 设置主题
        setTheme(themeKey) {
            if (this.themes[themeKey]) {
                this.currentTheme = { ...this.themes[themeKey] };
                this.currentTheme.key = themeKey; // 确保 key 正确
                this.saveCurrentTheme();
            } else {
                console.error(`主题 ${themeKey} 不存在`);
            }
        },
        
        // 添加主题
        addTheme(theme, key) {
            if (this.themes[key]) {
                console.warn(`主题 ${key} 已存在，将被覆盖`);
            }
            this.themes[key] = { ...theme, key };
        },
        
        // 设置背景激活状态
        setBackgroundActive(active) {
            // 如果修改的不是自定义主题，创建自定义主题
            if (this.currentTheme.key !== 'custom') {
                this.createCustomTheme();
            }
            this.currentTheme.backgroundActive = active;
            this.saveCurrentTheme();
        },
        
        // 设置背景图片
        setBackgroundImage(image = '') {
            if (this.currentTheme.key !== 'custom') {
                this.createCustomTheme();
            }
            this.currentTheme.backgroundImage = image;
            this.saveCurrentTheme();
        },
        
        // 设置背景饱和度
        setBackgroundSaturation(saturation) {
            if (this.currentTheme.key !== 'custom') {
                this.createCustomTheme();
            }
            this.currentTheme.backgroundSaturation = saturation;
            this.saveCurrentTheme();
        },
        // 设置容器背景颜色
        setContainerBackgroundColor(color) {
            if (this.currentTheme.key !== 'custom') {
                this.createCustomTheme();
            }
            this.currentTheme.containerBackgroundColor = color;
            this.saveCurrentTheme();
        },
        
        // 设置容器模糊度
        setContainerBlur(blur) {
            if (this.currentTheme.key !== 'custom') {
                this.createCustomTheme();
            }
            this.currentTheme.containerBlur = blur;
            this.saveCurrentTheme();
        },
        
        // 创建自定义主题的辅助方法
        createCustomTheme() {
            const customTheme = {
                ...JSON.parse(JSON.stringify(this.currentTheme)),
                key: 'custom',
                name: '自定义'
            };
            this.addTheme(customTheme, 'custom');
            this.currentTheme = customTheme;
            this.saveCurrentTheme();
        },
        
        // 重置为默认主题
        resetTheme() {
            this.setTheme('dark');
        },
        
        // 删除自定义主题
        deleteCustomTheme() {
            if (this.themes.custom) {
                delete this.themes.custom;
                if (this.currentTheme.key === 'custom') {
                    this.setDefaultTheme();
                }
            }
            this.saveCurrentTheme();
        }
    },
});