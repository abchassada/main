<template>
    <div class="allCon">
        <div class="changePwd" id="changePwd">
            <h1>邮箱验证</h1>
            <input class="scn" type="email" placeholder="邮箱" v-model="email" />
            <div class="inline-input">
                <input class="scn-key" type="text" placeholder="邮箱验证码" v-model="key" />
                <button class="button">获取验证码</button>
            </div>
            <input class="scn" type="password" placeholder="新密码" v-model="password" show-password />
            <input class="scn" type="password" placeholder="确认新密码" v-model="confirmPassword" />
            <div class="inline-buttons">
                <button  @click="modifyPassword" class="button">修改密码</button>
                <button   @click="returnLogin" class="button">返回</button>
            </div>
            <br><br>
        </div>
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
import axios from 'axios'
export default{
    methods:{
        returnLogin(){
            this.$router.push({ name: 'login' });
        }, 
        modifyPassword(){
            if (this.password == null) {
                ElMessage.error("密码不能为空");
                return;
            }
            if (this.password !== this.confirmPassword) {
                ElMessage.error("两次密码输入不一致！");
                return;
            }
            axios.post('/api/user/changepwd', {
                "email": this.email,
                "key": this.key,
                "password1": this.password,
                "password2": this.confirmPassword
            })
                .then((response) => {
                    if (response.data.status === 0) {
                        ElMessage.success(response.data.msg);
                        this.key = null;
                        this.password = null;
                        this.confirmPassword = null;
                        //this.$router.push({ name: 'login' });
                    }
                    else
                        ElMessage.error(response.data.msg);

                })
            this.$router.push({ name: 'login' });
        },
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
.allCon{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.changePwd {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    overflow: hidden;
    height: 480px;
    width: 768px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
h1 {
    font-weight: bold;
    text-align: center;
    margin: 20px;
}
.button {
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

.button:active {
    transform: scale(0.95);
}

.button:focus {
    outline: none;
}

.button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
}
.scn {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 12px 0;
    width: 284px;
    height:40px;
}
.inline-input {
    display: flex;
    align-items: center;
}

.inline-input input {
    margin-right: 10px;
}
.scn-key{
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 12px 0;
    width: 102px;
    height: 40px;
}
.inline-buttons {
    display: flex;
}
.button {
    margin: 0 10px;
}
</style>