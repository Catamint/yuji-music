<template>
    <div id="teamMatesInfo">
        <div v-for="p in teamMates">{{ p.username }} {{ instrumentMap[p.instrument] }}</div>
    </div>
    <div v-if="myChoice=='piano'">
        <Piano></Piano>
    </div>
    <div v-if="myChoice=='guitar'">
        <Guitar></Guitar>
    </div>
    <div v-if="myChoice=='drum'">
        <Drum></Drum>
    </div>
</template>

<script lang="ts" setup>
import {ref,onUnmounted} from 'vue'
import axios from 'axios';
import {useRoute,useRouter} from 'vue-router';
import Piano from '../components/Piano.vue';
import Drum from '../components/Drum.vue';
import Guitar from '../components/Guitar.vue';


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

onUnmounted(() =>{
    clearInterval(timer)
    if(userid == creatorId){
            DeleteTeam()
    }
    else{
        deleteMember(userid,teamId)
        router.push('/together')
    }

}
)

</script>

<style scoped>
</style>