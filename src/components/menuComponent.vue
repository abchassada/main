<template>
  <el-text tag="b" class="project">项目</el-text>
  <el-scrollbar ref="scrollbarRef" class="projectMenu" always @scroll="scroll">
    <el-row class="tac" style="height: 100%;">
      <el-col :span="24" style="height: 100%;">
        <el-menu class="el-menu-vertical-demo" @select="selectMenu" style="height: 100%;">
          <el-menu-item v-for="(item, index) in menu" :key="index" :index="index" class="menuItem">{{ item.JobName }}</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    </el-scrollbar>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      menu: [],
      presentMenuId:1,
    };
  },
  methods: {
    selectMenu(index) {
      console.log('选中的子菜单的数组下标是：', this.menu[index]);
      this.presentMenuId=this.menu[index].JobId;
      this.$emit('sendJobId', this.presentMenuId);
    },
  },
  mounted() {
    axios.post('/show/alljob', {

      })
      .then(response => {
          console.log('从后端获取的项目名数组：', response.data);

          this.menu =response.data.result;
          this.presentMenuId = this.menu[0].JobId;
          this.selectMenu(0);
      })
      .catch(error => {
          console.error('获取项目名数组失败：', error);
          this.menu = ['err'];
      });
  }
  
};
</script>
<style>
.el-scrollbar {
  overflow: hidden;
}
.project{
    height:50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:22px;
}
.menuItem {
  justify-content: center;
  border-top: #DCDCDC 1px solid;
  border-bottom: #DCDCDC 1px solid;
}
</style>