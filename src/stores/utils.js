import {reactive} from 'vue'
export const utils = reactive({
    play_component:{
        showing: false,
        show(){
            this.showing = true;
        },
        hide(){
            this.showing = false;
        }
    },
    playList_component:{
        show: false
    },
    n_tooltip:{
        show: false,
        text: ""
    },
    user_config:{
        theme: "light",
        color: "",
        backgroundPic:"",
        transparent:"",
        saturate:""
    }
})