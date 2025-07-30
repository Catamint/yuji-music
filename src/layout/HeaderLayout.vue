<template>
    <!-- <h1 class="text-3xl"
        style="font-weight: bold; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        雨霁音乐</h1> -->
    <div class="flex flex-inline gap-1 justify-end items-center">
        <search class="max-w-[300px]">
            v-model="kw"
            @search="search_music"
            style="width: 300px;"
        </search>
        <!-- <router-link to="/settings"><n-button>设置</n-button></router-link> -->
        <!-- <router-link v-if="utils.user_config.uid == ''" to="/login"><n-button>登录</n-button></router-link> -->
        <div v-if="utils.user_config.uid != ''">
            <n-dropdown n-button :options="options" @select="handleSelect">
                <Button>{{ this.utils.user_config.name }}</Button>
            </n-dropdown>
        </div>
    </div>
</template>

<script>
import { utils } from '@/stores/utils';
import { NButton, NInput, NSpace, NInputGroup, NDropdown } from 'naive-ui';
import { Button } from "@/components/ui/button"
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
        Search,
        Button
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
    /* height: 10%; */
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