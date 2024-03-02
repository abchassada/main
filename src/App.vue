<template>
  <HomeView />
  <e-charts class="chart" :option="option"/>
</template>
<script>
import HomeView from './views/HomeView.vue'
export default {
  components:{
    HomeView
  }
}
</script>
<script setup>
import { ref } from 'vue';
const option = ref({
  title: {
    text: 'GPU UTIL'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['forward layer', 'backward layer']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1', '2', '3', '4', '5', 'epoch']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}%'
    }
  },
  series: [
    {
      name: 'forward layer',
      type: 'line',
      data: [10, 32, 61, 34, 90]
    },
    {
      name: 'backward layer',
      type: 'line',
      data: [82, 92, 91, 34, 29]
    }
  ]
})
</script>
<style scoped>
.chart {
  height: 400px;
  width: 600px;
}
</style>