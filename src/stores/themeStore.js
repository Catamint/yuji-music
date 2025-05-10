import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        themes: {
            light: {
                name: '浅色', // 主题名称
                backgroundActive: true, // 是否启用背景
                backgroundImage: './src/assets/image/background.jpg', // 背景图片路径
                backgroundSaturation: 1.6, // 背景饱和度
                containerBackgroundColor: 'rgba(255, 255, 255, 0.6)', // 容器背景颜色
                containerBlur: '80px', // 容器模糊度
                iconColor: 'rgba(170, 40, 40, 0.64)', // 图标颜色
                overrides: {
                    common: {
                        primaryColor: 'rgba(170, 40, 40, 0.64)', // 主色
                        primaryColorHover: 'rgba(220, 70, 70, 0.64)', // 主色悬停
                        primaryColorPressed: 'rgba(170, 40, 40, 0.64)', // 主色按下
                        textColor: '#333333', // 文本颜色
                        textColorDisabled: '#BFBFBF', // 禁用文本颜色
                        borderColor: 'rgba(170, 40, 40, 0.64)', // 边框颜色
                        iconColor: 'rgba(170, 40, 40, 0.64)', // 图标颜色
                        iconColorHover: 'rgba(170, 40, 40, 0.64)', // 图标悬停颜色
                    },
                    Button: {
                        textColor: '#FFFFFF', // 按钮文本颜色
                        color: 'rgba(170, 40, 40, 0.44)', // 按钮背景颜色
                        colorHover: 'rgba(170, 40, 40, 0.64)', // 按钮悬停背景颜色
                        colorPressed: 'rgba(170, 40, 40, 0.64)', // 按钮按下背景颜色
                    },
                    Menu: {
                        itemColorActive: 'rgba(255, 77, 79, 0.1)', // 菜单项激活背景颜色
                        textColor: '#333333', // 菜单文本颜色
                        textColorActive: 'rgba(170, 40, 40, 0.64)', // 菜单激活文本颜色
                        itemTextColorActive: '#rgba(170, 40, 40, 0.64)', // 子菜单激活文本颜色
                        itemTextColorChildActive: 'rgba(170, 40, 40, 0.64)', // 子菜单激活文本颜色
                    },
                    Icon: {
                        color: 'rgba(170, 40, 40, 0.64)', // 图标颜色
                    },
                    Empty: {
                        textColor: '#333333', // 空状态文本颜色
                    },
                    Select: {
                        peers: {
                            InternalSelection: {},
                        },
                    }
                },
            },
            dark: {
                name: '深色', // 主题名称
                backgroundActive: true, // 是否启用背景
                backgroundImage: './src/assets/image/background.jpg', // 背景图片路径
                backgroundSaturation: 2, // 背景饱和度
                containerBackgroundColor: 'rgba(15, 15, 15, 0.6)', // 容器背景颜色
                containerBlur: '100px', // 容器模糊度
                iconColor: 'rgba(225, 120, 120, 0.9)', // 图标颜色
                overrides: {
                    common: {
                        primaryColor: 'rgba(225, 120, 120, 0.9)', // 主色
                        primaryColorHover: 'rgba(225, 120, 120, 0.6)', // 主色悬停
                        primaryColorPressed: 'rgba(225, 120, 120, 0.9)', // 主色按下
                        textColorBase: '#CCCCCC', // 文本颜色
                        textColor1: '#CCCCCC', // 文本颜色
                        textColor2: '#CCCCCC', // 文本颜色
                        textColorDisabled: '#666666', // 禁用文本颜色
                        borderColor: 'rgba(225, 120, 120, 0.9)', // 边框颜色
                        iconColor: 'rgba(225, 120, 120, 0.3)', // 图标颜色
                        iconColorHover: 'rgba(225, 120, 120, 0.6)', // 图标悬停颜色
                    },
                    Button: {
                        textColor: '#FFFFFF', // 按钮文本颜色
                        color: 'rgba(225, 120, 120, 0.3)', // 按钮背景颜色
                        colorHover: 'rgba(225, 120, 120, 0.6)', // 按钮悬停背景颜色
                        colorPressed: 'rgba(225, 120, 120, 0.9)', // 按钮按下背景颜色
                    },
                    Menu: {
                        itemColorActive: 'rgba(255, 77, 79, 0.1)', // 菜单项激活背景颜色
                        textColor: '#FFFFFF', // 菜单文本颜色
                        textColorActive: 'rgba(225, 120, 120, 0.9)', // 菜单激活文本颜色
                        itemTextColorActive: 'rgba(225, 120, 120, 0.9)', // 子菜单激活文本颜色
                        itemTextColorChildActive: 'rgba(225, 120, 120, 0.9)', // 子菜单激活文本颜色
                    },
                    Icon: {
                        color: 'rgba(225, 120, 120, 0.9)', // 图标颜色
                    },
                    Empty: {
                        textColor: '#FFFFFF', // 空状态文本颜色
                    },
                    Select: {
                        peers: {
                            InternalSelection: {},
                        },
                    },
                    // Input: {
                    //   backgroundColor: 'rgba(255, 255, 255, 0)',
                    // }
                },
            },
        },
        currentTheme: {}, // 当前主题
    }),
    actions: {
        setDefaultTheme() {
            this.currentTheme = this.themes.light;
        },
        getThemeList() {
            return Object.keys(this.themes).map(key => ({
                label: this.themes[key].name,
                value: key,
            }));
        },
        setTheme(theme) {
            if (this.themes[theme]) {
                this.currentTheme = this.themes[theme];
            } else {
                console.error(`主题 ${theme} 不存在`);
            }
        },
        addTheme(theme, key) {
            if (this.themes[key]) {
                console.error(`主题 ${theme.name} 已存在`);
                return;
            }
            this.themes[key] = theme;
        },
        setBackGroundImage(image='./src/assets/image/background.jpg') {
            if (this.currentTheme.key !== 'custom') {
                if (this.themes['custom']) {
                    this.currentTheme = this.themes['custom'];
                } else {
                    this.currentTheme = JSON.parse(JSON.stringify(this.currentTheme));
                    this.currentTheme.name = '自定义';
                    this.addTheme(this.currentTheme, 'custom');
                }
            }
            this.currentTheme.backgroundImage = image;
        },
        setContainerBlur(blur) {
            if (this.currentTheme.key !== 'custom') {
                if (this.themes['custom']) {
                    this.currentTheme = this.themes['custom'];
                } else {
                    this.currentTheme = JSON.parse(JSON.stringify(this.currentTheme));
                    this.currentTheme.name = '自定义';
                    this.addTheme(this.currentTheme, 'custom');
                }
            }
            this.currentTheme.containerBlur = blur;
        }
    },
});