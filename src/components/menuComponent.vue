<template>
  <el-text tag="b" class="project">项目</el-text>
  <el-row class="tac" style="height: 100%;">
    <el-col :span="24" style="height: 100%; display: flex; flex-direction: column;">
      <el-menu custom-class="el-menu" @select="selectMenu" :default-active="activeIndex">
        <el-menu-item v-for="(item, index) in menu" :key="index" :index="index" class="menuItem"
          :style="menuStyle(index)">{{ item.JobName
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
    const menuStyle = (index) => {
      return {
        color:"black",
        backgroundColor: index === activeIndex.value ? '#f0f0f0' : 'transparent',
        fontWeight: index === activeIndex.value ? 'bold' : 'normal',
        borderLeft: index === activeIndex.value ? '6px solid #bdbdbd' : 'none',
      };
    };
    return {
      activeIndex,
      selectMenu,
      menuStyle,
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
<style scoped lang="css">
body {
  overflow: hidden;
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
  font-size: 15px;
}
</style>