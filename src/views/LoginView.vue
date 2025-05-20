<template>
  <div class="min-h-screen flex justify-center items-center bg-cover bg-center" 
       style="background-image: url('https://wallpapershome.com/images/pages/pic_h/16242.jpg')">
    <div class="wrapper" :class="{ active: isRegister }">
      <span class="icon-close" @click="closeForm">
        <ion-icon :icon="close"></ion-icon>
      </span>

      <!-- Login Form -->
      <div class="form-box login">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-box">
            <span class="icon"><ion-icon :icon="mail"></ion-icon></span>
            <input type="email" v-model="loginForm.email" required>
            <label>Email</label>
          </div>
          <div class="input-box">
            <span class="icon"><ion-icon :icon="lockClosed"></ion-icon></span>
            <input type="password" v-model="loginForm.password" required>
            <label>Password</label>
          </div>
          <div class="remember-forgot">
            <label><input type="checkbox" v-model="loginForm.remember">Remember me</label>
            <a href="#" @click.prevent="forgotPassword">Forgot Password?</a>
          </div>
          <button type="submit" class="btn">Login</button>
          <div class="login-register">
            <p>Don't have an account?<a href="#" class="register-link" @click.prevent="toggleForm">Register</a></p>
          </div>
        </form>
      </div>

      <!-- Register Form -->
      <div class="form-box register">
        <h2>Registration</h2>
        <form @submit.prevent="handleRegister">
          <div class="input-box">
            <span class="icon"><ion-icon :icon="person"></ion-icon></span>
            <input type="text" v-model="registerForm.username" required>
            <label>Username</label>
          </div>
          <div class="input-box">
            <span class="icon"><ion-icon :icon="mail"></ion-icon></span>
            <input type="email" v-model="registerForm.email" required>
            <label>Email</label>
          </div>
          <div class="input-box">
            <span class="icon"><ion-icon :icon="lockClosed"></ion-icon></span>
            <input type="password" v-model="registerForm.password" required>
            <label>Password</label>
          </div>
          <div class="remember-forgot">
            <label><input type="checkbox" v-model="registerForm.terms">I agree to the terms & conditions</label>
          </div>
          <button type="submit" class="btn">Register</button>
          <div class="login-register">
            <p>Already have an account?<a href="#" class="login-link" @click.prevent="toggleForm">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mail, lockClosed, person, close } from 'ionicons/icons'

export default {
  name: 'LoginView',
  data() {
    return {
      isRegister: false,
      loginForm: {
        email: '',
        password: '',
        remember: false
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        terms: false
      },
      mail,
      lockClosed,
      person,
      close
    }
  },
  methods: {
    toggleForm() {
      this.isRegister = !this.isRegister
    },
    closeForm() {
      this.isRegister = false
      this.$router.push('/home')
    },
    handleLogin() {
      // Implementar lógica de login
      console.log('Login attempt:', this.loginForm)
      // Após login bem-sucedido:
      this.$router.push('/home')
    },
    handleRegister() {
      // Implementar lógica de registro
      console.log('Register attempt:', this.registerForm)
      // Após registro bem-sucedido:
      this.isRegister = false
    },
    forgotPassword() {
      // Implementar lógica de recuperação de senha
      console.log('Forgot password clicked')
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 400px;
  height: 440px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .5);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: height .2s ease;
}

.wrapper.active {
  height: 520px !important;
}

.wrapper .form-box {
  width: 100%;
  padding: 40px;
}

.wrapper .form-box.login {
  transition: transform .18s ease;
  transform: translateX(0);
}

.wrapper.active .form-box.login {
  transition: none;
  transform: translateX(-400px);
}

.wrapper .form-box.register {
  position: absolute;
  transition: none;
  transform: translateX(400px);
}

.wrapper.active .form-box.register {
  transition: transform .18s ease;
  transform: translateX(0);
}

.wrapper .icon-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 45px;
  height: 45px;
  background: #570457;
  font-size: 2em;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20px;
  cursor: pointer;
  z-index: 1;
}

.form-box h2 {
  font-size: 2em;
  color: #570457;
  text-align: center;
}

.input-box {
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #570457;
  margin: 30px 0;
}

.input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  color: #570457;
  font-weight: 500;
  pointer-events: none;
  transition: .5s;
}

.input-box input:focus~label,
.input-box input:valid~label {
  top: -5px
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  color: #570457;
  font-weight: 600;
  padding: 0 35px 0 5px;
}

.input-box .icon {
  position: absolute;
  right: 8px;
  font-size: 1.2em;
  color: #570457;
  line-height: 57px;
}

.remember-forgot {
  font-size: .9em;
  color: #570457;
  font-weight: 500;
  margin: -15px 0 15px;
  display: flex;
  justify-content: space-between;
}

.remember-forgot label input {
  accent-color: #570457;
  margin-right: 3px;
}

.remember-forgot a {
  color: #570457;
  text-decoration: none;
}

.remember-forgot a:hover {
  text-decoration: underline;
}

.btn {
  width: 100%;
  height: 45px;
  background: #570457;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  color: #fff;
  font-weight: 500;
}

.login-register {
  font-size: .9em;
  color: #570457;
  text-align: center;
  font-weight: 500;
  margin: 25px 0 10px;
}

.login-register p a {
  color: #570457;
  text-decoration: none;
  font-weight: 600;
}

.login-register p a:hover {
  text-decoration: underline;
}
</style> 