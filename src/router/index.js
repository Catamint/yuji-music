import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/home/Home.vue"
import Favorite from "../views/favorite/Favorite.vue"
// import Mv from "../views/mv/Mv.vue"
import Settings from "../views/settings/Settings.vue"
import PlayList from "../views/PlayList.vue"
import Play from "../views/play/Play.vue"
import SearchPage from "../views/SearchPage.vue"
// import Login from "../views/Login.vue"
// import SignUp from "../views/SignUp.vue"
import LoginNcm from "@/views/LoginNcm.vue"
import Album from "@/views/Album.vue"

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
        path:"/settings",
        component: Settings
    },
    {
        path:"/searchpage",
        component: SearchPage
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
        path:"/search",
        name: 'search',
        component: SearchPage,
        props: route => ({ kw: route.query.kw, type: route.query.type, page: route.query.page || '1', qurl: route.query.qurl || '0' })
    },
    // {
    //     path:"/login",
    //     component: Login
    // },
    {
        path:"/login_netease",
        component: LoginNcm,
        name: 'login_netease'
    },
    // {
    //     path:"/signup",
    //     component: SignUp
    // },
    {
      path:'/album/:id',
      name:'album',
      component: Album,
      props:true,
    },
    {
      path:'/artist/:id',
      name:'artist',
      component: () => import('@/views/Artist.vue'),
      props:true,
    },
    {
      path:'/songlist/:id',
      name:'songlist',
      component: () => import('@/views/SongList.vue'),
      props:true,
    },
    {
      path:'/songlist/user/:id',
      name:'usersonglist',
      component: () => import('@/views/UserSonglist.vue'),
      props:true,
    }
    //   {
    //     path:'/admin',
    //     name:'dbManagement',
    //     component:Admin
    //   }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;