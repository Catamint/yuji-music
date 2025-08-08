### cardLayout

我的项目中目前有如下组件

```
public
 ┣ AlbumCardContainer.vue
 ┣ SonglistCardContainer.vue 
 ┣ CardContainer.vue 
 ┣ BaseAlbumItem.vue
 ┗ BaseMusicItem.vue
layout
 ┗ BaseCardLayout.vue
```

 其中 BaseCardLayout是一个通用的卡片组件，包含image，title，subtitle，等信息，actions是插槽，具有3种样式，
 BaseMusicItem，BaseAlbumItem派生自BaseCardLayout，传入的是music/album对象，添加了actions，
 CardContainer派生自BaseMusicItem，传入的是music对象列表，添加了标题，v-for, actions，
 AlbumCardContainer，SonglistCardContainer派生自BaseAlbumItem，传入的是album对象列表，添加了header，v-for，actions。

这样的组件有重复和不合理的逻辑，请指导我修改

### songService

我的vue项目从api获取的数据，包括音乐、专辑信息、专辑音乐列表、歌单信息、歌单音乐列表、搜索结果（包含音乐列表、歌单列表、专辑列表等）。其中音乐对象在歌单、专辑中的格式与音乐自身格式不同。这是我目前实现的songService，帮我修改成更优的格式。

``` js
Class Music {
    id: song.id,
    name: song.name,
    translatedName: song.transNames?.[0] || null,
    publishDate: formatDate(album.publishTime),
    duration: formatDuration(song.duration),
    artist: {
        id: artist.id || null,
        name: artist.name || '未知艺人',
    },
    album: {
        id: album.id || null,
        name: album.name || '未知专辑',
        translatedName: album.transNames?.[0] || null,
        picUrl: album?.picUrl || null,
        picId: album?.picId || null,
        picStr: album?.picStr || null,
    },
}

Class Album{
    id: albumData.id,
    name: albumData.name,
    translatedName: albumData.transNames?.[0] || null,
    publishDate: formatDate(albumData.publishTime || Date.now()),
    artist: {
        id: artist.id || null,
        name: artist.name || '未知艺人',
        alias: artist.alias || [],
        picUrl: artist.picUrl || artist.img1v1Url || null,
    },
    // 使用专辑的 picUrl 或构建 URL
    picStr: albumData.picId_str || null,
    blurPicUrl: albumData.blurPicUrl || null,
    size: albumData.size || 0,           // 专辑歌曲数量
    company: albumData.company || null,   // 发行公司
    description: albumData.description || null, // 专辑描述
    briefDesc: albumData.briefDesc || null, // 简要描述
    type: albumData.type || '专辑',      // 专辑类型
    subType: albumData.subType || null,   // 子类型
    // 统计信息
    info: {
        commentCount: albumData.info?.commentThread?.commentCount || 0,
        shareCount: albumData.info?.commentThread?.shareCount || 0,
        hotCount: albumData.info?.commentThread?.hotCount || 0,
        liked: albumData.info?.liked || false,
    },
    // 歌曲列表(懒加载，需要时调用另一个接口获取)
    songs: [
        {
            ...Music
            fee: song.fee || song.privilege?.fee || 0,    // 收费类型
            mvId: song.mv || 0,              // MV ID
            popularity: song.pop || 0,       // 流行度
            no: song.no || 0,                // 专辑中的曲目号
            cd: song.cd || '01',             // CD编号
        },
        ...
    ]
}

Class PlayList {
    ...rawPlaylist,
    id: rawPlaylist.id,
    name: rawPlaylist.name,
    description: rawPlaylist.description || '',
    picUrl: rawPlaylist.coverImgUrl || '',
    creator: {
        id: rawPlaylist.creator.userId,
        name: rawPlaylist.creator.nickname,
        avatar: rawPlaylist.creator.avatarUrl,
    },
    tracks: [
        ...Music
    ],
}

Class Artist {
    // 未完成
}

使用说明与迁移建议
容器层（列表组件）：继续在容器里对不同原始对象进行一次性转换（例如：rawList.map(item => normalizeSong(item, 'playlist'))），把转换后的统一结构传给通用卡片组件。

保留 raw 字段：normalizeSong 会在 raw 字段保留原始对象，方便你在 actions（播放/收藏/跳转）时使用原始 API 字段。

少用不必要的 async：大多数格式化函数是同步的，除非需要调用网络接口（如 getAlbumPicUrl），否则不需要 async/await。

错误处理：重构后每个对外 async 函数有 try/catch，错误信息更清晰，便于排查。

如果你有 TypeScript：建议把 normalizeSong 和 ViewModel 用 interface/type 明确声明，维护性会更好。


TODO:

歌曲缓存、歌单列表缓存、歌曲信息缓存
收藏, 收藏搜索
图片懒加载, 搜索滑动更新
线程池
安卓播放控件
列表遮罩覆盖
浮动搜索, 搜索历史, 搜索联想
play页 歌词
主页
用户页
pc上下文菜单
菜单显示问题
加载动画 错误信息

