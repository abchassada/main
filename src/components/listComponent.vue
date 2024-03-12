<template>
  <el-scrollbar ref="scrollbarRef" class="projectMenu" always @scroll="scroll">
    <div class="mainContainer">
      <el-row>
      <div>
        <projectTable />
      </div>
      </el-row>  
     <el-row :gutter="10">
      <el-col :span="6">
         <div class="podSelection">
          <span class="title">pod:</span>
          <el-select
            v-model="selectedPod"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in optionsPod"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="gpuSelection">
          <span class="title">gpu:</span>
          <el-select
            v-model="selectedGpu"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in optionsGpu"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
     </el-row>
  <el-row>
    <el-col :span="12">
      <div>
        <gpuUtilChart />
      </div>
    </el-col>
    <el-col :span="12">
      <div>
        <gpuMemChart />
      </div>
    </el-col>
  </el-row>  
  <el-row>
    <el-col :span="12">
      <div>
        <dramActiveChart />
      </div>
    </el-col>
    <el-col :span="12">
      <div>
        <fp32ActiveChart />
      </div>
    </el-col>
  </el-row>  
  <el-row>
    <el-col :span="12">
      <div>
        <smActiveChart />
      </div>
    </el-col>
    <el-col :span="12">
      <div>
        <smOccupancyChart />
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="6">
      <div class="hostnameSelection">
        <span class="title">hostname:</span>
        <el-select
          v-model="selectedHostname"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in optionHostname"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <div>
        <receiveBytesChart />
      </div>
    </el-col>
    <el-col :span="12">
      <div>
        <transmitBytesChart />
      </div>
    </el-col>
  </el-row>
  </div>
  </el-scrollbar>
</template>

<script setup>
import { ref } from 'vue'
import gpuUtilChart from './gpuUtilChart.vue'
import gpuMemChart from './gpuMemChart.vue'
import dramActiveChart from './dramActiveChart.vue'
import fp32ActiveChart from './fp32ActiveChart.vue'
import smActiveChart from './smActiveChart.vue'
import smOccupancyChart from './smOccupancyChart.vue'
import receiveBytesChart from './receiveBytesChart.vue'
import transmitBytesChart from './transmitBytesChart.vue'
import projectTable from './projectTable.vue'
const selectedPod = ref('')
const selectedGpu = ref('')
const selectedHostname = ref('')
const optionsGpu = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const optionsPod = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const optionHostname = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style >
.mainContainer{
  width:100%;
}
.podSelection {
  display: flex;
  align-items: center;
}
.gpuSelection {
  display: flex;
  align-items: center;
}
.hostnameSelection {
  display: flex;
  align-items: center;
}
.el-select{
  border-radius:5px;
}
.title{
  margin-right:10px;
}
</style>
