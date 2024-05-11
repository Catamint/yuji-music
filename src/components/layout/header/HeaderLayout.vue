<template>
    <div class="player">
        <h1
            style="font-weight: bold; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
            雨霁音乐</h1>
        <n-space>
            <n-input-group style="display: inline-flex; justify-content: end;">
                <n-input style="background-color: rgba(255, 255, 255, 0); width:200px ;" v-model:value="kw" type="text"
                    placeholder="搜索" />
                <n-button ghost @click="search_music"> GO </n-button>
            </n-input-group>
            <router-link to="/settings"><n-button>设置</n-button></router-link>
            <router-link v-if="utils.user_config.uid == ''" to="/login"><n-button>登录</n-button></router-link>
            <div v-else>
                <n-dropdown n-button :options="options" @select="handleSelect">
                    <n-button>{{ this.utils.user_config.name }}</n-button>
                </n-dropdown>
            </div>
        </n-space>
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import { NButton, NInput, NSpace, NInputGroup, NDropdown } from 'naive-ui';
import { RouterLink } from 'vue-router';

export default {
    name: 'HeaderLayout',
    props: {
        msg: String
    },
    components: {
        NInput,
        NInputGroup,
        NButton,
        RouterLink,
        NSpace,
        NDropdown
    },
    mounted() {

    },
    data() {
        return {
            kw: "",
            utils
        }
    },
    methods: {
        search_music() {
            // this.$router.push({path: '/'})
            // this.reloadPage();
            var kw = this.kw;
            this.reloadPage();
            this.$router.push({
                name: 'listpage', params: {
                    kw: kw,
                    page: 1,
                    qurl: '/host/get_search_result'
                }
            });
            this.reloadPage();
        },
        handleSelect(key){
            // console.log(key);
            if(key == "logout"){
                this.utils.user_config.logout();
                location.reload();
            }
        }
    },
    inject: ["reloadPage"],
    setup() {
        return {
            options: [
                // {
                //     label: "编辑用户资料",
                //     key: "editProfile",
                // },
                {
                    label: "退出登录",
                    key: "logout",
                }
            ]
        };
    }
}
</script>

<style scoped>
.player {
    box-sizing: border-box;
    padding-left: 40px;
    padding-right: 40px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    border-radius: 20px;
    width: 100%;
}

.n-input {
    display: inline-flex;
    align-items: center;
    width: 40%;
    max-width: 200px;
    height: 80%;
    max-height: 34px;
}
</style>