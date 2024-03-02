<template>
  <el-menu>
     <el-menu-item v-for="(item,index) in menuItem" :key="index" >{{ item }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'HomeView',
  data(){
    return{}
  }
}
</script>
