<template>
    <el-row :gutter="10">
        <el-col :span="12">
            <v-card hover style="background-color: #e5edf5;border-radius: 25px;">
                <div ref="gpuUtil" class="echarts-container" style="width: 600px; height: 400px;">
                </div>
            </v-card>
        </el-col>
        <el-col :span="12">
            <v-card hover style="background-color: #e4f5ff;border-radius: 25px;">
                <div ref="gpuMem" class="echarts-container1" style="width:600px; height: 400px;">
                </div>
            </v-card>
        </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 30px;">
        <el-col :span="12">
            <v-card hover style="background-color: #e4f5ff;border-radius: 25px;">
                <div ref="dramActive" class="echarts-container" style="width: 600px; height: 400px;">
                </div>
            </v-card>
        </el-col>
        <el-col :span="12">
            <v-card hover style="background-color: #e5edf5;border-radius: 25px;">
                <div ref="fp32Active" class="echarts-container" style="width:600px; height: 400px;">
                </div>
            </v-card>
        </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 30px;">
        <el-col :span="12">
            <v-card hover style="background-color: #e5edf5;border-radius: 25px;">
                <div ref="smActive" class="echarts-container" style="width: 600px; height: 400px;">
                </div>
            </v-card>
        </el-col>
        <el-col :span="12">
            <v-card hover style="background-color: #e4f5ff;border-radius: 25px;">
                <div ref="smOccupancyActive" class="echarts-container" style="width: 600px; height: 400px;">
                </div>
            </v-card>
        </el-col>
    </el-row>
