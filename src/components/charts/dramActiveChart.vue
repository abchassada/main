<template>
    <el-row>
        <el-col :span="12">
            <div ref="gpuUtil" class="echarts-container" style="width: 600px; height: 400px;"></div>
        </el-col>
        <el-col :span="12">
            <div ref="gpuMem" class="echarts-container" style="width: 600px; height: 400px;"></div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div ref="dramActive" class="echarts-container" style="width: 600px; height: 400px;"></div>
        </el-col>
        <el-col :span="12">
            <div ref="fp32Active" class="echarts-container" style="width: 600px; height: 400px;"></div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div ref="smActive" class="echarts-container" style="width: 600px; height: 400px;"></div>
        </el-col>
        <el-col :span="12">
            <div ref="smOccupancyActive" class="echarts-container" style="width: 600px; height: 400px;"></div>
        </el-col>
    </el-row>
</template>
<script>
import { ref, onMounted, getCurrentInstance,watch } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
export default {
    props: ["selectPod","selectGpu"],
    data() {
        return {
            points: [],
            forward: [],
            backward: [],
        }
    },
    setup(props) {
        const datab = getCurrentInstance();
        const dramActive = ref(null)
        const gpuUtil = ref(null)
        const gpuMem = ref(null)
        const fp32Active = ref(null)
        const smActive = ref(null)
        const smOccupancyActive = ref(null)
        onMounted(() => {
            const dramActiveChart = echarts.init(dramActive.value)
            const gpuUtilChart = echarts.init(gpuUtil.value)
            const gpuMemChart = echarts.init(gpuMem.value)
            const fp32ActiveChart = echarts.init(fp32Active.value)
            const smActiveChart = echarts.init(smActive.value)
            const smOccupancyActiveChart = echarts.init(smOccupancyActive.value)
            const dramActiveOption = {
                title: {
                    text: "DRAM ACTIVE",
                    left: "6%",
                    top: "2%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: ['forward layer', 'backward layer'],
                    top: "7%",
                    right: "14%",
                    lineStyle: {
                        color: "#fff"
                    },
                    textStyle: {
                        fontSize: 17
                    },
                    itemStyle: {
                        color: "inherit"
                    }
                },
                grid: {
                    left: "10%",
                    right: "15%",
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    axisLabel: {
                        fontSize: 15
                    }
                },
                yAxis: {
                    // type: 'value',
                    axisLabel: {
                        formatter: '{value}%',
                    },
                },
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[0, 85], [1, 20], [2, 32], [3, 1], [5, 90]],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[1, 24], [2, 32], [3, 10], [4, 34], [5, 21]]
                    },
                ],
                color: ["#0077c8", "#74d2e7"]
            }
            const gpuUtilOption = {
                title: {
                    text: "GPU UTIL",
                    left: "6%",
                    top: "2%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: ['forward layer', 'backward layer'],
                    top: "7%",
                    right: "14%",
                    lineStyle: {
                        color: "#fff"
                    },
                    textStyle: {
                        fontSize: 17
                    },
                    itemStyle: {
                        color: "inherit"
                    }
                },
                grid: {
                    left: "10%",
                    right: "15%",
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    axisLabel: {
                        fontSize: 15
                    }
                },
                yAxis: {
                    // type: 'value',
                    axisLabel: {
                        formatter: '{value}%',
                    },
                },
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[0, 85], [1, 20], [2, 32], [3, 1], [5, 90]],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[1, 24], [2, 32], [3, 10], [4, 34], [5, 21]]
                    },
                ],
                color: ["#0077c8", "#74d2e7"]
            }
            const gpuMemOption = {
                title: {
                    text: "GPU MEM",
                    left: "6%",
                    top: "2%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: ['forward layer', 'backward layer'],
                    top: "7%",
                    right: "14%",
                    lineStyle: {
                        color: "#fff"
                    },
                    textStyle: {
                        fontSize: 17
                    },
                    itemStyle: {
                        color: "inherit"
                    }
                },
                grid: {
                    left: "10%",
                    right: "15%",
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    axisLabel: {
                        fontSize: 15
                    }
                },
                yAxis: {
                    // type: 'value',
                    axisLabel: {
                        formatter: '{value}%',
                    },
                },
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[0, 85], [1, 20], [2, 32], [3, 1], [5, 90]],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[1, 24], [2, 32], [3, 10], [4, 34], [5, 21]]
                    },
                ],
                color: ["#0077c8", "#74d2e7"]
            }
            const fp32ActiveOption = {
                title: {
                    text: "FP32 ACTIVE",
                    left: "6%",
                    top: "2%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: ['forward layer', 'backward layer'],
                    top: "7%",
                    right: "14%",
                    lineStyle: {
                        color: "#fff"
                    },
                    textStyle: {
                        fontSize: 17
                    },
                    itemStyle: {
                        color: "inherit"
                    }
                },
                grid: {
                    left: "10%",
                    right: "15%",
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    axisLabel: {
                        fontSize: 15
                    }
                },
                yAxis: {
                    // type: 'value',
                    axisLabel: {
                        formatter: '{value}%',
                    },
                },
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[0, 85], [1, 20], [2, 32], [3, 1], [5, 90]],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[1, 24], [2, 32], [3, 10], [4, 34], [5, 21]]
                    },
                ],
                color: ["#0077c8", "#74d2e7"]
            }
            const smActiveOption = {
                title: {
                    text: "SM ACTIVE",
                    left: "6%",
                    top: "2%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: ['forward layer', 'backward layer'],
                    top: "7%",
                    right: "14%",
                    lineStyle: {
                        color: "#fff"
                    },
                    textStyle: {
                        fontSize: 17
                    },
                    itemStyle: {
                        color: "inherit"
                    }
                },
                grid: {
                    left: "10%",
                    right: "15%",
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    axisLabel: {
                        fontSize: 15
                    }
                },
                yAxis: {
                    // type: 'value',
                    axisLabel: {
                        formatter: '{value}%',
                    },
                },
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[0, 85], [1, 20], [2, 32], [3, 1], [5, 90]],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[1, 24], [2, 32], [3, 10], [4, 34], [5, 21]]
                    },
                ],
                color: ["#0077c8", "#74d2e7"]
            }
            const smOccupancyActiveOption = {
                title: {
                    text: "SM OCCUPANCY",
                    left: "6%",
                    top: "2%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: ['forward layer', 'backward layer'],
                    top: "7%",
                    right: "14%",
                    lineStyle: {
                        color: "#fff"
                    },
                    textStyle: {
                        fontSize: 17
                    },
                    itemStyle: {
                        color: "inherit"
                    }
                },
                grid: {
                    left: "10%",
                    right: "15%",
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    axisLabel: {
                        fontSize: 15
                    }
                },
                yAxis: {
                    // type: 'value',
                    axisLabel: {
                        formatter: '{value}%',
                    },
                },
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[0, 85], [1, 20], [2, 32], [3, 1], [5, 90]],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[1, 24], [2, 32], [3, 10], [4, 34], [5, 21]]
                    },
                ],
                color: ["#0077c8", "#74d2e7"]
            }
            dramActiveChart.setOption(dramActiveOption)
            gpuUtilChart.setOption(gpuUtilOption)
            gpuMemChart.setOption(gpuMemOption)
            fp32ActiveChart.setOption(fp32ActiveOption)
            smActiveChart.setOption(smActiveOption)
            smOccupancyActiveChart.setOption(smOccupancyActiveOption)
        });
        const getPoints = () => {
            axios.post('/show/gpuinfo', {
                pod: props.selectPod,
                gpu: props.selectGpu,
            })
                .then(response => {
                    console.log("获取gpuinfo成功", response.data.result);
                    datab.data.points = response.data.result;
                    handlePoints();
                })
                .catch(error => {
                    console.log(error);
                    console.error('获取gpuinfo失败');
                });
        };
        /*handle primitive data*/
        const handlePoints = () => {
            let length = datab.data.points.length;
            length = length <= datab.data.forward ? length : datab.data.forward;
            datab.data.forward.sort((a, b) => {
                const resultA = a.batch / a.epoch;
                const resultB = b.batch / b.epoch;
                return resultA - resultB;
            });
            datab.data.forward.splice(0, length);
            datab.data.backward.sort((a, b) => {
                const resultA = a.batch / a.epoch;
                const resultB = b.batch / b.epoch;
                return resultA - resultB;
            });
            datab.data.backward.splice(0, length);
            for (let ob of datab.data.points) {
                if (ob.forward === true) {
                    datab.data.forward.push(ob);
                } else {
                    datab.data.backward.push(ob);
                }
            }
        };
        /**update echarts */
        watch([datab.data.forward, datab.data.backward], ([forwardData, backwardData]) => {
            console.log("6echarts成功", forwardData.map(item => [item.batch / item.epoch, item.receive_bytes]));
            gpuUtilChart.setOption({
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: forwardData.map(item => [item.batch / item.epoch, item.gpu_util])
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: backwardData.map(item => [item.batch / item.epoch, item.gpu_util])
                    }
                ]
            });
            gpuMemChart.setOption({
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: forwardData.map(item => [item.batch / item.epoch, item.gpu_mem])
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: backwardData.map(item => [item.batch / item.epoch, item.gpu_mem])
                    }
                ]
            });
            dramActiveChart.setOption({
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: forwardData.map(item => [item.batch / item.epoch, item.dram_active])
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: backwardData.map(item => [item.batch / item.epoch, item.dram_active])
                    }
                ]
            });
            fp32ActiveChart.setOption({
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: forwardData.map(item => [item.batch / item.epoch, item.fp32_active])
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: backwardData.map(item => [item.batch / item.epoch, item.fp32_active])
                    }
                ]
            });
            smActiveChart.setOption({
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: forwardData.map(item => [item.batch / item.epoch, item.sm_active])
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: backwardData.map(item => [item.batch / item.epoch, item.sm_active])
                    }
                ]
            });
            smOccupancyActiveChart.setOption({
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: forwardData.map(item => [item.batch / item.epoch, item.sm_occupancy])
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: backwardData.map(item => [item.batch / item.epoch, item.sm_occupancy])
                    }
                ]
            });
        }, { deep: true });
        watch([() => props.selectGpu, () => props.selectPod], ([newPresent, newHostname], [oldPresent, oldHostname]) => {
            getPoints();
            //console.log('prop 变化了', newPresent, newHostname);
        }, { immediate: true });
        return {
            dramActive,
            gpuUtil,
            gpuMem,
            fp32Active,
            smActive,
            smOccupancyActive,
            getPoints,
        };
    },
    
}
</script>