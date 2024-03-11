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
                },
                grid: {
                    left: "10%",
                    right: "15%"
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis'
                    },
                    xAxis: {
                    // type: 'value',
                    name: "batch/epoch"
                    // data: [1, 2, 3, 4, 5]
                },
                yAxis: {
                    // type: 'value',
                    axisLabel: {
                        formatter: '{value}%'
                    }
                },
                series: [
                    {
                        name: 'forward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[0, 85],[1, 20],[2, 32],[3, 1], [5, 90]]
                    },
                    {
                        name: 'backward layer',
                        type: 'line',
                        symbol: 'none',
                        data: [[1, 24],[2, 32], [3, 10],[4, 34],[5, 21]]
                    },
                ]
            }
            chart.setOption(option)
        })
        return {
            echartsContainer
        }
    }
}
</script>