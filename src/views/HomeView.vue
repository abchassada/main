<template>
  <el-container class="home-container">
    <el-header>
      <h1>xxxx系统</h1>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <menuComponent />
      </el-aside>
      <el-main>
        <listComponent />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menuComponent from '../components/menuComponent.vue';
import listComponent from '../components/listComponent.vue';
export default {
  name: 'HomeView',
  components:{
    menuComponent,
    listComponent
  }
}
</script>
<style>
h1{
  text-align: center;
}
.home-container{
  height:100%;
}
  .el-header{
    color: #333;
    text-align: left;
    line-height: 60px;
    border-bottom:#DCDCDC 1px solid;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
    border-right:#DCDCDC 1px solid;
  }

  .el-main {
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
