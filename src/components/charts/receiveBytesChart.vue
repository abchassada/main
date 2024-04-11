<template>
    <el-row>
        <el-col :span="12">
            <div ref="receiveBytes" class="echarts-container" style="width: 600px; height: 400px;"></div>
        </el-col>
        <el-col :span="12">
            <div ref="transmitBytes" class="echarts-container" style="width: 600px; height: 400px;"></div>
        </el-col>
    </el-row>
</template>

<script>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { getCurrentInstance } from "vue";
import axios from 'axios';
import * as echarts from 'echarts';
export default {
    data() {
        return {
            points: [],
            handlePoints: [],
        }
    },
    props: ["present", "selectHostname"],
    setup(props) {
        const datab = getCurrentInstance();
        const receiveBytes = ref(null)
        const transmitBytes = ref(null)
        const receiveChart = ref(null)
        const transmitChart = ref(null)
        const receiveOption = ref(null)
        const transmitOption = ref(null)
        const intervalId = ref(null);
        onUnmounted(() => {
            clearInterval(intervalId.value);
        });
        onMounted(() => {
            intervalId.value = setInterval(getPoints, 5000);
            receiveChart.value = echarts.init(receiveBytes.value)
            receiveOption.value = {
                title: {
                    text: "RECEIVE BYTES",
                    subtext: "接收的字节数",
                    left: "6%",
                    top: "0%",
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
                    left: "15%",
                    right: "15%",
                    top: '100px',
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
                        formatter: '{value}MB',
                        rotate: 45,
                    },
                    // min: 763600000,
                    // max: 768100000,
                },
                dataZoom: [
                    {
                        type: 'slider',
                        yAxisIndex: 0,
                    }
                ],
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
                        data: []
                    },
                ],
            }
            receiveChart.value.setOption(receiveOption.value)
            transmitChart.value = echarts.init(transmitBytes.value)
            transmitOption.value = {
                title: {
                    text: "TRANSMIT BYTES",
                    subtext: "传输的字节数",
                    left: "6%",
                    top: "0%",
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
                    left: "15%",
                    right: "15%",
                    top: '100px',
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
                        formatter: '{value}MB',
                        rotate: 45,
                    },
                    // min: 1430000000,
                    // max: 1448000000,
                },
                dataZoom: [
                    {
                        type: 'slider',
                        yAxisIndex: 0,
                    }
                ],
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
                        data: []
                    },
                ],
            };
            transmitChart.value.setOption(transmitOption.value);
        });
        const getPoints = () => {
            if (props.present != '' && props.selectHostname != '') {
                axios.post('/show/networkinfo', {
                    jobid: props.present,
                    hostname: props.selectHostname,
                })
                    .then(response => {
                        console.log("获取带宽信息成功", response.data.result);
                        datab.data.points = response.data.result;
                        handlePoints();
                    })
                    .catch(error => {
                        console.log(error);
                        console.error('获取带宽信息失败');
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
            //console.log('allBatchEpoch'+allBatchEpoch);
            const batchEpochStrings = [...new Set(allBatchEpoch.map(({ batch, epoch }) => `${batch}/${epoch}`))];
            //console.log("横坐标数组" + batchEpochStrings);
            const lineDataArrays = [];
            datab.data.handlePoints.forEach(line => {
                const lineDataArray = [];
                batchEpochStrings.forEach(batchEpoch => {
                    const point = line.data.find(point => `${point.batch}/${point.epoch}` === batchEpoch);
                    if (point) {
                        lineDataArray.push({
                            transmit_bytes: point.transmit_bytes,
                            receive_bytes: point.receive_bytes
                        });
                    } else {
                        lineDataArray.push({
                            transmit_bytes: null,
                            receive_bytes: null,
                        });
                    }
                });
                lineDataArrays.push(lineDataArray);
                //console.log("纵坐标" + lineDataArrays[0].map(obj => obj.transmit_bytes))

            });
            receiveChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
                    top: "8%",
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
                    formatter: function (params) {
                        return (
                            params.marker +
                            params.name +
                            ": " +
                            params.value[3] +
                            " " +
                            params.value[4]
                        );
                    },
                },
                xAxis: {
                    name: "batch/\nepoch",
                    boundaryGap: false,
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: batchEpochStrings,
                },
                series: datab.data.handlePoints.map((obj, index) => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'none',
                        connectNulls: true,
                        itemStyle: { normal: { label: { show: true } } },
                        data: lineDataArrays[index].map(obj => obj.receive_bytes),
                    };
                }),
            });
            transmitChart.value.setOption({
                legend: {
                    data: datab.data.handlePoints.map(obj => obj.layer),
                    top: "8%",
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
                    boundaryGap: false,
                    nameTextStyle: {
                        fontSize: 15
                    },
                    data: batchEpochStrings,
                },
                series: datab.data.handlePoints.map((obj, index) => {
                    return {
                        name: obj.layer,
                        type: 'line',
                        symbol: 'none',
                        connectNulls: true,
                        data: lineDataArrays[index].map(obj => obj.transmit_bytes),
                    };
                }),
            });
        };
        watch([() => props.present, () => props.selectHostname], ([newPresent, newHostname], [oldPresent, oldHostname]) => {
            if (props.present != '' && props.selectHostname != '') {
                getPoints();
            } else if (props.selectHostname===''&&receiveChart.value && transmitChart.value) {
                transmitChart.value.clear();
                receiveChart.value.clear();
                receiveChart.value.setOption(receiveOption.value);
                transmitChart.value.setOption(transmitOption.value);
            }
        }, { immediate: true });
        return {
            receiveBytes,
            transmitBytes,
            getPoints,
        }
    },
}
</script>