<template>
    <div class="player">
        <h1
            style="font-weight: bold; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
            雨霁音乐</h1>
        <n-space>
            <search>
                v-model="kw"
                @search="search_music"
                style="width: 300px;"
            </search>
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
import Search from '@/components/public/Search.vue';

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
        NDropdown,
        Search
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
                name: 'searchpage', params: {
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