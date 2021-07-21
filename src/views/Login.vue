<template>
  <div class="login">
    <div class="logo">
      <img src="https://accountstatic.vivo.com.cn/accountstatic.vivo.com.cn/static/img/logo.3c33210.png.webp" alt>
      <p>账号登录</p>
    </div>

    <div class="info">
      <label>
        <span>账号</span>
        <input type="text" v-model="user.name" placeholder="请输入账号/用户名" />
      </label>
      <label>

        <span>密码</span>
        <input type="password" v-model="user.password" placeholder="请输入密码">
      </label>
    </div>

    <div class="login-btn">
      <button @click="login">登录</button>
    </div>

    <div class="register-btn">
      <button @click="jumpRegister">注册</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      if(!localStorage.getItem('user')) {
        Toast('用户不存在')
        return false
      }

      if (this.user.name.trim() === '') {
        Toast('请输入用户名')
        return false
      }

      if (this.user.password.trim() === '') {
        Toast('请输入密码')
        return false
      }

      if (this.user.name != JSON.parse(localStorage.getItem('user')).name) {
        Toast('用户名不正确')
        return false
      }

      if (this.user.password != JSON.parse(localStorage.getItem('user')).password) {
        Toast('密码不正确')
        return false
      }

      Toast('登陆成功')
      this.$router.push("/profile");
    },
    jumpRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #fff;
  left: 0;
  top: 0;
}
.logo {
  margin-top: 2rem
}
.logo img {
  width: 3rem;
  display: block;
  margin: 0.6rem auto;
}
.logo p {
  color: black;
  text-align: center;
  font-size: 0.5rem;
}
.info {
  margin-top: 0.6rem;
  margin-bottom: 0.6rem
}
.info label {
  width: 90%;
  margin: auto;
  height: 1.5rem;
  border-bottom: 0.03rem solid #f2f2f2;
  display: flex;
}
.info label span {
  width: 20%;
  font-size: 0.5rem;
  line-height: 1.5rem;
  display: block;
  float: left;
}
.info label input {
  width: 80%;
  font-size: 0.4rem;
  padding-left: 0.3rem;
}
.login-btn,
.register-btn {
  display: flex;
}
.login-btn button,
.register-btn button {
  width: 9rem;
  height: 1.1rem;
  margin: 0 auto;
  /* margin-top: 0.72rem; */
  margin-bottom: 0.3rem;
  text-align: center;
  line-height: 1.1rem;
  font-size: 0.45rem;
  color: #fff;
  border-radius: 0.6rem;
  background-color: #46a1fa;
  background-image: linear-gradient(90deg, #418eff, #4566ff);
}
</style>