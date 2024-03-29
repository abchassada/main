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
            forward: [],
            backward: [],
        }
    },
    props: ["present", "selectHostname"],
    setup(props) {
        const datab = getCurrentInstance();
        const receiveBytes = ref(null)
        const transmitBytes = ref(null)
        onMounted(() => {
            const receiveChart = echarts.init(receiveBytes.value)
            const receiveOption = {
                title: {
                    text: "RECEIVE BYTES",
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
                        formatter: function (value) {
                            // 将小数转换为分数形式显示
                            const [numerator, denominator] = value.toString().split('.');
                            if (denominator) {
                                return `${numerator}/${denominator.length === 1 ? denominator + '0' : denominator}`;
                            } else {
                                return value;
                            }
                        },
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
            receiveChart.setOption(receiveOption)
            const transmitChart = echarts.init(transmitBytes.value)
            const transmitOption = {
                title: {
                    text: "TRANSMIT BYTES",
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
                        formatter: function (value) {
                            // 将小数转换为分数形式显示
                            const [numerator, denominator] = value.toString().split('.');
                            if (denominator) {
                                return `${numerator}/${denominator.length === 1 ? denominator + '0' : denominator}`;
                            } else {
                                return value;
                            }
                        },
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
            transmitChart.setOption(transmitOption)
            watch([datab.data.forward, datab.data.backward], ([forwardData, backwardData]) => {
                console.log("监听成功", forwardData.map(item => [item.batch / item.epoch, item.receive_bytes]));
                receiveChart.setOption({
                    series: [
                        {
                            name: 'forward layer',
                            type: 'line',
                            symbol: 'none',
                            data: forwardData.map(item => [item.batch / item.epoch, item.receive_bytes])
                        },
                        {
                            name: 'backward layer',
                            type: 'line',
                            symbol: 'none',
                            data: backwardData.map(item => [item.batch / item.epoch, item.receive_bytes])
                        }
                    ]
                });
                transmitChart.setOption({
                    series: [
                        {
                            name: 'forward layer',
                            type: 'line',
                            symbol: 'none',
                            data: forwardData.map(item => [item.batch / item.epoch, item.transmit_bytes])
                        },
                        {
                            name: 'backward layer',
                            type: 'line',
                            symbol: 'none',
                            data: backwardData.map(item => [item.batch / item.epoch, item.transmit_bytes])
                        }
                    ]
                });
            }, { deep: true });
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