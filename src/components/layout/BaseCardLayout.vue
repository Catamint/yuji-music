<template>
  <div
    v-if="layout === 'card'"
    :class="['base-item', layoutClass]"
    class="press-active"
    @click="onClick"
  >
    <div>
      <img :src="image" class="cover-img" />
      <div class="card-overlay">
        <div class="info">
          <span class="title" @click="onTitleClick">{{ title }}</span>
          <span class="subtitle" @click="onSubtitleClick">{{ subtitle }}</span>
          <span class="description" @click="onDescriptionClick">{{ description }}</span>
        </div>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
  <div
    v-if="layout === 'list'"
    class="flex w-full h-20 my-2 items-center gap-4 p-2 rounded-lg back-hover transition"
  >
    <img
      :src="image"
      alt="cover"
      class="w-20 h-20 object-cover rounded-xl shrink-0"
      @click.stop="onTitleClick"
    />
    <div class="flex-1 min-w-0 overflow-hidden" @click.stop="onTitleClick">
      <div
        class="text-base font-medium truncate cursor-pointer hover:underline"
        @click.stop="onTitleClick"
      >
        {{ title }}
      </div>
      <div
        class="text-sm text-gray-500 truncate cursor-pointer hover:underline pointer-events-none md:pointer-events-auto"
        @click.stop="onSubtitleClick"
      >
        {{ subtitle }}
      </div>
      <div
        class="text-xs text-gray-400 truncate cursor-pointer pointer-events-none md:pointer-events-auto"
        @click.stop="onDescriptionClick"
      >
        {{ description }}
      </div>
    </div>
    <div class="flex items-center gap-2">
      <slot name="actions"></slot>
    </div>
  </div>

  <div
    v-if="layout === 'compact'"
    class="flex w-full items-center px-3 py-2 transition rounded-lg text-sm back-hover press-active"
  >
    <!-- 序号 -->
    <div v-if="index" class="flex-shrink-0 flex items-center min-w-8 gap-2">
      {{ index }}
    </div>
    <!-- 内容主体 -->
    <div
      class="flex flex-col flex-1 md:flex-row md:items-center gap-1 md:gap-4 min-w-0"
      @click.stop="onTitleClick"
    >
      <!-- 标题 -->
      <div
        class="font-semibold flex-1 truncate md:text-lg md:w-2/5 md:flex-1 cursor-pointer hover:underline"
        @click.stop="onTitleClick"
      >
        {{ title }}
      </div>

      <!-- 歌手 + 描述 -->
      <div
        class="flex flex-inline max-w-3xs md:max-w-xl md:flex-col gap-2 md:gap-0 md:flex-1 truncate text-xs md:text-sm min-w-0 pointer-events-none md:pointer-events-auto"
      >
        <div
          class="truncate text-neutral-400 cursor-pointer hover:underline pointer-events-none md:pointer-events-auto"
          @click.stop="onSubtitleClick"
        >
          {{ subtitle }}
        </div>
        <div
          class="truncate max-w-32 md:max-w-xl text-neutral-500 cursor-pointer hover:underline pointer-events-none md:pointer-events-auto"
          @click.stop="onDescriptionClick"
        >
          {{ description }}
        </div>
      </div>
    </div>

    <!-- 操作区 -->
    <div class="flex-shrink-0 flex items-center gap-2 ml-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import defaultImage from "@/assets/image/default_cover.jpg";
export default {
  name: "BaseCard",
  inheritAttrs: false,
  props: {
    image: {
      type: String,
      default: defaultImage,
    },
    title: String,
    subtitle: String,
    description: String,
    layout: {
      type: String,
      default: "default", // or 'compact' | 'card'
    },
    actions: Array, // 自定义按钮数组，包含图标、文字、事件
    classMap: {
      type: Object,
      default: () => ({}),
    },
    index: {
      // type: String || Number,
      default: "",
    },
  },
  computed: {
    layoutClass() {
      return `layout-${this.layout}`;
    },
    showImage() {
      return this.layout !== "compact";
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    onTitleClick() {
      this.$emit("title-click");
    },
    onSubtitleClick() {
      this.$emit("subtitle-click");
    },
    onDescriptionClick() {
      this.$emit("description-click");
    },
  },
};
</script>

<style>
/* 通用卡片样式 */
.base-item {
  display: flex;
  align-items: center;
  border-radius: 12px;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.base-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cover-img {
  object-fit: cover;
  border-radius: 8px;
}

.info {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.subtitle,
.description {
  font-size: 0.9rem;
  /* color: #666; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.actions {
  display: flex;
  gap: 10px;
  padding: 10px;
}

/* 卡片布局 */
.layout-card {
  flex-direction: column;
  /* width: 200px;
    height: 200px; */
  margin: 10px;
  position: relative;
  overflow: hidden;
  cursor: auto;
  flex: 1 1 calc(20% - 40px) !important;
  /* 默认每行5个 */
  aspect-ratio: 1 / 1 !important;
  /* 保持正方形 */
  max-height: auto !important;
  height: auto !important;
  max-width: calc(20% - 40px) !important;
  box-sizing: border-box !important;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .layout-card {
    flex: 1 1 calc(25% - 30px) !important;
    /* 每行4个 */
    max-width: calc(25% - 30px) !important;
  }
}

@media (max-width: 1000px) {
  .layout-card {
    flex: 1 1 calc(33.333% - 20px) !important;
    /* 每行3个 */
    max-width: calc(33.333% - 20px) !important;
  }
}

@media (max-width: 720px) {
  .layout-card {
    flex: 1 1 calc(50% - 20px) !important;
    /* 每行2个 */
    max-width: calc(50% - 20px) !important;
  }
}

/* @media (max-width: 480px) {
    .layout-card {
        flex: 1 1 100% !important;
        max-width: 100% !important;
    }
} */

.layout-card .cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.layout-card:hover .cover-img {
  transform: scale(1.05);
  filter: brightness(110%);
}

/* 卡片遮罩层 */
.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 15px;
  z-index: 2;
}

.layout-card .card-overlay .info {
  flex: 1;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

.layout-card .card-overlay .title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.layout-card .card-overlay .subtitle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2px;
}

.layout-card .card-overlay .description {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0;
}

.layout-card .actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: 3;
  pointer-events: auto;
}

.layout-card .actions button {
  background-color: rgba(80, 80, 80, 0.4);
  --icon-size: 28px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s ease;
}
.layout-card .actions:hover button {
  transform: scale(1.05);
  background-color: rgba(80, 80, 80, 0.6);
}

/* .layout-card .actions button {
  @apply bg-primary;
} */
</style>
