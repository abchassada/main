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
      this.presentMenuId=this.menu[index].job_id;
      this.$emit('sendJobId', this.presentMenuId);
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
          this.presentMenuId = this.menu[0].JobId;
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