import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        themes: {
            light: {
                key: 'light', // 添加 key 属性
                name: '浅色',
                backgroundActive: true,
                backgroundImage: './src/assets/image/background.jpg',
                backgroundSaturation: 1.6,
                containerBackgroundColor: 'rgba(255, 255, 255, 0.6)',
                containerBlur: '80px',
                iconColor: 'rgba(170, 40, 40, 0.64)',
                overrides: {
                    common: {
                        primaryColor: 'rgba(170, 40, 40, 0.64)',
                        primaryColorHover: 'rgba(220, 70, 70, 0.64)',
                        primaryColorPressed: 'rgba(170, 40, 40, 0.64)',
                        textColor: '#333333',
                        textColorDisabled: '#BFBFBF',
                        borderColor: 'rgba(170, 40, 40, 0.64)',
                        iconColor: 'rgba(170, 40, 40, 0.64)',
                        iconColorHover: 'rgba(170, 40, 40, 0.64)',
                    },
                    Button: {
                        textColor: '#FFFFFF',
                        color: 'rgba(170, 40, 40, 0.44)',
                        colorHover: 'rgba(170, 40, 40, 0.64)',
                        colorPressed: 'rgba(170, 40, 40, 0.64)',
                    },
                    Menu: {
                        itemColorActive: 'rgba(255, 77, 79, 0.1)',
                        textColor: '#333333',
                        textColorActive: 'rgba(170, 40, 40, 0.64)',
                        itemTextColorActive: '#rgba(170, 40, 40, 0.64)',
                        itemTextColorChildActive: 'rgba(170, 40, 40, 0.64)',
                    },
                    Icon: {
                        color: 'rgba(170, 40, 40, 0.64)',
                    },
                    Empty: {
                        textColor: '#333333',
                    },
                    Select: {
                        peers: {
                            InternalSelection: {},
                        },
                    }
                },
            },
            dark: {
                key: 'dark', // 添加 key 属性
                name: '深色',
                backgroundActive: true,
                backgroundImage: './src/assets/image/background.jpg',
                backgroundSaturation: 2,
                containerBackgroundColor: 'rgba(15, 15, 15, 0.6)',
                containerBlur: '100px',
                iconColor: 'rgba(225, 120, 120, 0.9)',
                overrides: {
                    common: {
                        primaryColor: 'rgba(225, 120, 120, 0.9)',
                        primaryColorHover: 'rgba(225, 120, 120, 0.6)',
                        primaryColorPressed: 'rgba(225, 120, 120, 0.9)',
                        textColorBase: '#CCCCCC',
                        textColor1: '#CCCCCC',
                        textColor2: '#CCCCCC',
                        textColorDisabled: '#666666',
                        borderColor: 'rgba(225, 120, 120, 0.9)',
                        iconColor: 'rgba(225, 120, 120, 0.3)',
                        iconColorHover: 'rgba(225, 120, 120, 0.6)',
                    },
                    Button: {
                        textColor: '#FFFFFF',
                        color: 'rgba(225, 120, 120, 0.3)',
                        colorHover: 'rgba(225, 120, 120, 0.6)',
                        colorPressed: 'rgba(225, 120, 120, 0.9)',
                    },
                    Menu: {
                        itemColorActive: 'rgba(255, 77, 79, 0.1)',
                        textColor: '#FFFFFF',
                        textColorActive: 'rgba(225, 120, 120, 0.9)',
                        itemTextColorActive: 'rgba(225, 120, 120, 0.9)',
                        itemTextColorChildActive: 'rgba(225, 120, 120, 0.9)',
                    },
                    Icon: {
                        color: 'rgba(225, 120, 120, 0.9)',
                    },
                    Empty: {
                        textColor: '#FFFFFF',
                    },
                    Select: {
                        peers: {
                            InternalSelection: {},
                        },
                    },
                },
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
        // 初始化默认主题
        setDefaultTheme() {
            this.currentTheme = { ...this.themes.light };
        },
        
        // 设置主题
        setTheme(themeKey) {
            if (this.themes[themeKey]) {
                this.currentTheme = { ...this.themes[themeKey] };
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
        },
        
        // 设置背景图片
        setBackgroundImage(image = './src/assets/image/background.jpg') {
            if (this.currentTheme.key !== 'custom') {
                this.createCustomTheme();
            }
            this.currentTheme.backgroundImage = image;
        },
        
        // 设置背景饱和度
        setBackgroundSaturation(saturation) {
            if (this.currentTheme.key !== 'custom') {
                this.createCustomTheme();
            }
            this.currentTheme.backgroundSaturation = saturation;
        },
        // 设置容器背景颜色
        setContainerBackgroundColor(color) {
            if (this.currentTheme.key !== 'custom') {
                this.createCustomTheme();
            }
            this.currentTheme.containerBackgroundColor = color;
        },
        
        // 设置容器模糊度
        setContainerBlur(blur) {
            if (this.currentTheme.key !== 'custom') {
                this.createCustomTheme();
            }
            this.currentTheme.containerBlur = blur;
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
        },
        
        // 重置为默认主题
        resetTheme() {
            this.setTheme('light');
        },
        
        // 删除自定义主题
        deleteCustomTheme() {
            if (this.themes.custom) {
                delete this.themes.custom;
                if (this.currentTheme.key === 'custom') {
                    this.setDefaultTheme();
                }
            }
        }
    },
});