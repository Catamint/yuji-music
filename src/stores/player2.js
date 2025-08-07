// player.js
import songService from "@/services/songService";
import { computed } from "vue";
import { reactive } from 'vue';
import { CapacitorMusicControls } from "capacitor-music-controls-plugin";

export const PlayMode = {
    SEQUENTIAL: 'sequential', // 顺序播放
    RANDOM: 'random',         // 随机播放
    REPEAT_ONE: 'repeat-one'  // 单曲循环
};

const state = reactive({
  audio: new Audio(),         // 音频对象
  playlist: [],               // 播放列表
  currentIndex: -1,           // 当前播放的歌曲索引
  isPlaying: computed(() => state.audio && state.currentTime >= 0 && state.audio.paused === false),           // 是否正在播放
  mode: PlayMode.SEQUENTIAL, // 播放模式
  volume: 1,                  // 音量
  currentTime: 0,             // 当前播放时间
  duration: 0,                // 歌曲总时长
});

async function initAudio() {
  if (!state.audio) {
    state.audio = new Audio();
  }

  // 绑定音频事件监听
  state.audio.addEventListener('ended', onEnded);
  state.audio.addEventListener('play', onPlay);
  state.audio.addEventListener('pause', onPause);
  state.audio.addEventListener('timeupdate', onTimeUpdate);
  state.audio.addEventListener('loadedmetadata', onLoadedMetadata);
  state.audio.volume = state.volume; // 设置初始音量
  try {
    // await CapacitorMusicControls.create({
    //     track: "Song Title",
    //     artist: "Artist Name",
    //     album: "Album Name",
    //     // cover: "url-or-local-path-to-artwork",
    //     isPlaying: true,
    //     dismissable : false,
    //     hasPrev: true,
    //     hasNext: true,
    //     hasClose: true,
    //     duration: 180,   // 可选
    //     elapsed: 0       // 可选
    // });
  } catch (error) {
    console.error('通知栏播放控件创建失败', error);
  } 

}

function onEnded() {
  if (state.mode === PlayMode.REPEAT_ONE) {
    state.audio.currentTime = 0; // 重置到开头
    state.audio.play();
  } else {
    next();
    }
}

// 播放事件
function onPlay() {

}

// 暂停事件
function onPause() {

}

// 时间更新事件
function onTimeUpdate() {
  state.currentTime = state.audio.currentTime;
}

// 歌曲加载元数据（获取歌曲时长）
function onLoadedMetadata() {
  state.duration = state.audio.duration;
}

function setCurrentTime(time) {
    if (state.currentIndex === -1) return;

    if (isNaN(time)) {
        console.error('无效的时间设置');
        return;
    } else if (time < 0) {
        console.warn('时间不能小于 0');
        time = 0;
    } else if (time > state.duration) {
        console.warn('时间不能大于歌曲时长');
        time = state.duration;
    }
    state.audio.currentTime = time;
}

function setPlaylist(playlist) {
    state.playlist = playlist;
    state.currentIndex = 0;
}

function setSrc(url) {
    state.audio.src = url;
    state.audio.load();
}

async function playIndex(index = state.currentIndex) {
    if (!state.playlist.length) return;
    state.currentIndex = index;

    const track = state.playlist[state.currentIndex];
    if (!track.url) {
        // 懒加载 URL
        track.url = await songService.getSongUrl(track.id);
    }
    if (!track.url) {
        console.error('无法获取歌曲链接');
        return;
    }

    setSrc(track.url);
    state.audio.play();
    track.playing = true;
}

async function play(music_details) {
    try {
        // 调用 API 获取歌曲链接
        const songUrl = await songService.getSongUrl(music_details.id);

        if (songUrl) {
            music_details.url = songUrl;
            music_details.playing = true;
            state.playlist = [music_details]; // 设置为当前播放列表
            playIndex(0); // 设置为播放状态
        } else {
            console.error('无法获取歌曲链接');
        }
        
    } catch (error) {
        console.error('Error fetching song URL:', error.message);
    }
}

async function playMulti(songlist) {
    if (!Array.isArray(songlist) || songlist.length === 0) {
        console.log(songlist);
        console.error('歌曲列表不正确');
        return;
    }

    state.playlist = await songlist.map(track => ({
        ...track,
        playing: false,
        url: track.url || '' // 确保每首歌都有 url 属性
    }));

    state.currentIndex = 0;
    playIndex();
}

// 从播放列表中播放指定歌曲
function play_in_playlist(id) {
    const songIndex = state.playlist.findIndex(item => item.id === id);
    if (songIndex !== -1) {
        state.playlist[state.currentIndex].playing = false;
        state.currentIndex = songIndex;
        playIndex();
    } else {
        console.error('歌曲不在播放列表中');
    }
}

function pause() {
    state.audio.pause();
}

function toggle() {
    if (state.audio.paused) {
        state.audio.play();
    } else {
        state.audio.pause();
    }
}

async function next() {
    if (state.mode === PlayMode.REPEAT_ONE) {
        return playIndex(state.currentIndex);
    }

    if (state.mode === PlayMode.RANDOM) {
        state.currentIndex = Math.floor(Math.random() * state.playlist.length);
    } else {
        state.currentIndex = (state.currentIndex + 1) % state.playlist.length;
    }

    await playIndex();
}

async function prev() {
    if (state.mode === PlayMode.RANDOM) {
        state.currentIndex = Math.floor(Math.random() * state.playlist.length);
    } else {
        state.currentIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
    }

    await playIndex();
}

function setMode(mode) {
    if (Object.values(PlayMode).includes(mode)) {
        state.mode = mode;
    }
}

function put_in_playlist(song) {
    state.playlist.splice(state.currentIndex + 1, 0, song);
}

function insertNext(track) {
    state.playlist.splice(state.currentIndex + 1, 0, track);
}

function del_from_list(id) {
    const songIndex = state.playlist.findIndex(item => item.id === id);
    if (songIndex !== -1) {
        state.playlist.splice(songIndex, 1);
        if (state.playlist.length === 0) {
            state.currentIndex = -1; // 重置当前索引
            state.audio.pause();
            state.audio.src = ''; // 清空音频源
        }
        else if (state.currentIndex >= state.playlist.length) {
            state.currentIndex = 0; // 如果删除的是当前播放的歌曲，自动播放最后一首
        } else if (state.currentIndex > songIndex) {
            state.currentIndex--;
        } else {
            console.error('歌曲不在播放列表中');
        }
    }
}


export default {
    state,
    initAudio,
    setPlaylist,
    setSrc,
    playIndex,
    play,
    playMulti,
    pause,
    toggle,
    next,
    prev,
    setMode,
    put_in_playlist,
    insertNext,
    del_from_list,
    setCurrentTime,
    play_in_playlist,
};
