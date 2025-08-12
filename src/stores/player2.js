// player.js
import songService from "@/services/songService";
import { computed } from "vue";
import { reactive } from 'vue';
import { CapacitorMusicControls } from "capacitor-music-controls-plugin";

export const PlayMode = {
    SEQUENTIAL: '列表循环', // 顺序播放
    RANDOM: '随机播放',         // 随机播放
    REPEAT_ONE: '单曲循环'  // 单曲循环
};

const state = reactive({
    audio: new Audio(),         // 音频对象
    playlist: [],               // 播放列表
    currentIndex: -1,           // 当前播放的歌曲索引
    isPlaying: computed(() => state.audio && state.currentTime >= 0 && state.audio.paused === false), // 是否正在播放
    mode: PlayMode.SEQUENTIAL, // 播放模式
    volume: 1,                  // 音量
    currentTime: 0,             // 当前播放时间
    duration: 0,                // 歌曲总时长
});

/**
 * 将远程图片 URL 转换为 Base64 字符串
 * @param {string} url - 图片的远程 URL
 * @returns {Promise<string>} - Base64 字符串，如果失败则返回空字符串
 */
async function getBase64Image(url) {
    if (!url) return '';
    try {
        url = url.replace('http:', 'https:') + '?param=300y300';
        return url;
    } catch (error) {
        console.error('Error converting image to Base64:', error);
        return '';
    }
}

// 新增：判断通知栏是否已创建的标志
let isMusicControlsCreated = false;

/**
 * 将毫秒转换为 mm:ss 格式
 * @param {number} ms
 * @returns {string}
 */
function formatDuration(ms) {
    if (ms === undefined || ms === null || isNaN(ms)) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

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

    // 绑定 MusicControls 事件监听器
    CapacitorMusicControls.addListener("controlsNotification", (info) => {
        handleControlsEvent(info);
    });
    // 针对 Android 13 的兼容性处理
    document.addEventListener("controlsNotification", (event) => {
        const info = { message: event.message, position: 0 };
        handleControlsEvent(info);
    });
    
    /**
     * 处理来自 MusicControls 的事件
     * @param {Object} action - 事件对象
     */
    function handleControlsEvent(action) {
        const message = action.message;
        switch (message) {
            case 'music-controls-play':
                state.audio.play();
                break;
            case 'music-controls-pause':
                state.audio.pause();
                break;
            case 'music-controls-next':
                next();
                break;
            case 'music-controls-previous':
                prev();
                break;
            case 'music-controls-destroy':
                state.audio.pause();
                CapacitorMusicControls.destroy();
                isMusicControlsCreated = false;
                break;
            case 'music-controls-toggle-play-pause':
                toggle();
                break;
            // 其他事件，如快进/快退等，可以根据需要添加
            default:
                break;
        }
    };
}

/**
 * 歌曲播放结束后，自动播放下一首
 */
function onEnded() {
    if (state.mode === PlayMode.REPEAT_ONE) {
        state.audio.currentTime = 0; // 重置到开头
        state.audio.play();
    } else {
        next();
    }
}

/**
 * 播放事件
 * 同步 MusicControls 状态为播放
 */
function onPlay() {
    // 确保通知栏的播放状态同步
    CapacitorMusicControls.updateIsPlaying({ isPlaying: true });
}

/**
 * 暂停事件
 * 同步 MusicControls 状态为暂停
 */
function onPause() {
    // 确保通知栏的播放状态同步
    CapacitorMusicControls.updateIsPlaying({ isPlaying: false });
}

/**
 * 时间更新事件
 * 更新 MusicControls 上的播放进度
 */
function onTimeUpdate() {
    state.currentTime = state.audio.currentTime;
}

/**
 * 歌曲加载元数据（获取歌曲时长）
 */
function onLoadedMetadata() {
    state.duration = state.audio.duration;
}

/**
 * 设置播放时间
 * @param {number} time
 */
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

/**
 * 设置播放列表
 * @param {Array} playlist
 */
function setPlaylist(playlist) {
    state.playlist = playlist;
    state.currentIndex = 0;
}

/**
 * 设置音频源
 * @param {string} url
 */
function setSrc(url) {
    state.audio.src = url;
    state.audio.load();
}

/**
 * 创建或更新 MusicControls 通知栏
 */
