<template>
    <h1 class="title">项目!</h1>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu class="el-menu-vertical-demo">
                <el-menu-item v-for="(item,index) in menu" :key="index" class="menuItem">{{ item }}</el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            menu: ['project1','project2','project3']
        }
    },
    mounted() {
        axios.post('http://127.0.0.1:4523/m1/4085118-0-default/show/alljob', {
            // 这里可以放置需要发送的数据，如果没有数据可以为空对象或null
        })
        .then(response => {
            // 当请求成功时，response包含了从后端返回的数据
            console.log('从后端获取的数据：', response.data);
            //TODO 根据接口改改
            this.menu =response.data.menu;
        })
        .catch(error => {
            // 当请求发生错误时，error包含了错误信息
            console.error('获取数据失败：', error);
            this.menu = ['err'];
        });
    }
}
</script>

<style>
.title{
    height:50px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;
}
.menuItem{
    justify-content: center;
    border-top:#DCDCDC 1px solid;
    border-bottom:#DCDCDC 1px solid;
    border-radius: 10px;
}
</style>