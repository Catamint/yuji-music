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
        img: album?.img || null,
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
    img: rawPlaylist.coverImgUrl || '',
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