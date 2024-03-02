<template>
    <h1 class="title">项目</h1>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu class="el-menu-vertical-demo">
                <el-menu-item v-for="(item,index) in menu" :key="index" class="menuItem">{{ item }}</el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
export default{
    data(){
        return{
            menu:['project1','project2','project3'],
        }
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