<template>
  <h1 class="title">项目!</h1>
  <el-scrollbar ref="scrollbarRef" class="projectMenu" always @scroll="scroll">
    <el-row class="tac" style="height: 100%;">
      <el-col :span="24" style="height: 100%;">
        <el-menu class="el-menu-vertical-demo" @select="selectMenu" style="height: 100%;">
          <el-menu-item v-for="(item, index) in menu" :key="index" :index="index" class="menuItem">{{ item }}</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      menu: ['project1', 'project2', 'project3','project1', 'project2', 'project3','project1', 'project2', 'project3','project1', 'project2', 'project3','project1', 'project2', 'project3','project1', 'project2', 'project3'],
      presentMenu:1,
    };
  },
  methods: {
    selectMenu(index) {
      console.log('选中的子菜单的数组下标是：', index);
      this.presentMenu=index+1;
    },
  },
};
</script>

<style>
.title {
  height: 50px;
  display: flex;
  justify-content: center; 
  align-items: center;
}
.menuItem {
  justify-content: center;
  border-top: #DCDCDC 1px solid;
  border-bottom: #DCDCDC 1px solid;
  border-radius: 10px;
}
.projectMenu{
  height: 100vh; /* 设置高度占满整个视口 */
  overflow-y: auto; /* 添加纵向滚动条 */
}
</style>
