<template>

  <body class="body">
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>注册账户</h1>
          <div class="social-container">
            <!-- <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
						<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
						<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> -->
          </div>
          <span></span>
          <input type="text" placeholder="昵称" v-model="nickname" />
          <input type="text" placeholder="邮箱：作为登录凭证" v-model="email" />
          <div class="email">
            <input type="email" placeholder="邮箱验证码" v-model="key" />
            <button @click="getCode(0)" class="button">获取验证码</button>
          </div>
          <input type="password" placeholder="密码" v-model="password" />
          <input type="password" placeholder="再次确认密码" v-model="confirmPassword" />
          <button @click="register">注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>登录</h1>
          <div class="social-container">
            <!-- <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
						<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
						<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> -->
          </div>
          <input type="email" placeholder="邮箱" v-model="email" />
          <input type="password" placeholder="密码" v-model="password" />
          <a @click="forgetPassword">忘记密码？</a>
          <button @click="login">登录</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>欢迎回来！</h1>
            <p></p>
            <button class="ghost" id="signIn">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>输入您的个人资料，与我们一起开始旅程</p>
            <button class="ghost" id="signUp">注册</button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
<script scoped>
import { ElMessage } from "element-plus";
import axios from 'axios'
import router from "@/router";
export default {
  data() {
    return {
      nickname: null,
      key: null,
      poassword: null,
      confirmPassword: null,
      email: null,
    }
  },
  mounted() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  },
  created() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.$router.push({ name: 'home' });
    }
  },

  methods: {
    showSignUpPanel() {
      this.$refs.container.classList.add("right-panel-active");
    },
    showSignInPanel() {
      this.$refs.container.classList.remove("right-panel-active");
    },
    login() {
      if (this.email == null) {
        ElMessage.error("邮箱不能为空！");
        return;
      }
      if (this.password == null) {
        ElMessage.error("密码不能为空！");
        return;
      }
      axios.post('/user/login', {
        "email": this.email,
        "password": this.password
      }
      )
        .then((response) => {
          if (response.data.status === 0) {
            //ElMessage.success(response.data.msg);
            // store.dispatch('login', response.data.data.JWT);
            localStorage.setItem('JWT', response.data.data.JWT);
            // store.dispatch('changeTeam', response.data.data.team_id);
            localStorage.setItem('curTeamID', response.data.data.team_id);
            console.log(response.data.user_id)
            localStorage.setItem('user_id', response.data.user_id)
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('email', this.email);
            localStorage.setItem('password', this.password);
            localStorage.setItem('currentUser', JSON.stringify({ name: response.data.user_nickname, color: '#958DF1' }))
            localStorage.setItem('myRole', response.data.user_role);
            if (response.data.data.team_id === 1) router.push('/message-center')
            else router.push('/chat-room');
          }
          else
            console.log();
        })
        .catch(function () { })
      this.$router.push({ name: 'home' });
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
    },
    /*用户注册*/
    register() {
      //确保密码一致
      if (this.password !== this.confirmPassword) {
        ElMessage.error("两次密码输入不一致！");
        return;
      }
      if (this.email == null) {
        ElMessage.error("邮箱不能为空！");
        return;
      }
      if (this.key == null) {
        ElMessage.error("请填写验证码！");
        return;
      }
      if (this.password == null) {
        ElMessage.error("密码不能为空！");
        return;
      }
      if (this.nickname == null) {
        ElMessage.error("昵称不能为空！");
        return;
      }
      if (this.confirmPassword == null) {
        ElMessage.error("确认密码不能为空！");
        return;
      }
      axios.post('/api/user/register',
        {
          "nickname": this.nickname,
          "email": this.email,
          "key": this.key,
          "password1": this.password,
          "password2": this.confirmPassword,
        })
        .then((response) => {
          if (response.data.status === 0) {
            ElMessage.success(response.data.msg);
            this.toggleForm(1);
          }
          else
            console.log();
        })
      // .catch(function () { ElMessage.error("网络异常，请稍后重试。"); })
    },
    /*忘记密码*/
    forgetPassword() {
      this.$router.push({ name: 'forgetPassword' });
    }
  }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

.body h1 {
  font-weight: bold;
  margin: 0;
}

.body h2 {
  text-align: center;
}

.body p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

.body span {
  font-size: 12px;
}

.body a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.body button {
  border-radius: 20px;
  border: 1px solid #1e1c1c;
  background-color: #1c1a1a;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.body button:active {
  transform: scale(0.95);
}

.body button:focus {
  outline: none;
}

.body button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

.body form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.body input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.body .container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.body .form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.body .sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.body .container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #121111;
  background: -webkit-linear-gradient(to right, #151514, #151414);
  background: linear-gradient(to right, #1b1a19, #181818);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.email {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
}

.email input {
  margin-right: 10px;
  /* 设置输入框和按钮之间的距离 */
}

.button {
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 15px;
  white-space: nowrap;
}
</style>