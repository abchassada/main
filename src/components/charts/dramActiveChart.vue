<template>
    <el-row>
        <el-col :span="12">
            <div ref="gpuUtil" class="echarts-container" style="width: 600px; height: 400px;">
            </div>
        </el-col>
        <el-col :span="12">
            <div ref="gpuMem" class="echarts-container" style="width:600px; height: 400px;">
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div ref="dramActive" class="echarts-container" style="width: 600px; height: 400px;">
            </div>
        </el-col>
        <el-col :span="12">
            <div ref="fp32Active" class="echarts-container" style="width:600px; height: 400px;">
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div ref="smActive" class="echarts-container" style="width: 600px; height: 400px;">
            </div>
        </el-col>
        <el-col :span="12">
            <div ref="smOccupancyActive" class="echarts-container" style="width: 600px; height: 400px;">
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { ref, onMounted, getCurrentInstance, watch } from 'vue';
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
                    data: [],
                    top: "7%",
                    right: "14%",
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
                    top: '70px',
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
                    data: [],
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
                    top: '70px',
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
                    data: [],
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
                    top: '70px',
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
                    data: [],
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
                    top: '70px',
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
                    data: [],
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
                    top: '70px',
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
                    data: [],
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
                    top: '70px',
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
            datab.data.handlePoints.sort((a, b) => {
                if (a.epoch !== b.epoch) {
                    return a.epoch - b.epoch;
                } else if (a.batch != b.batch) {
                    return a.batch - b.batch;
                } else {
                    if (a.forward && !b.forward) {
                        return -1;
                    } else if (!a.forward && b.forward) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
            console.log('handle gpuinfo points success!', datab.data.forward);
            gpuUtilChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
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
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    backgroundColor: '#fff', // 悬浮框背景色
                    borderColor: '#000', // 悬浮框边框颜色
                    borderWidth: 1, // 悬浮框边框宽度
                    textStyle: { // 悬浮框文字样式
                        color: '#000',
                        fontSize: 12
                    },
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
                // formatter: function (params) {
                //     var seriesName = params[0].seriesName;
                //     var dataIndex = params[0].dataIndex;
                //     var targetData = datab.data.handlePoints.find(obj => obj.layer === seriesName).data[dataIndex];
                //     var timestamp = targetData.start_timestamp;
                //     var date = new Date(timestamp * 1000);
                //     var formattedTime = date.toISOString();
                //     return '时间: ' + formattedTime;
                // },
                xAxis: {
                    name: "batch/\nepoch",
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: (datab.data.handlePoints.flatMap(({ data }) => data.map(({ batch, epoch }) => `${batch}/${epoch}`))),
                },
                series: datab.data.handlePoints.map(obj => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'none',
                        data: obj.data.map(item => item.gpu_util),
                        //data: obj.data.map(({ batch, epoch, gpu_util }) => [`${batch}/${epoch}`, gpu_util]),
                    };
                }),
            });
            gpuMemChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
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
                    data: (datab.data.handlePoints.flatMap(({ data }) => data.map(({ batch, epoch }) => `${batch}/${epoch}`))),
                },
                series: datab.data.handlePoints.map(obj => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'none',
                        data: obj.data.map(item => item.gpu_mem)
                    };
                }),
            });
            dramActiveChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
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
                    data: (datab.data.handlePoints.flatMap(({ data }) => data.map(({ batch, epoch }) => `${batch}/${epoch}`))),
                },
                series: datab.data.handlePoints.map(obj => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'none',
                        data: obj.data.map(item => item.dram_active)
                    };
                }),
            });
            fp32ActiveChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
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
                    data: (datab.data.handlePoints.flatMap(({ data }) => data.map(({ batch, epoch }) => `${batch}/${epoch}`))),
                },
                series: datab.data.handlePoints.map(obj => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'none',
                        data: obj.data.map(item => item.fp32_active),
                        //data:obj.data.map(({ batch, epoch, fp32_active }) => [`${batch}/${epoch}`, fp32_active]),
                        // TODO:tooltips,能显示坐标了，
                    };
                }),
            });
            smActiveChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
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
                    data: (datab.data.handlePoints.flatMap(({ data }) => data.map(({ batch, epoch }) => `${batch}/${epoch}`))),
                },
                series: datab.data.handlePoints.map(obj => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'none',
                        data: obj.data.map(item => item.sm_active)
                    };
                }),
            });
            smOccupancyActiveChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
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
                    data: (datab.data.handlePoints.flatMap(({ data }) => data.map(({ batch, epoch }) => `${batch}/${epoch}`))),
                },
                series: datab.data.handlePoints.map(obj => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'none',
                        data: obj.data.map(item => item.sm_occupancy)
                    };
                }),
            });
        };
        watch([() => props.selectGpu, () => props.selectPod], ([newPresent, newHostname], [oldPresent, oldHostname]) => {
            if (props.selectGpu != '' && props.selectPod != '') {
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