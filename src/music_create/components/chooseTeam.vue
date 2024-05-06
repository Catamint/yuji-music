<template>
    <button class="function-btn" @click="startCreateTeam">创建团队</button>
    <button class="function-btn" @click="startJoinTeam">加入团队</button>

    <div class="menu" id="create-menu" style="display: none;">
        <h4>创建团队</h4>
        <label for="team-id" >团队ID</label><input name="team-id" type="text" v-model="teamId"><br>
        <label for="team-id" >团队名</label><input name="team-name" type="text" v-model="teamName"><br>        
        <label for="team-id" >团队密码</label><input name="team-id" type="text" v-model="teamPassword"><br>
        <button @click="tryToCreate">完成创建</button>

    </div>

    <div class="menu" id="join-menu" style="display: none;">
        <h4>搜索团队</h4>
        <label for="team-id">团队ID</label><input name="team-id" type="text" v-model="teamId"><br>
        <label for="team-id">团队名</label><input name="team-name" type="text" v-model="teamName"><br>        
        <button @click="search">搜索团队</button>
    </div>

    <div class="menu" id="search_result" style="display: none;">
        <table>
            <thead>
                <th>团队名</th>
                <th>团队ID</th>
                <th>创建人ID</th>
                <th>需要密码</th>
                <th>操作</th>
            </thead>
            <tbody>
                <tr v-for="row in searchResult">
                    <td>{{ row.tname }}</td>
                    <td>{{ row.tid }}</td>
                    <td>{{ row.creatorId }}</td>
                    <td v-if="row.needPassword">√</td>
                    <td v-else>×</td>
                    <td><button @click="tryToJoin(row.tid,row.tname)">申请加入</button></td>
                </tr>

            </tbody>


        </table>
    </div>

</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
let teamId = ref(BigInt(`0x${uuidv4().replace(/-/g, '')}`).toString().slice(0,8))
// let teamId = ref(10312516)
let teamName = ref('除了光以外的团队')
let team = ref('')
let teamPassword = ref('')

let searchResult = ref('')

let uid = localStorage.getItem("uid")
console.log(uid)

const router = useRouter()
let result = ref('')

const tryToCreate = async ()=>{
    const res = await axios.post('http://127.0.0.1:5000/create_team', {
    userId:uid,
    teamId:teamId.value,
    teamName:teamName.value,
    teamPassword:teamPassword.value
  })
//   result.value = res.data
  console.log(res.data)
  let status = res.data.status
  if(status){
    router.push({
        path:'/together/teamRoom',
        query:{
            teamId:teamId.value,
            teamName:teamName.value
        }
    })
  }
}


function startCreateTeam(){
    document.getElementById('create-menu').style.display = ''
    document.getElementById('join-menu').style.display = 'none'
    document.getElementById('search_result').style.display = 'none'

}

function startJoinTeam(){
    document.getElementById('create-menu').style.display = 'none'
    document.getElementById('join-menu').style.display = ''
}

async function search(){
    document.getElementById('search_result').style.display = ''
    const res = await axios.post('http://127.0.0.1:5000/search_team', {
    tid:teamId.value,
    tname:teamName.value,
  })
  console.log(res.data)
  searchResult.value = res.data.data
  console.log(searchResult.value)
}

async function tryToJoin(tid){
    const res = await axios.post('http://127.0.0.1:5000/join_team', {
    tid:tid,
    uid:uid
  })
  if(res.data.status){
    waitForResponse(tid)
  }
}

async function waitForResponse(tid,tname) {
    const res = await axios.post('http://127.0.0.1:5000/check_join_result', {
    tid:tid,
    uid:uid
  })
  if(res.data.status){
    if(res.data.isAccept){
        router.push({
            path:'/together/teamRoom',
            query:{
            teamId:tid,
            teamName:tname
        }
        })
    }
  }

}

</script>

<style scoped>
.function-btn{
    font-size:50px;
    margin: 10px;
    /* background-color: rgb(137, 20, 214); */
}
table{
    text-align: center;
}
</style>