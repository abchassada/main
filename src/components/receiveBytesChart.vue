<template>
    <div ref="echartsContainer" class="echarts-container" style="width: 600px; height: 400px;"></div>
</template>

<script>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
export default {
    setup() {
        const echartsContainer = ref(null)
        onMounted(() => {
            const chart = echarts.init(echartsContainer.value)
            const option = {
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
                        data: [[0, 85],[1, 20],[2, 32],[3, 1], [5, 90]],
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[1, 24],[2, 32], [3, 10],[4, 34],[5, 21]]
                    },
                ],
                color: ["#0077c8", "#74d2e7"]
            }
            chart.setOption(option)
        })
        return {
            echartsContainer
        }
    }
}
</script>