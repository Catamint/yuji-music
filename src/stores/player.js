import {reactive} from 'vue'

export const player = reactive({
    playlist:[],
    current: 0,
    is_playing: false,
    play(music_detials){
        this.playlist = [music_detials];
        this.is_playing = true;
    }
})