<template>
  <el-text tag="b" class="project">项目</el-text>
  <el-row class="tac" style="height: 100%;">
    <el-col :span="24" style="height: 100%; display: flex; flex-direction: column;">
      <el-menu custom-class="el-menu" @select="selectMenu" style="overflow: hidden;"
        :default-active="activeIndex">
        <el-menu-item v-for="(item, index) in menu" :key="index" :index="index" class="menuItem">{{ item.JobName
          }}</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
import axios from 'axios';
import { ref, getCurrentInstance } from 'vue';
export default {
  data() {
    return {
      menu: [],
      presentMenuId: 1,
    };
  },
  setup() {
    const datab = getCurrentInstance();
    const activeIndex = ref('0');
    const selectMenu = (index) => {
      console.log('选中的子菜单的数组下标是：', datab.proxy.menu[index]);
      datab.proxy.presentMenuId = datab.proxy.menu[index].JobId;
      activeIndex.value = index;
      datab.proxy.$emit('sendJobId', datab.proxy.presentMenuId);
    };
    return {
      activeIndex,
      selectMenu,
    }
  },
  // methods: {
  //   selectMenu(index) {
  //     console.log('选中的子菜单的数组下标是：', this.menu[index]);
  //     this.presentMenuId=this.menu[index].JobId;
  //     this.$emit('sendJobId', this.presentMenuId);
  //   },
  // },
  mounted() {
    axios.post('/show/alljob', {

    })
      .then(response => {
        console.log('从后端获取的项目名数组：', response.data);

        this.menu = response.data.result;
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
<style scoped>
body {
  overflow: hidden;
}
.el-menu::-webkit-scrollbar{
  display:none;
}
.project {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}

.menuItem {
  justify-content: center;
  border-top: #DCDCDC 1px solid;
  border-bottom: #DCDCDC 1px solid;
  font-size: 15px;
}
</style>