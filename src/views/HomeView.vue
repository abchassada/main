<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-content">
        <h1>面向DLRM的优化调度</h1>
        <el-popover placement="bottom" :width="210" trigger="hover" class="personCenter">
          <template #reference>
            <img src="../assets/personCenter.png" class="img" alt="Personal Center" />
          </template>
          <div class="popup-item">邮箱:{{ this.email }}</div><br>
          <div class="popup-item">密码:{{ this.password }}</div><br>
          <button class="button" @click="logout">登出</button>
        </el-popover>
      </div>
    </el-header>
    <el-container>
      <el-aside width="320px">
        <menuComponent @sendJobId="receiveJobId" />
      </el-aside>
      <el-main>
        <listComponent :present="presentJobId" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menuComponent from '../components/menuComponent.vue';
import listComponent from '../components/listComponent.vue';
export default {
  name: 'HomeView',
  data() {
    return {
      isPopupVisible: false,
      presentJobId: '',
      email:localStorage.getItem('email'),
      password: localStorage.getItem('password'),
    }
  },
  components: {
    menuComponent,
    listComponent
  },
  methods: {
    receiveJobId(data) {
      this.presentJobId = data;
      console.log('present!' + data);
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    // 鼠标移出时隐藏悬浮框
    hidePopup() {
      this.isPopupVisible = false;
    },
    // 登出操作
    logout() {
      localStorage.setItem('isLoggedIn', false);
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style>
.personCenter{
  display: flex;
  justify-content: center;
}
.popup-item {
  text-align: center;
  /* 水平居中 */
  margin-bottom: 10px;
  /* 可以调整项目之间的间距 */
}

.button {
  display: block;
  /* 将按钮设为块级元素，以便可以设置宽度 */
  width: 100%;
  /* 让按钮宽度充满父元素 */
  text-align: center;
  /* 水平居中 */
  padding: 8px 0;
  /* 可以根据需要调整按钮的上下内边距 */
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
