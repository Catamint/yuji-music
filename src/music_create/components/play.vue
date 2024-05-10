<template>
    <div class="box">
        <h3>音乐共创</h3>
        <div v-if="myChoice=='piano'">
            <Piano :asComponent="true"></Piano>
        </div>
        <div v-if="myChoice=='guitar'">
            <Guitar :asComponent="true"></Guitar>
        </div>
        <div v-if="myChoice=='drum'">
            <Drum :asComponent="true"></Drum>
        </div>
        <div id="teamMatesInfo">
            <div v-for="p in teamMates">{{ p.username }} {{ instrumentMap[p.instrument] }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref,onUnmounted} from 'vue'
import axios from 'axios';
import {useRoute,useRouter} from 'vue-router';
import Piano from './Piano.vue';
import Drum from './Drum.vue';
import Guitar from './Guitar.vue';


let route = useRoute()
let {query} = route
let teamId = ref(query.teamId)
let teamName = ref(query.teamName)

let userid = localStorage.getItem('uid')
let teamMates = ref('')
let joinInfo = ref('')
let creatorId = ref('')
let myChoice = ref('')

let instrumentMap = {
    'guitar':'吉他',
    'piano':'钢琴',
    'drum':'架子鼓'
}

const fun =async ()=>{
    const res = await axios.post('http://127.0.0.1:5000/get_team_info', {
    teamId:teamId.value
  })
  teamMates.value = res.data.teamMates
  joinInfo.value = res.data.joinInfo
  creatorId.value = res.data.creatorId
  let flag = true
  for(let i =0;i<teamMates.value.length;i++){
    if(teamMates.value[i]['uid'] == userid){
        flag = false
        myChoice.value = teamMates.value[i]['instrument']
    }
  }  
}

fun()


async function DeleteTeam(){
    const res = await axios.post('http://127.0.0.1:5000/delete_team', {
    teamId:teamId.value
  })
  console.log(res.data)
  if(res.data.status){
    router.push('/together')
  }
}

async function deleteMember(uid,tid) {
    const res = await axios.post('http://127.0.0.1:5000/delete_member', {
    tid:tid,
    uid:uid,
  })
  console.log(res.data)
}

let timer = setInterval(fun,2000)

onUnmounted(() =>{
    clearInterval(timer)
    if(userid == creatorId.value){
            DeleteTeam()
    }
    else{
        deleteMember(userid,teamId.value)
        router.push('/together')
    }

}
)

</script>

<style scoped>
.box{
    display: flex;
    flex-direction: column;
    height:80vh;
    width:100%;
    /* align-items: betwee; */
    justify-content: space-between;
}
</style>