<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="@/assets/logoVisao.png"/>
        <!-- <div class="md-title">Vue Material</div>
        <div class="md-body-1">Build beautiful apps with Material Design and Vue.js</div> -->
      </div>

      <div class="form" v-if="!isSignUp">
        <md-field>
          <label>Login</label>
          <md-input v-model="login.email" autofocus type="email"></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Senha</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="form" v-else>
        <md-field>
          <label>Nome</label>
          <md-input v-model="signup.name" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Email</label>
          <md-input v-model="signup.email" type="email"></md-input>
        </md-field>
        <md-field>
          <label>Senha</label>
          <md-input v-model="signup.password" autofocus type="password"></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Confirmar Senha</label>
          <md-input v-model="signup.confirmPassword" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between" v-if="!isSignUp">
        <a v-on:click="isSignUp=true" class="show-finger">Cadastrar</a>
        <md-button class="md-raised md-primary" @click="auth">Entrar</md-button>
      </div>

      <div class="actions md-layout md-alignment-center-space-between" v-else>
        <a v-on:click="isSignUp=false" class="show-finger">Voltar</a>
        <md-button class="md-raised md-primary" @click="auth">Cadastrar</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import { router } from "../_helper/router";
export default {
  name: "Login",
  data() {
    return {
      isSignUp: false,
      loading: false,
      login: {
        email: "",
        password: ""
      },
      signup: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    };
  },
  methods: {
    auth() {
      // your code to login user
      // this is only for example of loading
      router.push("/plano");
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    }
  }
};
</script>

<style >
.centered-container {
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 50px;
  }
  .title {
    text-align: center;
    margin-bottom: 30px;
    }
    .img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  
    .md-button {
      margin: 0;
    }
  .form {
    margin-bottom: 60px;
  }
  .background {
    background-color: #0AE0FA;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .show-finger {
    cursor: pointer;
  }
  .md-content {
    border-radius: 20px;
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background:#0AE0FA;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
