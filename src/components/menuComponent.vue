<template>
  <h1 class="title">项目</h1>
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
import axios from 'axios'
export default {
  data() {
    return {
      menu: ['project1', 'project2', 'project3','project1', 'project2', 'project3','project1', 'project2', 'project3','project1', 'project2', 'project3','project1', 'project2', 'project3','project1', 'project2', 'project3'],
      presentMenu:1,
    };
  },
  methods: {
    selectMenu(index) {
      console.log('选中的子菜单的数组下标是：', this.menu[index]);
      this.presentMenu=this.menu[index];
      this.$emit('sendJobName', this.presentMenu);
    },
  },
  mounted() {
      axios.post('http://127.0.0.1:4523/m1/4085118-0-default/show/alljob', {
          // 这里可以放置需要发送的数据，如果没有数据可以为空对象或null
      })
      .then(response => {
          // 当请求成功时，response包含了从后端返回的数据
          console.log('从后端获取的项目名数组：', response.data);
          //TODO 根据接口改改
          this.menu =response.data.result;
          this.presentMenu = this.menu[0];
          this.selectMenu(0);
      })
      .catch(error => {
          // 当请求发生错误时，error包含了错误信息
          console.error('获取数据失败：', error);
          this.menu = ['err'];
      });
  }
  
};
</script>
<style>
.title{
    height:50px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;
}
.menuItem {
  justify-content: center;
  border-top: #DCDCDC 1px solid;
  border-bottom: #DCDCDC 1px solid;
}
</style>