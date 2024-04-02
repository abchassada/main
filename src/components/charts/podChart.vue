<template>
    <div ref="echartsContainer" style="height: 500px"></div>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
import axios from "axios";
export default {
    props: ["present"],
    setup(props) {
        const echartsContainer = ref(null);
        const datas = ref([]);
        var result_length; //result数组长度
        const layers = ref([]);
        const getDatas =async () => {
            var FormData = require("form-data");
            var data = new FormData();
            data.append("jobid", "" + props.present);
            await axios
                .post("/show/results", data)
                .then((response) => {
                    console.log("获取数据成功", response.data.result);
                    var temp_datas = [];
                    temp_datas = response.data.result;
                    result_length = response.data.result.length;
                    //根据forward排序datas
                    var true_datas = [];
                    var false_datas = [];
                    for (var i = 0; i < result_length; i++) {
                        if (temp_datas[i].forward) {
                            true_datas.push(temp_datas[i]);
                        } else {
                            false_datas.push(temp_datas[i]);
                        }
                    }

                    var half_len = true_datas.length;
                    temp_datas = true_datas;
                    for (var i = half_len - 1; i >= 0; i--) {
                        const foundItem = false_datas.find(
                            (item) => item.layer === true_datas[i].layer
                        );
                        if (foundItem != undefined) temp_datas.push(foundItem);
                    }
                    datas.value = temp_datas;
                    layers.value = datas.value.map((item) => item.layer);
                })
                .catch((error) => {
                    console.error("获取数据失败：", error);
                });
        };
        const refreshGraph = async () => {
            await getDatas();
            const myChart = echarts.init(echartsContainer.value);
            var option;
            var data = [];
            var categories = layers.value;
            var dataCount = 6;

            // 遍历所有行
            for (var i = 0; i < result_length; i++) {
                //绘制本行图案
                var types = [
                    {
                        name: "gpu_util",
                        color: "#7b9ce1",
                        data: datas.value[i].gpu_util,
                        unit: "%",
                    },
                    {
                        name: "dram_active",
                        color: "#75d874",
                        data: datas.value[i].dram_active,
                        unit: "%",
                    },
                    {
                        name: "fp32_active",
                        color: "#e0bc78",
                        data: datas.value[i].fp32_active,
                        unit: "%",
                    },
                    {
                        name: "sm_active",
                        color: "#dc77dc",
                        data: datas.value[i].sm_active,
                        unit: "%",
                    },
                    {
                        name: "sm_occupancy",
                        color: "#72b362",
                        data: datas.value[i].sm_occupancy,
                        unit: "%",
                    },
                    {
                        name: "gpu_mem",
                        color: "#bd6d6c",
                        data: datas.value[i].gpu_mem,
                        unit: "GB",
                    },
                ];
                // Generate mock data
                var begin = 0;
                for (var j = 0; j < dataCount; j++) {
                    var typeItem = types[j];
                    begin = 100 * j;
                    data.push({
                        name: typeItem.name,
                        value: [
                            i,
                            begin,
                            (begin += typeItem.data),
                            typeItem.data,
                            typeItem.unit,
                        ],
                        itemStyle: {
                            normal: {
                                color: typeItem.color,
                            },
                        },
                    });
                }
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
                        height: height,
                    },
                    {
                        x: params.coordSys.x,
                        y: params.coordSys.y,
                        width: params.coordSys.width,
                        height: params.coordSys.height,
                    }
                );
                return (
                    rectShape && {
                        type: "rect",
                        transition: ["shape"],
                        shape: rectShape,
                        style: api.style(),
                    }
                );
            }

            option = {
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
                title: {
                    text: "性能分析",
                    left: "center",
                },
                dataZoom: [
                    {
                        type: "slider",
                        filterMode: "weakFilter",
                        showDataShadow: false,
                        top: 400,
                        labelFormatter: "",
                    },
                    {
                        type: "inside",
                        filterMode: "weakFilter",
                    },
                ],
                grid: {
                    height: 300,
                },
                xAxis: {
                    min: 0,
                    scale: true,
                    axisLabel: {
                        formatter: function (val) {
                            return Math.max(0, val); //?
                        },
                    },
                },
                yAxis: {
                    data: categories,
                },
                series: [
                    {
                        type: "custom",
                        renderItem: renderItem,
                        itemStyle: {
                            opacity: 0.8,
                        },
                        encode: {
                            x: [1, 2],
                            y: 0,
                        },
                        data: data,
                    },
                ],
            };

            option && myChart.setOption(option);
        };

        onMounted(() => {
            refreshGraph();
        });
        watch(
            [() => props.present],([newPresent], [oldPresent]) => {
                refreshGraph();
            },
            { immediate: true }
        );

        return {
            echartsContainer,
            getDatas,
        };
    },
};
</script>