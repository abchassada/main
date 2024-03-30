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
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
export default {
    data(){
        return{
            points:[],
            forward:[],
            backward:[],
            count:10,
        }
    },
    props:['present','selectHostname'],
    setup(props) {
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
            receiveChart.setOption(receiveOption)
            const transmitChart = echarts.init(transmitBytes.value)
            const transmitOption = {
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
        });
        const getPoints = () => {
            axios.post('http://192.168.5.60:31089/show/networkinfo', {
                jobid:props.present,
                hostname:props.selectHostname,
            })
                .then(response => {
                    console.log("获取带宽信息成功");
                    this.points= response.data.result;
                    this.handlePoints();
                })
                .catch(error => {
                    console.error('获取带宽信息失败',error);
                });
        };
        return {
            receiveBytes,
            transmitBytes,
            getPoints,
        }
    },
    methods:{
        /*handle primitive data*/
        handlePoints(){
            let length=this.points.length;
            this.points.sort((a, b) => a.timestamp - b.timestamp);
            for (let ob of this.points) {
                if(ob.forward===true){
                    this.forward.push(ob);
                }else{
                    this.backward.push(ob);
                }
            }
        }
    }
}
</script>