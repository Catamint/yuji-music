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