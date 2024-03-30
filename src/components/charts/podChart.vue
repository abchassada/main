<template>
   <div ref="echartsContainer" style="height: 500px;"></div></template>
<script>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
import axios from 'axios';
export default {
    setup(props) {
    const echartsContainer = ref(null);
    const datas = ref([]);
    var result_length; //result数组长度
    const layers = ref([]);

    const getDatas = async () => {
        try {
            const response = await axios.post('/show/results', {
                jobid: props.present,
            });
            console.log("获取数据成功", response.data.result);
            datas.value = response.data.result; 
            result_length = response.data.result.length;
            layers.value = datas.value.map(item => item.layer);
        } catch (error) {
            console.error('获取数据失败：', error);
        }
    };

    onMounted(async () => {
        await getDatas(); // 等待数据获取完成
        const myChart = echarts.init(echartsContainer.value);
        var option;
        var data = [];
        var categories = layers.value;
        console.log("categories:",categories);
        var types = [
            { name: 'gpu_util', color: '#7b9ce1',data:0.0},
            { name: 'gpu_mem', color: '#bd6d6c',data:0.1 },
            { name: 'dram_active', color: '#75d874',data:0.2 },
            { name: 'fp32_active', color: '#e0bc78',data:0.0 },
            { name: 'sm_active', color: '#dc77dc',data:0.0 },
            { name: 'sm_occupancy', color: '#72b362',data:0.0 }
        ];
        var dataCount = 6;

        // 遍历所有行
        for(var i=0;i<result_length;i++){
            //绘制本行图案
            types[0].data = datas.value[i].gpu_util;
            types[1].data = datas.value[i].gpu_mem;
            types[2].data = datas.value[i].dram_active;
            types[3].data = datas.value[i].fp32_active;
            types[4].data = datas.value[i].sm_active;
            types[5].data = datas.value[i].sm_occupancy;

            // Generate mock data
            categories.forEach(function (category, index) {
                var begin = 0;
                for (var j = 0; j < dataCount; j++) {
                    var typeItem = types[j];
                    data.push({
                        name: typeItem.name,
                        value: [index, begin, (begin += typeItem.data), typeItem.data],
                        itemStyle: {
                            normal: {
                                color: typeItem.color
                            }
                        }
                    });
                }      
            });

        }
        
        function renderItem(params, api) {
            var categoryIndex = api.value(0);
            var start = api.coord([api.value(1), categoryIndex]);
            var end = api.coord([api.value(2), categoryIndex]);
            var height = api.size([0, 1])[1] * 0.6;
            var rectShape = echarts.graphic.clipRectByRect(
                {
                    x: start[0],
                    y: start[1] - height / 2,
                    width: end[0] - start[0],
                    height: height
                },
                {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                }
            );
            return (
                rectShape && {
                    type: 'rect',
                    transition: ['shape'],
                    shape: rectShape,
                    style: api.style()
                }
            );
        }

        option = {
            tooltip: {
                formatter: function (params) {
                    return params.marker + params.name + ': ' + params.value[3];
                }
            },
            title: {
                text: 'Profile',
                left: 'center'
            },
            dataZoom: [
                {
                    type: 'slider',
                    filterMode: 'weakFilter',
                    showDataShadow: false,
                    top: 400,
                    labelFormatter: ''
                },
                {
                    type: 'inside',
                    filterMode: 'weakFilter'
                }
            ],
            grid: {
                height: 300
            },
            xAxis: {
                // min: 0,
                scale: true,
                axisLabel: {
                    formatter: function (val) {
                        return Math.max(0, val);//?
                    }
                }
            },
            yAxis: {
                data: categories
            },
            series: [
                {
                    type: 'custom',
                    renderItem: renderItem,
                    itemStyle: {
                        opacity: 0.8
                    },
                    encode: {
                        x: [1, 2],
                        y: 0
                    },
                    data: data
                }
            ]
        };

        option && myChart.setOption(option);
    });

    return {
        echartsContainer,
        getDatas
    }
}


}
</script>