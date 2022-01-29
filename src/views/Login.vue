<template>
  <div class="centered-container">
    <div>
      <b-row>
      <img src="logo_visao.jpg" alt="Logo Colégio Visão" />
      </b-row>
      <div v-if="!recuperarSenha">
      <b-row>
        <b-input v-model="user.email" type="email" placeholder="exemplo@colegiovisaorecife.com.br" label="Email" :disabled="loading"></b-input>
      </b-row>
      <b-row>
        <b-input v-model="user.passwordw" type="password" placeholder="Insira sua senha" label="Senha" :disabled="loading"></b-input>
      </b-row>
      <b-row>
        <a class="forget-password" @click="forgetPassword()">Esqueci minha senha</a>
      </b-row>
        <b-button v-on:click="signIn()">Entrar</b-button>
      </div>
      <div v-else>
        <div style="text-align: center; margin-bottom: 20px">
          <label>Esqueceu a senha?</label>
        </div>

        <b-input v-model="email" type="email" placeholder="exemplo@colegiovisaorecife.com.br" label="Email" :disabled="loading"></b-input>

        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <button class="btn backgroundgreen" @click="confirmResetPassword">Redefinir</button>
            </div>
            <div class="col-md-6">
              <button class="btn" @click="recuperarSenha = false">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="background" /> -->
  </div>
</template>

<script>
  import config from '../helpers/generalConfig';

  export default {
    data() {
      return {
        email: undefined,
        loading: true,
        recuperarSenha: false,
        user: {
          email: undefined,
          password: undefined,
        },
      };
    },
    created() {
      window.document.title = 'Trilhas Visão';
      this.recuperarSenha = false;
      this.loading = false;
    },
    methods: {
      forgotPassword() {
        this.forgot = true;
      },
      signIn() {
        if (!this.email) {
          //   MENSAGEM 'Informe um email válido
          return;
        }
        if (!this.password) {
          //   MENSAGEM 'Informe a senha.'
          return;
        }
        this.$api()
          .post(`${config.jsonServer}/api/user/signin`, this.user)
          .then((response) => {
            const user = response.data.user;
            const token = response.data.token;
            this.$store.dispatch('auth/setUser', user);
            this.$store.dispatch('auth/setToken', token);
            this.$router.push({ name: 'home' });
          })
          .catch(() => {
            // MENSAGEM 'Mensagem vinda do banco ou Usuário não encontrado'
          });
      },
      confirmResetPassword() {
          if (this.email) {
          this.$api()
            .post(`${config.jsonServer}/api/userToken/createToken`, { email: this.email })
            .then((response) => {
              this.$api()
                .get(`${config.jsonServer}/api/userToken/sendEmailForgetPassword?email=${this.email}&token=${response.data._id}`)
                .then(() => {
                  this.recuperarSenha = false;
                  // MENSAGEM BOA --> 'Foi enviado um e-mail para você com instruções para mudar a senha.
                })
                .catch(() => {})// MENSAGEM --> Erro ao enviar email`
            })
            // MENSAGEM --> 'Erro na recuperação de senha!'
        } else {
          // MENSAGEM --> 'Preencha seu Email.'
        }
      }
    },
  };
</script>

<style scoped>
.centered-container {
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 50px;
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
  .forget-password {
    color: red;
    text-decoration: underline;
    text-decoration: red;
  }
</style>
