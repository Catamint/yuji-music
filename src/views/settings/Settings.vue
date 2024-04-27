<template>
  <ul>
    <li>
      <p>{{ utils.user_config }}</p> 
      <n-space>
        <span>背景 </span><n-switch v-model:value="active" />
        <!-- <n-switch v-model:value="active" disabled /> -->
      </n-space>
    </li>
    <li>
      <span>主题</span>
      <n-space vertical>
        <n-select v-model:value="value" :options="options" />
        <!-- <n-select v-model:value="value" disabled :options="options" /> -->
      </n-space>
    </li>
  </ul>


</template>

<script>
import { NSelect, NSwitch } from 'naive-ui';
import { ref } from 'vue';
import { utils } from '@/stores/utils';

export default {
  name: 'Settings',
  props: {
    msg: String
  },
  data(){
    return {
      utils
    }
  },
  components:{
    NSwitch,
    NSelect
  },
  setup() {
    return {
      value: ref(null),
      options: [
        {
          label: "浅色",
          value: "light",
        },
        {
          label: "深色",
          value: "dark"
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
