<template>
    <el-cow class="el-cow">
        <el-col>
            <span class="title-text">当前集群的GPU资源信息</span>
            <el-table :data="tableData" style="width: 100%" border :cell-style="{ fontSize: '18px' }"
                :row-style="{ height: '65px' }">
                <el-table-column prop="hostname" label="hostname" width="180" />
                <el-table-column prop="computer" label="机房" width="180" />
                <el-table-column prop="CPU" label="CPU" width="180" />
                <el-table-column prop="memory" label="Memory" width="180" />
                <el-table-column prop="disk" label="Disk" width="180" />
                <el-table-column prop="bytes" label="网络带宽" width="180" />
                <el-table-column prop="GPU" label="GPU" width="220" />
            </el-table>
        </el-col>
    </el-cow>
</template>
<script setup>
const tableData = [
    {
        hostname: 'master-60',
        computer: 1,
        CPU: 8,
        memory: "16G",
        disk: '1.8TB',
        bytes: '1000MB/s',
        GPU: "",
    },
    {
        hostname: 'dell-61',
        computer: 1,
        CPU: 16,
        memory: "128G",
        disk: '240GB',
        bytes: '1000MB/s',
        GPU: "2*Tesla P100 12GB",
    },
    {
        hostname: 'dell-62',
        computer: 1,
        CPU: 16,
        memory: "128G",
        disk: '240GB',
        bytes: '1000MB/s',
        GPU: "2*Tesla P100 12GB",
    },
    {
        hostname: 'dell-64',
        computer: 1,
        CPU: 16,
        memory: "128G",
        disk: '240GB',
        bytes: '1000MB/s',
        GPU: "2*Tesla P100 12GB",
    },
    {
        hostname: 'dell-69',
        computer: 1,
        CPU: 16,
        memory: "128G",
        disk: '446GB',
        bytes: '1000MB/s',
        GPU: "2*Tesla P100 12GB",
    },
    {
        hostname: 'dell-65',
        computer: 2,
        CPU: 80,
        memory: "256G",
        disk: '240GB',
        bytes: '20000MB/s',
        GPU: "4*Tesla P100 32GB",
    },
    {
        hostname: 'dell-66',
        computer: 2,
        CPU: 80,
        memory: "256G",
        disk: '240GB',
        bytes: '20000MB/s',
        GPU: "4*Tesla P100 12GB",
    },
    {
        hostname: 'dell-67',
        computer: 2,
        CPU: 80,
        memory: "256G",
        disk: '240GB',
        bytes: '20000MB/s',
        GPU: "4*Tesla P100 12GB",
    },
    {
        hostname: 'dell-68',
        computer: 2,
        CPU: 80,
        memory: "256G",
        disk: '240GB',
        bytes: '20000MB/s',
        GPU: "4*Tesla P100 12GB",
    },
]
</script>
<style scoped>
body {
    font-family: 'Times New Roman', Times, serif;
}

::v-deep .el-table__header th {
    color: #505050;
    font-weight: bold;
    font-size: 20px;
}


.title-text {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    display: block;
    margin-bottom: 40px;
}

.el-table {
    width: 95%;
}

.el-cow {
    text-align: center;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
</style>