</template>
<script>
import { ref, onMounted, getCurrentInstance, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
export default {
    props: ["selectPod", "selectGpu"],
    data() {
        return {
            points: [],
            handlePoints: [],
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
        const dramActiveChart = ref(null)
        const gpuUtilChart = ref(null)
        const gpuMemChart = ref(null)
        const fp32ActiveChart = ref(null)
        const smActiveChart = ref(null)
        const smOccupancyActiveChart = ref(null)
        const dramActiveOption = ref(null)
        const smOccupancyActiveOption = ref(null)
        const gpuUtilOption = ref(null)
        const gpuMemOption = ref(null)
        const fp32ActiveOption = ref(null)
        const smActiveOption = ref(null)
        onMounted(() => {
            dramActiveChart.value = echarts.init(dramActive.value)
            gpuUtilChart.value = echarts.init(gpuUtil.value)
            gpuMemChart.value = echarts.init(gpuMem.value)
            fp32ActiveChart.value = echarts.init(fp32Active.value)
            smActiveChart.value = echarts.init(smActive.value)
            smOccupancyActiveChart.value = echarts.init(smOccupancyActive.value)
            dramActiveOption.value = {
                title: {
                    text: "DRAM ACTIVE",
                    subtext: " 显存带宽指令活跃度",
                    left: "6%",
                    top: "0%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: [],
                    top: "7%",
                    right: "10%",
                    bottom: "15%",
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
                    top: '100px',
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
            }
            gpuUtilOption.value = {
                title: {
                    text: "GPU UTIL",
                    subtext: ' GPU 利用率百分比',
                    left: "6%",
                    top: "0%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: [],
                    top: "7%",
                    right: "10%",
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
                    top: '100px',
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
            }
            gpuMemOption.value = {
                title: {
                    text: "GPU MEM",
                    subtext: ' GPU 显存占用',
                    left: "6%",
                    top: "0%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: [],
                    top: "7%",
                    right: "10%",
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
                    top: '100px',
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
                        formatter: '{value}GB',
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
            }
            fp32ActiveOption.value = {
                title: {
                    text: "FP32 ACTIVE",
                    subtext: ' 浮点运算指令活跃度',
                    left: "6%",
                    top: "0%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: [],
                    top: "7%",
                    right: "10%",
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
                    top: '100px',
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
            }
            smActiveOption.value = {
                title: {
                    text: "SM ACTIVE",
                    subtext: ' SM 核活跃时间占比',
                    left: "6%",
                    top: "0%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: [],
                    top: "7%",
                    right: "10%",
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
                    top: '100px',
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
            }
            smOccupancyActiveOption.value = {
                title: {
                    text: "SM OCCUPANCY",
                    subtext: " SM 核驻留线程比例",
                    left: "6%",
                    top: "0%",
                    textStyle: {
                        fontSize: 22
                    }
                },
                legend: {
                    data: [],
                    top: "7%",
                    right: "10%",
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
                    top: '100px',
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
            }
            dramActiveChart.value.setOption(dramActiveOption.value)
            gpuUtilChart.value.setOption(gpuUtilOption.value)
            gpuMemChart.value.setOption(gpuMemOption.value)
            fp32ActiveChart.value.setOption(fp32ActiveOption.value)
            smActiveChart.value.setOption(smActiveOption.value)
            smOccupancyActiveChart.value.setOption(smOccupancyActiveOption.value)
        });
        const getPoints = () => {
            if (props.selectGpu != '' && props.selectPod != '') {
                var FormData = require('form-data');
                var data = new FormData();
                data.append('pod', '' + props.selectPod);
                data.append('gpu', '' + props.selectGpu);
                axios.post('/show/gpuinfo', data)
                    .then(response => {
                        console.log("获取gpuinfo成功", response.data.result);
                        datab.data.points = response.data.result;
                        handlePoints();
                    })
                    .catch(error => {
                        console.log(error);
                        console.error('获取gpuinfo失败');
                    });
            }
        };
        /*handle primitive data*/
        const handlePoints = () => {
            datab.data.handlePoints = [];
            for (var ob of datab.data.points) {
                var existingObject = datab.data.handlePoints.find(item => item.layer === ob.layer);
                if (existingObject) {
                    existingObject.data.push(ob);
                } else {
                    var newObj = {
                        layer: ob.layer,
                        data: [ob],
                    };
                    datab.data.handlePoints.push(newObj);
                }
            }
            //console.log(handlePoints);
            const allBatchEpoch = [];
            datab.data.handlePoints.forEach(({ data }) => {
                data.forEach(({ batch, epoch, forward }) => {
                    allBatchEpoch.push({ batch, epoch, forward });
                });
            });
            allBatchEpoch.sort((a, b) => {
                if (a.batch !== b.batch) {
                    return a.batch - b.batch;
                } else if (a.epoch !== b.epoch) {
                    return a.epoch - b.epoch;
                }
                return a.forward ? -1 : 1;
            });
            const batchEpochStrings = [...new Set(allBatchEpoch.map(({ batch, epoch }) => `${batch}/${epoch}`))];
            //console.log("六张图横坐标" + batchEpochStrings);
            const lineDataArrays = [];
            datab.data.handlePoints.forEach(line => {
                const lineDataArray = [];
                batchEpochStrings.forEach(batchEpoch => {
                    const point = line.data.find(point => `${point.batch}/${point.epoch}` === batchEpoch);
                    if (point) {
                        lineDataArray.push({
                            gpu_util: point.gpu_util,
                            gpu_mem: point.gpu_mem,
                            dram_active: point.dram_active,
                            fp32_active: point.fp32_active,
                            sm_active: point.sm_active,
                            sm_occupancy: point.sm_occupancy,
                        });
                    } else {
                        lineDataArray.push({
                            gpu_util: null,
                            gpu_mem: null,
                            dram_active: null,
                            fp32_active: null,
                            sm_active: null,
                            sm_occupancy: null,
                        });
                    }
                    //console.log(lineDataArray)
                });
                lineDataArrays.push(lineDataArray);
            });
            console.log('handle gpuinfo points success!', datab.data.handlePoints.map(obj => obj.layer),);
            var top = "7%";
            var topGrid = '100px';
            if ((datab.data.handlePoints.map(obj => obj.layer)).length > 15) {
                top = "11%";
                topGrid = '210px';
            }else if ((datab.data.handlePoints.map(obj => obj.layer)).length > 12) {
                top = "11%";
                topGrid = '150px';
            }
            if(props.selectPod==='dlrm-pwy-1'){
                top = "11%";
                topGrid = '100px';
            }
            gpuUtilChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
                    top: top,
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
                    top: topGrid,
                },
                tooltip: {
                    formatter: function (params) {
                        let seriesName = params[0].seriesName;
                        let xAxisValue = params[0].axisValue;
                        let yAxisValue = params[0].value;
                        let dataIndex = params[0].dataIndex;
                        let targetData = datab.data.handlePoints.find(obj => obj.layer === seriesName).data[dataIndex];
                        let timestamp = targetData.start_timestamp;
                        let date = new Date(timestamp * 1000);
                        let formattedTime = date.toISOString(); // 使用 ISO 格式显示时间
                        return (
                            '线条名称: ' + seriesName + '<br/>' +
                            '横轴值: ' + xAxisValue + '<br/>' +
                            '纵轴值: ' + yAxisValue + '<br/>' +
                            '时间: ' + formattedTime
                        );
                    }
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: batchEpochStrings,
                },
                series: datab.data.handlePoints.map((obj, index) => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'circle',
                        connectNulls: true,
                        data: lineDataArrays[index].map(obj => obj.gpu_util),
                    };
                }),
            });
            gpuMemChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
                    top: top,
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
                    top: topGrid,
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: batchEpochStrings,
                },
                series: datab.data.handlePoints.map((obj, index) => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'circle',
                        connectNulls: true,
                        data: lineDataArrays[index].map(obj => obj.gpu_mem),
                    };
                }),
            });
            dramActiveChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
                    top: top,
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
                    top: topGrid,
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: batchEpochStrings,
                },
                series: datab.data.handlePoints.map((obj, index) => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'circle',
                        connectNulls: true,
                        data: lineDataArrays[index].map(obj => obj.dram_active),
                    };
                }),
            });
            fp32ActiveChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
                    top: top,
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
                    top: topGrid,
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: batchEpochStrings,
                },
                series: datab.data.handlePoints.map((obj, index) => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'circle',
                        data: lineDataArrays[index].map(obj => obj.fp32_active),
                    };
                }),
            });
            smActiveChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
                    top: top,
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
                    top: topGrid,
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: batchEpochStrings,
                },
                series: datab.data.handlePoints.map((obj, index) => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'circle',
                        connectNulls: true,
                        data: lineDataArrays[index].map(obj => obj.sm_active),
                    };
                }),
            });
            smOccupancyActiveChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
                    top: top,
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
                    top: topGrid,
                },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: batchEpochStrings,
                },
                series: datab.data.handlePoints.map((obj, index) => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'circle',
                        connectNulls: true,
                        data: lineDataArrays[index].map(obj => obj.sm_occupancy),
                    };
                }),
            });
        };
        watch([() => props.selectGpu, () => props.selectPod], ([newPresent, newHostname], [oldPresent, oldHostname]) => {
            if (props.selectGpu != '' && props.selectPod != '') {
                getPoints();
            } else if (props.selectGpu === '' && gpuMemChart.value && gpuUtilChart.value && dramActiveChart.value && fp32ActiveChart.value && smActiveChart.value && smOccupancyActiveChart.value) {
                gpuMemChart.value.setOption(gpuMemOption.value);
                gpuUtilChart.value.setOption(gpuUtilOption.value);
                dramActiveChart.value.setOption(dramActiveOption.value);
                fp32ActiveChart.value.setOption(fp32ActiveOption.value);
                smActiveChart.value.setOption(smActiveOption.value);
                smOccupancyActiveChart.value.setOption(smOccupancyActiveOption.value);
                //console.log('yes');
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
<style>
.echarts-container {
    margin-left: -20px;
    margin-top: 20px;
}
.echarts-container1 {
    margin-left: -16px;
    margin-top: 20px;
}
</style>