async function updateMusicControls() {
    const track = state.playlist[state.currentIndex];
    if (!track) return;

    const artistName = track.artist?.name || '未知艺人';
    const coverUrl = track.album?.picUrl || '';
    console.log("coverurl", coverUrl);
    const duration = state.duration;
    const base64Cover = await getBase64Image(coverUrl);

    // 如果通知栏未创建，则创建它
    if (!isMusicControlsCreated) {
        try {
            await CapacitorMusicControls.create({
                track: track.name,
                artist: artistName,
                cover: base64Cover,
                isPlaying: true, // 播放时创建
                dismissable: true,
                hasPrev: true,
                hasNext: true,
                hasClose: true,
                ticker: `正在播放: "${track.name}"`,
                album: track.album?.name || '', // optional, default: ''
                // hasSkipForward: true, // default: false. true value overrides hasNext.
                // hasSkipBackward: true, // default: false. true value overrides hasPrev.
                // skipForwardInterval: 15, // default: 15.
                // skipBackwardInterval: 15, // default: 15.
                hasScrubbing: false, // default: false. Enable scrubbing from control center progress bar
                playIcon: "media_play",
                pauseIcon: "media_pause",
                prevIcon: "media_prev",
                nextIcon: "media_next",
                closeIcon: "media_close",
                notificationIcon: "notification",
            });
            isMusicControlsCreated = true;
        } catch (error) {
            console.error('通知栏播放控件创建失败', error);
        }
    } else {
        try {
            // 如果已创建，则销毁它然后重新创建
            await CapacitorMusicControls.destroy();
            isMusicControlsCreated = false;
            await CapacitorMusicControls.create({
                track: track.name,
                artist: artistName,
                cover: base64Cover,
                isPlaying: true, // 播放时创建
                dismissable: true,
                hasPrev: true,
                hasNext: true,
                hasClose: true,
                ticker: `正在播放: "${track.name}"`,
                album: track.album?.name || '', // optional, default: ''
                // hasSkipForward: true, // default: false. true value overrides hasNext.
                // hasSkipBackward: true, // default: false. true value overrides hasPrev.
                // skipForwardInterval: 15, // default: 15.
                // skipBackwardInterval: 15, // default: 15.
                hasScrubbing: false, // default: false. Enable scrubbing from control center progress bar
                playIcon: "media_play",
                pauseIcon: "media_pause",
                prevIcon: "media_prev",
                nextIcon: "media_next",
                closeIcon: "media_close",
                notificationIcon: "notification",
            });
            isMusicControlsCreated = true;
        } catch (error) {
            console.error('通知栏播放控件创建失败', error);
        }
    }
}

/**
 * 播放指定索引的歌曲
 * @param {number} index
 */
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

    // 更新通知栏
    await updateMusicControls();
}

/**
 * 播放单曲
 * @param {Object} music_details
 */
async function play(music_details) {
    try {
        const songUrl = await songService.getSongUrl(music_details.id);
        if (songUrl) {
            music_details.url = songUrl;
            music_details.playing = true;
            state.playlist = [music_details];
            state.currentIndex = 0;
            playIndex();
        } else {
            console.error('无法获取歌曲链接');
        }
    } catch (error) {
        console.error('Error fetching song URL:', error.message);
    }
}

/**
 * 播放歌曲列表
 * @param {Array} songlist
 */
async function playMulti(songlist, index = 0) {
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

    state.currentIndex = index;
    playIndex();
}

/**
 * 从播放列表中播放指定歌曲
 * @param {number} id
 */
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

/**
 * 暂停
 */
function pause() {
    state.audio.pause();
}

/**
 * 切换播放/暂停状态
 */
function toggle() {
    if (state.audio.paused) {
        state.audio.play();
    } else {
        state.audio.pause();
    }
}

/**
 * 下一曲
 */
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

/**
 * 上一曲
 */
async function prev() {
    if (state.mode === PlayMode.RANDOM) {
        state.currentIndex = Math.floor(Math.random() * state.playlist.length);
    } else {
        state.currentIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
    }
    await playIndex();
}

/**
 * 设置播放模式
 * @param {string} mode
 */
function setMode(mode) {
    if (Object.values(PlayMode).includes(mode)) {
        state.mode = mode;
    }
}

/**
 * 将歌曲插入到下一首播放
 * @param {Object} song
 */
function put_in_playlist(song) {
    state.playlist.splice(state.currentIndex + 1, 0, song);
}

/**
 * 从播放列表中删除歌曲
 * @param {number} id
 */
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
    del_from_list,
    setCurrentTime,
    play_in_playlist,
};