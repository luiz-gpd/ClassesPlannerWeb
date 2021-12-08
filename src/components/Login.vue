<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="@/assets/logoVisao.png"/>
        <!-- <div class="md-title">Vue Material</div>
        <div class="md-body-1">Build beautiful apps with Material Design and Vue.js</div> -->
      </div>

      <div class="form">
        <md-field>
          <label>Login</label>
          <md-input v-model="login.email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Senha</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/resetpassword">Cadastrar</a>
        <md-button class="md-raised md-primary" @click="auth">Entrar</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    auth() {
      // your code to login user
      // this is only for example of loading
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
