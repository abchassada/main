<template>
    <div class="title-container">
        <span class="title-text">CPU资源申请情况</span>
    </div>
    <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column prop="pod_name" label="pod" width="400" />
        <el-table-column prop="host_name" label="host" width="400" />
        <el-table-column prop="cpu_num" label="CPU"  />
    </el-table>
</template>

<script>
import {ref} from 'vue'
import axios from 'axios'
export default{
    setup(props){
        const tableData = ref([])
        const getTable = () => {
            axios.post('http://192.168.5.60:31089/show/cpuinfo', {
                jobid: props.presentJobId,
            })
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