<template>
  <div class="flex flex-wrap gap-4 items-center">
    <div class="podSelection">
      <span>pod:</span>
      <el-select
        v-model="selectedPod"
        placeholder="Select"
        size="large"
        style="width: 240px"
      >
        <el-option
          v-for="item in optionsPod"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="gpuSelection">
      <span>gpu:</span>
      <el-select
        v-model="selectedGpu"
        placeholder="Select"
        size="large"
        style="width: 240px"
      >
        <el-option
          v-for="item in optionsGpu"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="echarts-container" style="width: 600px; height: 400px;"></div>
    <div class="hostname">
      <span>hostname:</span>
      <el-select
        v-model="selectedHostname"
        placeholder="Select"
        size="large"
        style="width: 240px"
      >
        <el-option
          v-for="item in optionHostname"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { ref ,onMounted} from 'vue'
import * as echarts from 'echarts'
const selectedPod = ref('')
const selectedGpu = ref('')
const selectedHostname = ref('')
onMounted(() => {
  const chartContainer = document.querySelector('.echarts-container')
  const chart = echarts.init(chartContainer)
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
  chart.setOption(option)
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
<style>
.flex {
  display: flex;
}

.gap-4 > * {
  margin-right: 1rem; 
}
.podSelection,
.gpuSelection,
.hostname {
  flex: 1; 
}

.podSelection,
.gpuSelection {
  display: flex;
  align-items: center;
}

.podSelection span,
.gpuSelection span,
.hostname span {
  min-width: 80px;
  margin-right: 10px; 
}

.el-select {
  flex: 1; 
}
.echarts-container{
    width: 100%;
  margin-top: 20px; /* 根据实际需要调整间距 */
}
</style>
