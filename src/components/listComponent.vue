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
        <el-select v-model="selectedHostname" placeholder="Select" size="large">
          <el-option v-for="item in optionHostname" :key="item" :label="item" :value="item"/>
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

<script>
import gpuUtilChart from './gpuUtilChart.vue'
import gpuMemChart from './gpuMemChart.vue'
import dramActiveChart from './dramActiveChart.vue'
import fp32ActiveChart from './fp32ActiveChart.vue'
import smActiveChart from './smActiveChart.vue'
import smOccupancyChart from './smOccupancyChart.vue'
import receiveBytesChart from './receiveBytesChart.vue'
import transmitBytesChart from './transmitBytesChart.vue'
import { ref } from 'vue'
import axios from 'axios'
export default {
  props:["present"],
  data(){
    return{
      //presentJob:this.present,
    }
  },
  components:{
    gpuUtilChart,
    gpuMemChart,
    dramActiveChart,
    fp32ActiveChart,
    smActiveChart,
    smOccupancyChart,
    receiveBytesChart,
    transmitBytesChart,
  },
  setup(props) {
    const selectedPod = ref('')
    const selectedGpu = ref('')
    const selectedHostname = ref('')
    const optionsGpu = ref([])
    const optionsPod = ref(['option1', 'option2', 'option3', 'option4'])
    const optionHostname = ref(['option1','option2','option3','option4'])
    const getPod = () => {
      axios.post('http://127.0.0.1:4523/m1/4085118-0-default/show/pods', {
        jobname: props.present,
      })
      .then(response => {
        console.log("获取pod成功", response.data.result);
        optionsPod.value = response.data.result; 
      })
      .catch(error => {
        console.error('获取数据失败：', error);
        optionsPod.value = ['err']; 
      });
    };
    const getHostname = () => {
      axios.post('http://127.0.0.1:4523/m1/4085118-0-default/show/hosts', {
        jobname: props.present,
      })
      .then(response => {
        console.log("获取hostname成功", response.data.result);
        optionHostname.value = response.data.result; 
      })
      .catch(error => {
        console.error('获取数据失败：', error);
      });
    };
    const getGpu = () => {
      axios.post('http://127.0.0.1:4523/m1/4085118-0-default/show/gpu', {
        pod:selectedPod,
      })
      .then(response => {
        console.log("获取gpu成功", response.data.result);
        optionsGpu.value = response.data.result; 
      })
      .catch(error => {
        console.error('获取数据失败：', error);
      });
    };
    return{
      selectedPod,
      selectedGpu,
      selectedHostname,
      optionsGpu,
      optionsPod,
      optionHostname,
      getPod,
      getHostname,
      getGpu,
    }
  },
  created() {
    this.getPod(); 
    this.getHostname();
  },
  watch: {
    present: {
      immediate: true, 
      handler(newValue, oldValue) {
        console.log('父组件传入的变量已更新：', newValue,oldValue);
        this.selectedGpu='',
        this.selectedHostname='',
        this.selectedPod='',
        this.getPod();
        this.getHostname();
      }
    },
    selectedPod() {
    this.selectedGpu='',
    this.getGpu();
  }
  },
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
