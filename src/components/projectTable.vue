<template>
  <el-table :data="tableData" border style="width: 100%" height="250">
    <el-table-column prop="pod" label="pod" width="342" />
    <el-table-column prop="node" label="node" width="166" />
    <el-table-column prop="ip" label="IP" width="166" />
    <el-table-column prop="gpu" label="GPUs" width="166" />
    <el-table-column prop="uuid" label="GPU UUIDs" width="343" />
  </el-table>
</template>

<script setup>
import {ref} from 'vue'
const tableData = ref([
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        node: 'dell-64',
        ip: '192.168.5.64',
        gpu: '0',
        uuid: 'GPU-dd41b996-e5a4-0795-b04...',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        node: 'dell-64',
        ip: '192.168.5.64',
        gpu: '1',
        uuid: 'GPU-dd41b996-e5a4-0795-b04...',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        node: 'dell-64',
        ip: '192.168.5.64',
        gpu: '0',
        uuid: 'GPU-dd41b996-e5a4-0795-b04...',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        node: 'dell-64',
        ip: '192.168.5.64',
        gpu: '1',
        uuid: 'GPU-dd41b996-e5a4-0795-b04...',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        node: 'dell-64',
        ip: '192.168.5.64',
        gpu: '0',
        uuid: 'GPU-dd41b996-e5a4-0795-b04...',
    },
    {
        pod: 'best-bert-yaml-with-data-set-1 a...',
        node: 'dell-64',
        ip: '192.168.5.64',
        gpu: '1',
        uuid: 'GPU-dd41b996-e5a4-0795-b04...',
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