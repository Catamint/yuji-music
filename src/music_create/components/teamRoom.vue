<template>
    <h1>{{ teamName }} 团队ID:{{ teamId }}</h1>
    <div class="menu" id="teamMates">
        <h3>团队成员</h3>
        <table>
        <thead>
                <th>头像</th>
                <th>用户名</th>
                <th>乐器类型</th>
                <th>准备状态</th>
                <th>操作</th>

        </thead>
        <tbody>
            <tr v-for="p in teamMates">
                <td>{{ p.idx }}</td>
                <td>{{ p.username }}</td>
                <td>
                    <select @change="changeInstrument" name="country" v-if="p.uid == userid" v-model="myChoice">
                        <option value="piano" >钢琴</option>
                        <option value="guitar" >吉他</option>
                        <option value="drum" >架子鼓</option>
                        <option value="" disabled >敬请期待</option>
                    </select>
                    <span v-else>{{ instrumentMap[p.instrument] }}</span>
                </td>
                <td v-if="p.isReady && p.uid==userid"><button @click="changeReadyState">√</button></td>
                <td v-else-if="!p.isReady && p.uid==userid"><button @click="changeReadyState">×</button></td>
                <td v-else-if="p.isReady && p.uid != userid">√</td>
                <td v-else>×</td>
                <td v-if="p.type == 'cap' && p.uid == userid">
                    <button @click="DeleteTeam">解散队伍</button>
                </td>
                <td v-if="userid == creatorId && p.uid != userid">
                    <button @click="deleteMember(p.uid,teamId)">踢出团队</button>
                    <button>查看详情</button>
                </td>
                <td v-if="p.uid == userid && userid != creatorId ">
                    <button @click="leaveTeam(p.uid,teamId)">离开队伍</button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>等待加入</td>
                <td></td>
                <td></td>
                <td>
                    <button>邀请成员</button>
                </td>
            </tr>
        </tbody>
    </table>
    </div>

    <div class="menu" id="joinInfo">
        <h3>申请加入信息</h3>
        <table>
            <thead>
                <th>用户ID</th>
                <th>用户名</th>
                <th>操作</th>
            </thead>
            <tbody>
                <tr v-for="p in joinInfo">
                    <td>{{ p.uid }}</td>
                    <td>{{ p.username }}</td>
                    <td>
                        <button @click="processJoin(teamId,p.uid,'accept')">同意</button>
                        <button @click="processJoin(teamId,p.uid,'refuse')">拒绝</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <button @click="startPlay">开始演奏</button>
</template>

<script setup lang="ts">
import axios from 'axios';
import {ref,onUnmounted} from 'vue';
import {useRouter,useRoute} from 'vue-router';

// let result = ref([
//             {'idx':1,'uid':1234,'username':'除了光以外','type':'cap','instrument':'钢琴'},
//             {'idx':2,'uid':2546,'username':'星望舒','type':'member','instrument':'吉他'},
//             {'idx':3,'uid':8246,'username':'陕西交通职业技术学院','type':'member','instrument':'架子鼓'}    
//         ])

let instrumentMap = {
    'guitar':'吉他',
    'piano':'钢琴',
    'drum':'架子鼓'
}


let userid = localStorage.getItem('uid')

let teamMates = ref('')
let joinInfo = ref('')
let creatorId = ref('')

let route = useRoute()
let router = useRouter()

let {query} = route
let teamId = ref(query.teamId)
let teamName = ref(query.teamName)

let myChoice = ref('')


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
  if(flag){
    router.push('/together')
  }
  if(res.data.teamState == 1){
    router.push({
        path:'/together/play',
        query:{
            teamId:teamId.value,
            teamName:teamName.value
        }
    })
  }
}

fun()

console.log
let timer = setInterval(fun,2000)


let deleteTeamFlag = ref(true)
onUnmounted(() =>{
    clearInterval(timer)
    if(userid == creatorId){
        if(deleteTeamFlag.value){
            DeleteTeam()
        }
        
    }

}
)

async function DeleteTeam(){
    const res = await axios.post('http://127.0.0.1:5000/delete_team', {
    teamId:teamId.value
  })
  console.log(res.data)
  if(res.data.status){
    router.push('/together')
  }
}

async function processJoin(tid,uid,processType) {
    const res = await axios.post('http://127.0.0.1:5000/process_join', {
    tid:tid,
    uid:uid,
    processType:processType
  })
  console.log(res.data)
}


async function deleteMember(uid,tid) {
    const res = await axios.post('http://127.0.0.1:5000/delete_member', {
    tid:tid,
    uid:uid,
  })
  console.log(res.data)
}

function leaveTeam(uid,tid){
    deleteMember(uid,tid)
    router.push('/together')
}

async function changeInstrument(){
    const res = await axios.post('http://127.0.0.1:5000/change_instrument', {
    tid:teamId.value,
    uid:userid,
    instrument:myChoice.value
  })
  console.log(res.data)
}

async function changeReadyState(){
    const res = await axios.post('http://127.0.0.1:5000/change_ready_state', {
    tid:teamId.value,
    uid:userid,
  })
  console.log(res.data)
}

async function startPlay(){
    deleteTeamFlag.value = false
    const res = await axios.post('http://127.0.0.1:5000/change_team_state', {
    tid:teamId.value,
  })
  console.log(res.data)
}

</script>

<style>
table{
    text-align: center;
}
</style>