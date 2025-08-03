import {reactive} from 'vue'
export const utils = reactive({
    play_component:{
        showing: false,
        show(){
            console.log("显示播放组件");
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
        session:"",
        uid: "",
        name:"",
        theme: "light",
        color: "",
        backgroundPic:"",
        transparent:"",
        saturate:"",
        login(uid, name){
            // console.log(uid)
            this.uid = uid;
            this.name = name;
            localStorage.setItem("uid",uid);
            localStorage.setItem("name",name);
        },
        logout(){
            localStorage.removeItem("uid");
            localStorage.removeItem("name");
            this.uid = "";
            this.name = "";
        },
    },
    initUtils(){
        var localUid = localStorage.getItem('uid');
        var localName =  localStorage.getItem('name');
        if(localUid != null){
            this.user_config.uid = localUid;
            this.user_config.name = localName;
        }
    }
})