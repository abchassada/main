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
import { ref, onMounted, watch } from 'vue';
import { getCurrentInstance } from "vue";
import axios from 'axios';
import * as echarts from 'echarts';
export default {
    data() {
        return {
            points: [],
            handlePoints:[],
        }
    },
    props: ["present", "selectHostname"],
    setup(props) {
        const datab = getCurrentInstance();
        const receiveBytes = ref(null)
        const transmitBytes = ref(null)
        const receiveChart=ref(null)
        const transmitChart=ref(null)
        onMounted(() => {
            receiveChart.value = echarts.init(receiveBytes.value)
            const receiveOption = {
                title: {
                    text: "RECEIVE BYTES",
                    left: "6%",
                    top: "0%",
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
                    data:[],
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
            receiveChart.value.setOption(receiveOption)
            transmitChart.value = echarts.init(transmitBytes.value)
            const transmitOption = {
                title: {
                    text: "TRANSMIT BYTES",
                    left: "6%",
                    top: "0%",
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
                    data:[],
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
            };
            transmitChart.value.setOption(transmitOption);
        });
        const getPoints = () => {
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
                        data: obj.data.map(item => item.receive_bytes)
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
                        data: obj.data.map(item => item.transmit_bytes)
                    };
                }),
            });
        };
        watch([() => props.present, () => props.selectHostname], ([newPresent, newHostname], [oldPresent, oldHostname]) => {
            getPoints();
            //console.log('prop 变化了', newPresent, newHostname);
        }, { immediate: true });
        return {
            receiveBytes,
            transmitBytes,
            getPoints,
        }
    },
}
</script>