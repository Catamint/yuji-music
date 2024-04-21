import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/home/Home.vue"
import Favorite from "../views/favorite/Favorite.vue"
import Mv from "../views/mv/Mv.vue"
import Settings from "../views/settings/Settings.vue"
import List from "../views/List.vue"

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
        path:"/list",
        component: List
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;