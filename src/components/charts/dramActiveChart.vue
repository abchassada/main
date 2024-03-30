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
        const dramActiveChart=ref(null)
        const gpuUtilChart = ref(null)
        const gpuMemChart =ref(null)
        const fp32ActiveChart = ref(null)
        const smActiveChart = ref(null)
        const smOccupancyActiveChart = ref(null)
        onMounted(() => {
            dramActiveChart.value = echarts.init(dramActive.value)
            gpuUtilChart.value = echarts.init(gpuUtil.value)
            gpuMemChart.value = echarts.init(gpuMem.value)
            fp32ActiveChart.value = echarts.init(fp32Active.value)
            smActiveChart.value = echarts.init(smActive.value)
            smOccupancyActiveChart.value = echarts.init(smOccupancyActive.value)
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
                    data: [],
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
                        data: [],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [],
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
                    data: [],
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
                        data: [],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [],
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
                    data: [],
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
                        data: [],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [],
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
                    data: [],
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
                        data: [],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [],
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
                    data: [],
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
                        data: [],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [],
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
                    data: [],
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
                        data:[],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data:[],
                    },
                ],
                color: ["#0077c8", "#74d2e7"]
            }
            dramActiveChart.value.setOption(dramActiveOption)
            gpuUtilChart.value.setOption(gpuUtilOption)
            gpuMemChart.value.setOption(gpuMemOption)
            fp32ActiveChart.value.setOption(fp32ActiveOption)
            smActiveChart.value.setOption(smActiveOption)
            smOccupancyActiveChart.value.setOption(smOccupancyActiveOption)
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
            length = length <= datab.data.forward.length ? length : datab.data.forward.length;
            datab.data.forward.sort((a, b) => {
                if (a.epoch !== b.epoch) {
                    return a.epoch - b.epoch;
                } else {
                    return a.batch - b.batch;
                }
            });
            datab.data.forward.splice(0, length);
            datab.data.backward.sort((a, b) => {
                if (a.epoch !== b.epoch) {
                    return a.epoch - b.epoch;
                } else {
                    return a.batch - b.batch;
                }
            });
            datab.data.backward.splice(0, length);
            for (let ob of datab.data.points) {
                if (ob.forward === true) {
                    datab.data.forward.push(ob);
                } else {
                    datab.data.backward.push(ob);
                }
            }
            datab.data.forward.sort((a, b) => {
                if (a.epoch !== b.epoch) {
                    return a.epoch - b.epoch;
                } else {
                    return a.batch - b.batch;
                }
            });
            datab.data.backward.sort((a, b) => {
                if (a.epoch !== b.epoch) {
                    return a.epoch - b.epoch;
                } else {
                    return a.batch - b.batch;
                }
            });
            console.log('handle gpuinfo points success!',datab.data.forward);
            gpuUtilChart.value.setOption({
                legend: {
                    data: [
                        'forward ' + datab.data.forward[0].layer,
                        'backward ' + datab.data.backward[0].layer,
                    ],
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
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: datab.data.forward.map(item => `${item.batch}/${item.epoch}`),
                },
                series: [
                    {
                        name: 'forward '+datab.data.forward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.forward.map(item => item.gpu_util),
                    },
                    {
                        name: 'backward ' + datab.data.backward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.backward.map(item => item.gpu_util),
                    }
                ]
            });
            gpuMemChart.value.setOption({
                legend: {
                    data: [
                        'forward ' + datab.data.forward[0].layer,
                        'backward ' + datab.data.backward[0].layer,
                    ],
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
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: datab.data.forward.map(item => `${item.batch}/${item.epoch}`),
                },
                series: [
                    {
                        name: 'forward ' + datab.data.forward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.forward.map(item => item.gpu_mem),
                    },
                    {
                        name: 'backward ' + datab.data.backward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.backward.map(item => item.gpu_mem),
                    }
                ]
            });
            dramActiveChart.value.setOption({
                legend: {
                    data: [
                        'forward ' + datab.data.forward[0].layer,
                        'backward ' + datab.data.backward[0].layer,
                    ],
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
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: datab.data.forward.map(item => `${item.batch}/${item.epoch}`),
                },
                series: [
                    {
                        name: 'forward ' + datab.data.forward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.forward.map(item => item.dram_active),
                    },
                    {
                        name: 'backward ' + datab.data.backward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.backward.map(item => item.dram_active),
                    }
                ]
            });
            fp32ActiveChart.value.setOption({
                legend: {
                    data: [
                        'forward ' + datab.data.forward[0].layer,
                        'backward ' + datab.data.backward[0].layer,
                    ],
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
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: datab.data.forward.map(item => `${item.batch}/${item.epoch}`),
                },
                series: [
                    {
                        name: 'forward ' + datab.data.forward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.forward.map(item => item.fp32_active),
                    },
                    {
                        name: 'backward ' + datab.data.backward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.backward.map(item => item.fp32_active),
                    }
                ]
            });
            smActiveChart.value.setOption({
                legend: {
                    data: [
                        'forward ' + datab.data.forward[0].layer,
                        'backward ' + datab.data.backward[0].layer,
                    ],
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
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: datab.data.forward.map(item => `${item.batch}/${item.epoch}`),
                },
                series: [
                    {
                        name: 'forward ' + datab.data.forward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.forward.map(item => item.sm_active),
                    },
                    {
                        name: 'backward ' + datab.data.backward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.backward.map(item => item.sm_active),
                    }
                ]
            });
            smOccupancyActiveChart.value.setOption({
                legend: {
                    data: [
                        'forward ' + datab.data.forward[0].layer,
                        'backward ' + datab.data.backward[0].layer,
                    ],
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
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: datab.data.forward.map(item => `${item.batch}/${item.epoch}`),
                },
                series: [
                    {
                        name: 'forward ' + datab.data.forward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.forward.map(item => item.sm_occupancy),
                    },
                    {
                        name: 'backward ' + datab.data.backward[0].layer,
                        type: 'line',
                        symbol: 'none',
                        data: datab.data.backward.map(item => item.sm_occupancy),
                    }
                ]
            });
        };
        watch([() => props.selectGpu, () => props.selectPod], ([newPresent, newHostname], [oldPresent, oldHostname]) => {
            if(props.selectGpu!=''&&props.selectPod!=''){
                getPoints();
            }
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