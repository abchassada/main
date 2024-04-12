<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-content">
        <h1>面向DLRM的优化调度</h1>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
          @select="handleSelect">
          <el-menu-item index="1" style="color: white;font-weight: bold;">项目信息</el-menu-item>
          <el-menu-item index="2" style="color: white;font-weight: bold;">任务的配置文件</el-menu-item>
          <el-menu-item index="3" style="color: white;font-weight: bold;">当前集群的GPU资源信息</el-menu-item>
        </el-menu>
        <el-popover placement="bottom" :width="210" trigger="hover" class="personCenter">
          <template #reference>
            <img src="../assets/personCenter.png" class="img" alt="Personal Center" />
          </template>
          <div class="popup-item">邮箱:{{ this.email }}</div><br>
          <!-- <div class="popup-item">密码:{{ this.password }}</div><br> -->
          <button class="button" @click="logout">登出</button>
        </el-popover>
      </div>
    </el-header>
    <el-container v-if="activeIndex === '1'">
      <el-aside width="320px">
        <menuComponent @sendJobId="receiveJobId" />
      </el-aside>
      <el-main>
        <listComponent :present="presentJobId" :key="listComponentKey" />
      </el-main>
    </el-container>
    <el-container v-if="activeIndex === '2'">
      <profileList />
    </el-container>
    <el-container v-if="activeIndex === '3'">
      <gpuInfo />
    </el-container>
  </el-container>
</template>

<script>
import menuComponent from '../components/menuComponent.vue';
import listComponent from '../components/listComponent.vue';
import profileList from '../components/charts/profileList.vue';
import gpuInfo from '../components/gpuInfo.vue';
import { ref } from 'vue';
export default {
  name: 'HomeView',
  data() {
    return {
      isPopupVisible: false,
      presentJobId: '',
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
      listComponentKey: 0,
    }
  },
  components: {
    menuComponent,
    listComponent,
    profileList,
    gpuInfo,
  },
  setup() {
    const activeIndex = ref('1');
    const handleSelect = (key) => {
      console.log("当前选中为" + key);
      activeIndex.value = key;
    };
    return {
      activeIndex,
      handleSelect
    };
  },
  methods: {
    receiveJobId(data) {
      this.presentJobId = data;
      console.log('present!' + data);
      listComponentKey: 0
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    hidePopup() {
      this.isPopupVisible = false;
    },
    logout() {
      localStorage.setItem('isLoggedIn', false);
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style>
.el-menu-demo {
  background-color: #3b3b3b;
  margin-right: 30px;
}

.personCenter {
  display: flex;
  justify-content: center;
}

.popup-item {
  text-align: center;
  margin-bottom: 10px;
}

.button {
  display: block;
  width: 100%;
  text-align: center;
  padding: 8px 0;
}

.button {
  border-radius: 20px;
  border: 1px solid #1e1c1c;
  color: #1b1a1a;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.button:active {
  transform: scale(0.95);
}

.button:focus {
  outline: none;
}

h1 {
  text-align: left;
  margin-right: auto;
}

.img {
  width: 40px;
  height: 40px;
}

.home-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}

.el-header {
  color: white;
  text-align: left;
  line-height: 60px;
  width: 100%;
  background-color: #3b3b3b;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.5);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.el-aside {
  text-align: center;
  line-height: 200px;
}

.el-main {
  text-align: center;
}

body>.el-container {
  margin-bottom: 40px;
}
</style>
