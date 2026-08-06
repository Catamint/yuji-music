import { defineStore } from 'pinia';
import api from '@/services/api.js';
import { useMusicStore } from './musicStore';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        cookies: "",
        history: [],
    }),
    actions: {
        importCookies(cookies) {
            this.cookies = cookies;
        },
        setUser(user) {
            this.user = user;
            // console.log(user,this.cookies);
        },

        /** @returns {boolean} */
        loggedIn() {
            return !!this.cookies;
        },
        async loginCookies(cookies) {
            try{
                const response = await api.getAccountInfo(cookies);
                console.log(response);
                if (response.code === 200 && response.profile != null && response.profile.userId != null) {
                    this.setUser(response.profile); 
                    this.importCookies(cookies);

                    // 初始化
                    const musicStore = useMusicStore();
                    musicStore.initLikeList();
                    return true;
                } else {
                    console.error('Error to login:', response.message);
                    return false;
                }
            } catch (error) {
                console.error('Error to login:', error.message);
                return false;
            }
        },
        async queryCodes(phoneNumber) {
            try {
                const res = await api.sendCaptcha(phoneNumber);
                return res.code === 200;
            } catch (error) {
                console.error('验证码发送失败:', error.message);
                return false;
            }
        },
        async loginByPhone(phoneNumber, captcha) {
            try {
                const res = await api.verifyCaptcha(phoneNumber, captcha);
                if (res.code !== 200 || !res.data) {
                    console.error('验证码错误:', res.message);
                    return false;
                }
                // 登录成功后服务端将 cookie 写入当前页面, 从 document.cookie 中取得并持久化
                const cookie = document.cookie || '';
                if (!cookie) {
                    console.error('登录失败: 未获取到 cookie');
                    return false;
                }
                const account = await api.getAccountInfo(cookie);
                if (account.code === 200 && account.profile && account.profile.userId != null) {
                    this.setUser(account.profile);
                    this.importCookies(cookie);
                    const musicStore = useMusicStore();
                    musicStore.initLikeList();
                    return true;
                }
                console.error('登录失败:', account.message);
                return false;
            } catch (error) {
                console.error('验证码登录失败:', error.message);
                return false;
            }
        },
        logout() {
            if(this.user == null){
                console.log("user is null");
                return;
            }
            const uid = this.user.userId;
            let flag = false;
            for (let i = 0; i < this.history.length; i++) {
                const item = this.history[i];
                if(item.uid == uid){
                    flag = true;
                    this.history[i] = {uid: uid, nickname: this.user.nickname, cookies: this.cookies};
                }
            } if(!flag) {
                this.history.push({uid: uid, nickname: this.user.nickname, cookies: this.cookies});
            }
            if(this.history.length > 3){
                this.history.shift();
            }
            this.user = null;
            this.cookies = "";
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user',
                storage: localStorage,
            },
        ],
    },
});