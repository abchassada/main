<template>
    <div class="title-container">
        <span class="title-text">CPU资源申请情况</span>
    </div>
    <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column prop="PodName" label="pod" width="400" />
        <el-table-column prop="HostName" label="host" width="300" />
        <el-table-column prop="IP" label="IP" width="300" />
        <el-table-column prop="CpuNum" label="CPU" />
    </el-table>
</template>

<script>
import {ref} from 'vue'
import axios from 'axios'
export default{
    props: ['presentJobId'],
    setup(props){
        const tableData = ref([])
        const getTable = () => {
            var FormData = require('form-data');
            var data = new FormData();
            data.append('jobid', '' + props.presentJobId);
            axios.post('/show/cpuinfo', data)
            .then(response => {
                console.log("获取table成功", response.data.result);
                tableData.value = response.data.result; 
            })
            .catch(error => {
                console.error('获取数据失败：', error);
                tableData.value = ['err']; 
            });
        };
        return{
            tableData,
            getTable,
        }
    },
    watch: {
        presentJobId: {
        immediate: true, 
        handler(newValue, oldValue) {
            console.log('表格获取到的jobid：', newValue,oldValue);
            this.getTable();
        }
        }
    }
}
</script>

<style scoped>
body {
    font-family: 'Times New Roman', Times, serif;
}
::v-deep .el-table__header th {
color: #505050;
font-weight: bold;
}
.title-container {
display: flex;
justify-content: center;
margin-bottom: 10px; 
}

.title-text {
font-size: 18px;
font-weight: bold;
}
</style>