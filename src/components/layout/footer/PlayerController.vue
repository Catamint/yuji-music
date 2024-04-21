<template>
    <div class="container">
        <n-icon size="40">
            <Previous32Filled />
        </n-icon>
        <n-icon size="40">
            <Play32Filled />
        </n-icon>
        <n-icon size="40">
            <Next32Filled />
        </n-icon>
    </div>

</template>

<script>

import { Previous32Filled, Next32Filled, Play32Filled } from "@vicons/fluent";
import { NIcon } from "naive-ui";

export default{
  name: 'PlayerController',
  components: {
    NIcon,
    Previous32Filled,
    Next32Filled,
    Play32Filled
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    display: flex;
    height: 100%;
    border: 50px;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
}
</style>
