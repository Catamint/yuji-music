<template>
    <!-- <button @click="fun" class="function-btn">刷新数据</button> -->
    <div class="table" v-for="t in tableInfo" :id="`${t.tablename}-table`">
        <h1>{{ t.tablenameCN }}</h1>
        <h2>{{ t.tablename }}</h2>
        <table>
            <thead>
                <tr>
                    <th v-for="col in t.head.value">{{ col }}</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-for="col in t.head.value"><input type="text"></td>
                    <td><button class="function-btn add-btn" @click="AddRow(t.tablename)">添加数据</button></td>
                </tr>
                <tr v-for="vs in t.data.value">
                    <td v-for="v in vs">{{ v }}</td>
                    <td>
                        <button class="function-btn change-btn" @click="Change(t.tablename,vs[0])">修改</button>
                        <button class="function-btn delete-btn" @click="Delete(t.tablename,vs[0],t.head.value[0])">删除</button>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>

</template>

<script lang="ts" setup>
import axios from 'axios';
import {ref,onUnmounted} from 'vue';



let userTableData = ref('')
let userTableHead = ref('')

let teamTableData = ref('')
let teamTableHead = ref('')

let userTeamRelationshipTableData = ref('')
let userTeamRelationshipTableHead = ref('')

let joinInfoTableData = ref('')
let joinInfoTableHead = ref('')

async function fun(){
  const userres = await axios.post('http://127.0.0.1:5000/get_db', {
    tablename:'user'
  })
  userTableHead.value = userres.data.head
  userTableData.value = userres.data.data

  const teamres = await axios.post('http://127.0.0.1:5000/get_db', {
    tablename:'team'
  })
  teamTableHead.value = teamres.data.head
  teamTableData.value = teamres.data.data

  const relationres = await axios.post('http://127.0.0.1:5000/get_db', {
    tablename:'user_team_relationship'
  })
  userTeamRelationshipTableHead.value = relationres.data.head
  userTeamRelationshipTableData.value = relationres.data.data

  const joinres = await axios.post('http://127.0.0.1:5000/get_db', {
    tablename:'joinInfo'
  })
  joinInfoTableHead.value = joinres.data.head
  joinInfoTableData.value = joinres.data.data

}

fun()

let timer = setInterval(fun,2000)

onUnmounted(() =>{
    clearInterval(timer)
}
)


let tableInfo = [
    {tablename:'user',tablenameCN:'用户表',data:userTableData,head:userTableHead},
    {tablename:'team',tablenameCN:'团队表',data:teamTableData,head:teamTableHead},
    {tablename:'user_team_relationship',tablenameCN:'团队关系表',data:userTeamRelationshipTableData,head:userTeamRelationshipTableHead},
    {tablename:'joinInfo',tablenameCN:'团队申请加入表',data:joinInfoTableData,head:joinInfoTableHead},
]


function Change(tname,idx){
    console.log(tname)
    console.log(idx)
}

async function Delete(tname,id,col){
    const res = await axios.post('http://127.0.0.1:5000/delete_row_from_db', {
    tablename:tname,
    id:id,
    col:col
  })
  fun()
  console.log(res.data)
}

async function AddRow(tname){
    let table = document.getElementById(tname+'-table')
    let tb = table.getElementsByTagName('tbody')[0]
    let tr = tb.getElementsByTagName('tr')[0]
    let inputs = tr.getElementsByTagName('input')
    let values = []
    for(let idx = 0;idx<inputs.length;idx++){
        let i = inputs[idx]
        values.push(i.value)
    }
    const res = await axios.post('http://127.0.0.1:5000/add_row_for_db', {
        tablename:tname,
        values:values
  })
  fun()
  console.log(res.data)

}

</script>

<style scoped>
/* .table{
    text-align: center;
    justify-items: center;
    justify-content: center;
} */
/* table{
    margin: auto;
} */

h1{
    font-size: 50px;
}

.table{
    text-align: center;
}

.table table {
        width:80%;
        margin:auto;
        border:0;
}
.table th {
    background-color:#5683ff;
    color:#FFFFFF
}
.table th,.table td {
    font-size:25px;
    text-align:center;
    padding:4px;
    border-collapse:collapse;
}
.table th,.table td {
    border: 1px solid #5683ff;
    border-width:1px 0 1px 0;
    border:2px inset #ffffff;
}
.table tr {
    border: 1px solid #ffffff;
}
.table tr:nth-child(odd){
    background-color:#5683ff2c;
}
.table tr:nth-child(even){
    background-color:#ffffff;
}

.function-btn{
    font-size: 25px;
    margin: 0 5px;
}

.function-btn:hover{
    filter: alpha(60);
}

.change-btn{
    background-color: rgb(54, 206, 54);
}
.delete-btn{
    background-color: rgb(206, 54, 54);
    color: white;
}
.add-btn{
    background-color: aqua;
}


</style>.table