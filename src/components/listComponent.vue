<template>
  <el-scrollbar ref="scrollbarRef" class="projectMenu" always @scroll="scroll">
    <div class="mainContainer">
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
      <div class="echarts-container" style="width: 600px; height: 400px;"></div>
    </el-col>
    <el-col :span="12">
      <div class="echarts-container" style="width: 600px; height: 400px;"></div>
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
      <div class="echarts-container" style="width: 600px; height: 400px;"></div>
    </el-col>
    <el-col :span="12">
      <div class="echarts-container" style="width: 600px; height: 400px;"></div>
    </el-col>
  </el-row>  
  <el-row>
    <el-col :span="12">
      <div class="echarts-container" style="width: 600px; height: 400px;"></div>
    </el-col>
    <el-col :span="12">
      <div class="echarts-container" style="width: 600px; height: 400px;"></div>
    </el-col>
  </el-row>    
  </div>
  </el-scrollbar>
</template>

<script setup>
import { ref ,onMounted} from 'vue'
import * as echarts from 'echarts'
const selectedPod = ref('')
const selectedGpu = ref('')
const selectedHostname = ref('')
onMounted(() => {
  const chartContainer = document.querySelectorAll('.echarts-container')
  const charts = []
  chartContainer.forEach(container => {
    const chart = echarts.init(container)
    charts.push(chart)
  })
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line'
    }]
  }
  charts.forEach(chart => {
    chart.setOption(option)
  })
})
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
