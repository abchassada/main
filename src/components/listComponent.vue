<template>
  <el-scrollbar ref="scrollbarRef" class="projectMenu" always @scroll="scroll">
    <div class="mainContainer">
      <el-row :gutter="10">
      <el-col :span="6">
        <div class="podSelection">
          <span class="title">pod:</span>
          <el-select v-model="selectedPod" placeholder="Select" size="large">
            <el-option v-for="item in optionsPod" :key="item" :label="item" :value="item"/>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="gpuSelection">
          <span class="title">GPU:</span>
          <el-select v-model="selectedGpu" placeholder="Select" size="large">
            <el-option v-for="item in optionsGpu" :key="item" :label="item" :value="item"/>
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
            <el-select v-model="selectedHostname" placeholder="Select" size="large">
              <el-option v-for="item in optionHostname" :key="item" :label="item" :value="item"/>
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

<script>
import { ref ,onMounted} from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  props:["present"],
  data(){
    return{
      presentJob:this.present,
    }
  },
  setup() {
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
    const optionsGpu = ['option1','option2','option3','option4']
    const optionsPod = ['option1','option2','option3','option4']
    const optionHostname = ['option1','option2','option3','option4']
    return{
      selectedPod,
      selectedGpu,
      selectedHostname,
      optionsGpu,
      optionsPod,
      optionHostname
    }
  },
  mounted() {
    const presentJobName=this.presentJob;
    console.log('当前页面为'+presentJobName);
      axios.post('http://127.0.0.1:4523/m1/4085118-0-default/show/pods', {
          // 这里可以放置需要发送的数据，如果没有数据可以为空对象或null
          presentJobName,
      })
      .then(response => {
          // 当请求成功时，response包含了从后端返回的数据
          //console.log('从后端获取的数据：', response.data);
          //TODO 根据接口改改
          this.optionsPod =response.data.result;
      })
      .catch(error => {
          // 当请求发生错误时，error包含了错误信息
          console.error('获取数据失败：', error);
          this.optionsPod = ['err'];
      });
  }
}
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
