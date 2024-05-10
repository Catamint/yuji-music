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

import Piano from '@/music_create/components/Piano.vue';
import Drum from '@/music_create/components/Drum.vue';
import Guitar from '@/music_create/components/Guitar.vue';

// import MusicGenerate from '@/music_create/components/MusicGenerate.vue';
// import Together from '@/music_create/components/Together.vue';
import ChooseTeam from '@/music_create/components/chooseTeam.vue';
import TeamRoom from '@/music_create/components/teamRoom.vue';
// import Admin from '@/music_create/components/Admin.vue';
import play from '@/music_create/components/play.vue';
import Generate from "@/views/generate/Generate.vue";

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
    },
    {
        path: '/drum',
        name: 'drum',
        component: Drum,
      },
      {
        path: '/guitar',
        name: 'guitar',
        component: Guitar,
      },
      {
        path: '/generate',
        name: 'generate',
        component: Generate,
      },
      {
        path:'/together',
        name:'together',
        redirect:'/together/ChooseTeam',
        children:[
          {
            path:'chooseTeam',
            name:'chooseteam',
            component: ChooseTeam,
          },
          {
            path:'teamRoom',
            name:'teamRoom',
            component:TeamRoom
          },
          {
            path:'play',
            name:'play',
            component:play
          }
        ]
      }
    //   ,
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