import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/home/Home.vue"
import Favorite from "../views/favorite/Favorite.vue"
import Mv from "../views/mv/Mv.vue"
import Settings from "../views/settings/Settings.vue"
// import List from "../components/layout/public/List.vue"
import PlayList from "../views/PlayList.vue"
import Play from "../views/play/Play.vue"
import ListPage from "@/components/public/ListPage.vue"
import Login from "../views/Login.vue"
import SignUp from "../views/SignUp.vue"

import Piano from '../music_create/components/Piano.vue';

const routes = [
    {
        path:"/",
        component: Home
    },
    {
        path:"/favorite",
        component: Favorite
    },
    {
        path:"/mv",
        component: Mv
    },
    {
        path:"/settings",
        component: Settings
    },
    {
        path:"/listpage",
        component: ListPage
    },
    {
        path:"/playlist",
        component: PlayList
    },
    {
        path:"/play",
        component: Play
    },
    {
        path:"/listpage/:kw:page:qurl",
        name: 'listpage',
        component: ListPage,
        props: true
    },
    {
        path:"/login",
        component: Login
    },
    {
        path:"/signup",
        component: SignUp
    },
    {
      path: '/piano',
      name: 'piano',
      component: Piano,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;