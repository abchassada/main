<template>
  <el-scrollbar ref="scrollbarRef" class="projectMenu" always="boolean" @scroll="scroll" h-bar="false">
    <div class="mainContainer" style="max-height: 95vh; overflow-y: auto;">
      <el-row>
        <el-col>
          <div>
            <projectTable :presentJobId="presentJob" />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="podSelection">
            <el-text tag="b" class="title">pod:</el-text>
            <el-select v-model="selectedPod" placeholder="Select" size="large">
              <el-option v-for="item in optionsPod" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="gpuSelection">
            <el-text tag="b" class="title">GPU:</el-text>
            <el-select v-model="selectedGpu" placeholder="Select" size="large">
              <el-option v-for="item in optionsGpu" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
        </el-col>
      </el-row>
      <dramActiveChart :selectPod="selectedPod" :selectGpu="selectedGpu" />
      <el-row>
        <el-col :span="8">
          <!-- <div class="hostnameSelection">
            <el-text tag="b" class="title">hostname:</el-text>
            <el-select v-model="selectedHostname" placeholder="Select" size="large">
              <el-option v-for="item in optionHostname" :key="item" :label="item" :value="item" />
            </el-select>
          </div> -->
        </el-col>
        <!-- </el-row>
      <receiveBytesChart :present="present" :selectHostname="selectedHostname" />
      <el-row> -->
        <el-col :span="24">
          <podChart :present="present" />
        </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<script>
import dramActiveChart from './charts/dramActiveChart.vue'
import receiveBytesChart from './charts/receiveBytesChart.vue'
import podChart from './charts/podChart.vue'
import projectTable from './projectTable.vue'
import { ref } from 'vue'
import axios from 'axios'
export default {
  props: ["present"],
  data() {
    return {
      presentJob: this.present,
    }
  },
  components: {
    dramActiveChart,
    receiveBytesChart,
    projectTable,
    podChart,
  },
  setup(props) {
    const selectedPod = ref('')
    const selectedGpu = ref('')
    const selectedHostname = ref('')
    const optionsGpu = ref([])
    const optionsPod = ref(['option1', 'option2', 'option3', 'option4'])
    const optionHostname = ref(['option1', 'option2', 'option3', 'option4'])
    const getPod = () => {
      axios.post('/show/pods', {
        jobid: props.present,
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
      axios.post('/show/hosts', {
        jobid: props.present,
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
      axios.post('/show/gpu', {
        pod: selectedPod,
      })
        .then(response => {
          console.log("获取gpu成功", response.data.result);
          optionsGpu.value = response.data.result;
        })
        .catch(error => {
          console.error('获取数据失败：', error);
        });
    };
    return {
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
        console.log('项目更新：', newValue, oldValue);
        this.selectedGpu = '',
          this.selectedHostname = '',
          this.selectedPod = '',
          this.getPod();
        this.getHostname();
        this.presentJob = newValue;
      }

    },
    selectedPod() {
      this.selectedGpu = '',
        this.getGpu();
    },
  },
}
</script>

<style>
.el-scrollbar {
  overflow-y: hidden;
  overflow-x: hidden;
}

.mainContainer {
  width: 100%;
}

.podSelection {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
}

.gpuSelection {
  display: flex;
  margin-top: 20px;
  align-items: center;
}

.hostnameSelection {
  display: flex;
  margin-top: 5px;
  margin-bottom: 20px;
  align-items: center;
}

.el-select {
  border-radius: 5px;
}

.title {
  margin-right: 10px;
}
</style>
