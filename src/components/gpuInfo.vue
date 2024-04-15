<template>
    <el-cow class="el-cow">
        <div class="button-container">
            <el-button type="success" class="success" @click="exportToExcel" plain>导出全部</el-button>
            <el-button type="warning" class="success" plain>编辑</el-button>
        </div>
        <el-col>
            <v-card hover style="background-color: #fafafa;border-radius: 25px;">
                <el-table :data="tableData" style="width: 100%" :cell-style="cellStyle" :row-style="{ height: '65px' }"
                    stripe>
                    <el-table-column prop="hostname" label="hostname" width="180" />
                    <el-table-column prop="computer" label="机房" width="180" />
                    <el-table-column prop="CPU" label="CPU" width="180" />
                    <el-table-column prop="memory" label="Memory" width="180" />
                    <el-table-column prop="disk" label="Disk" width="180" />
                    <el-table-column prop="bytes" label="网络带宽" width="180" />
                    <el-table-column prop="GPU" label="GPU" width="220" />
                </el-table>
            </v-card>
        </el-col>
    </el-cow>
</template>

<script setup>
import * as XLSX from 'xlsx';
import { ElMessage } from "element-plus";
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
        GPU: "4*Tesla V100 32GB",
    },
    {
        hostname: 'dell-66',
        computer: 2,
        CPU: 80,
        memory: "256G",
        disk: '240GB',
        bytes: '20000MB/s',
        GPU: "4*Tesla V100 32GB",
    },
    {
        hostname: 'dell-67',
        computer: 2,
        CPU: 80,
        memory: "256G",
        disk: '240GB',
        bytes: '20000MB/s',
        GPU: "4*Tesla V100 32GB",
    },
    {
        hostname: 'dell-68',
        computer: 2,
        CPU: 80,
        memory: "256G",
        disk: '240GB',
        bytes: '20000MB/s',
        GPU: "4*Tesla V100 32GB",
    },
]
const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); ElMessage({
        message: '下载成功！',
        type: 'success',
    })
};

const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0) {
        return { color: '#80bfff', fontSize: '18px' };
    }
}
</script>
<style scoped>
body {
    font-family: 'Times New Roman', Times, serif;
}

::v-deep .el-table__header th {
    color: #616161;
    font-weight: bold;
    font-size: 20px;
}

.success {
    width: 70px;
}

.button-container {
    position: absolute;
    top:70px;
    right:90px;;
    margin: 10px;
    /* 可根据需要调整按钮容器与 v-card 的间距 */
}

.el-table {
    width: 100%;
}

.el-cow {
    margin-top: 65px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
</style>
