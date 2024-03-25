<template>
    <div ref="echartsContainer" style="height: 500px;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const echartsContainer = ref(null);

onMounted(() => {
    const myChart = echarts.init(echartsContainer.value);

    // 这里假设了一些数据结构，具体情况需要根据实际数据进行调整
    const layers = ['嵌入层', '特征交互层', 'MLP', '输出层']; // 神经网络的层
    const resourceTypes = ['PCIe带宽', 'GPU计算资源', '以太网带宽']; // 资源类型

    // 构建series数据，每种资源类型一个series
    const series = resourceTypes.map(type => ({
        name: type,
        type: 'bar',
        stack: '总量', // 此处假设资源使用可以堆叠
        data: layers.map(() => Math.random() * 100) // 随机数据，实际应从数据源获取
    }));

    const option = {
        title: {
            text: '训练过程资源占用', // 标题
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: resourceTypes
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: layers
        },
        series: series
    };

    myChart.setOption(option);
});
</script>
