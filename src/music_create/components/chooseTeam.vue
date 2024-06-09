<template>
    <div class="box" >
        <div>
            <n-button v-show="uid" size="large" class="function-btn" @click="startCreateTeam">创建团队</n-button>
            <n-button v-show="uid" size="large" class="function-btn" @click="startJoinTeam">加入团队</n-button>
        </div>
        <div class="content">
            <div v-if="uid" class="glass" id="startup-menu" style="display: flex; justify-content: center; align-items: center; width:30%; height:40%">
                单击选项以创建或加入团队
            </div>
            <div v-else class="glass" id="startup-menu" style="display: flex; justify-content: center; align-items: center; width:30%; height:40%">
                登录以创建或加入团队

            </div>
            <div class="menu glass" id="create-menu" style="display: none;">
                <h3 class="margin-bottom">创建团队</h3>
                <label for="team-id" >团队ID</label><n-input class="margin-bottom" name="team-id" type="text" v-model:value="teamId"/><br>
                <label for="team-id" >团队名</label><n-input class="margin-bottom" name="team-name" type="text" v-model:value="teamName"/><br>        
                <label for="team-id" >团队密码 (可为空)</label><n-input class="margin-bottom" name="team-id" type="text" v-model:value="teamPassword"/><br>
                <n-button class="margin-bottom" type="success" @click="tryToCreate">完成创建</n-button>
            </div>
            <div class="menu-fullscreen" id="join-menu" style="display: none;">
                <div class="menu">
                    <h3 class="margin-bottom">搜索团队</h3>
                    <label for="team-id">团队ID</label><n-input class="margin-bottom" name="team-id" type="text" v-model:value="teamId"/><br>
                    <label for="team-id">团队名</label><n-input class="margin-bottom" name="team-name" type="text" v-model:value="teamName"/><br>        
                    <n-button class="margin-bottom" type="success"  @click="search">搜索团队</n-button>
                </div>
                <div class="n-list-content" style="display:flex; justify-content: center; align-items: center;">
                    <div class="" id="search_result" style="display: none; width:80%;">
                        <n-list class="nlist" style="width:100%;">
                            <template #header>
                            <h2>搜索结果</h2>
                            </template>
                            <n-list-item v-for="row in searchResult">
                                <template #suffix>
                                    <n-button type="success" @click="tryToJoin(row.tid,row.tname)">申请加入</n-button>
                                </template>
                                <n-thing :title="row.tname" 
                                         :description="'创建人ID：' + row.creatorId">
                                    <!-- <th>团队ID</th> -->
                                </n-thing>
                            </n-list-item>
                        </n-list>
                        <!-- <table>
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
                        </table> -->
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { utils } from '@/stores/utils';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import { NButton, NInput, NSlider, NList,NThing,NListItem } from 'naive-ui'

let teamId = ref(BigInt(`0x${uuidv4().replace(/-/g, '')}`).toString().slice(0,8))
// let teamId = ref(10312516)
let teamName = ref('')
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

function gotoLogin(){
    this.$router.push({
        path: 'login'
      });
}

function startCreateTeam(){
    document.getElementById('create-menu').style.display = ''
    document.getElementById('startup-menu').style.display = 'none'
    document.getElementById('join-menu').style.display = 'none'
    document.getElementById('search_result').style.display = 'none'

}

function startJoinTeam(){
    document.getElementById('create-menu').style.display = 'none'
    document.getElementById('startup-menu').style.display = 'none'
    document.getElementById('join-menu').style.display = 'flex'
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
    font-size:20px;
    margin: 10px;
    /* background-color: rgb(167, 224, 217); */
}
table{
    text-align: center;
}
.box{
    display: flex;
    flex-direction: column;
    height:100%;
    weight:100%;
    align-items: center;
    justify-content: center;
}
.content{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.glass{
    padding: 40px;
    padding-left: 80px;
    padding-right: 80px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
}
.n-list-content{
    width: 50%; 
    height: 100%; 
    padding: 10px;
    /* display:flex; 
    justify-content: center; 
    align-items: start; */
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}
.nlist{

    /* display:flex; 
    justify-content: center; 
    align-items: start; */
    background-color: transparent;

    /* box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2); */
}
.menu-fullscreen{
    display: flex;
    /* flex-direction: column; */
    height:75%;
    width:80%;
    align-items: center;
    justify-content: space-around;
}
.margin-bottom{
    margin-bottom: 10px;
}
</style>