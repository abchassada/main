<template>
  <el-table :data="tableData" border style="width: 100%" height="250">
    <el-table-column prop="pod" label="pod" width="493" />
    <el-table-column prop="host" label="host" width="230" />
    <el-table-column prop="ip" label="IP" width="230" />
    <el-table-column prop="gpu" label="GPUs" width="230" />
  </el-table>
</template>

<script setup>
import {ref} from 'vue'
const tableData = ref([
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        host: 'dell-64',
        ip: '192.168.5.64',
        gpu: '0',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        host: 'dell-64',
        ip: '192.168.5.64',
        gpu: '1',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        host: 'dell-64',
        ip: '192.168.5.64',
        gpu: '0',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        host: 'dell-64',
        ip: '192.168.5.64',
        gpu: '1',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        host: 'dell-64',
        ip: '192.168.5.64',
        gpu: '0',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        host: 'dell-64',
        ip: '192.168.5.64',
        gpu: '1',
    },
]);
</script>

<style scoped>
::v-deep .el-table__header th {
  background-color: #f6f6f8;
  color: #505050;
  font-weight: bold;
}
</style>