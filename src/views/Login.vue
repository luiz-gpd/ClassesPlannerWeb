<template>
  <div class="background">
  <div class="centered-container">
    <div class="white-background">
      <b-row>
      <img class="logo center" src="../assets/logoVisao.png" alt="Logo Colégio Visão" />
      </b-row>
      
      <div v-if="!forgot">
      <b-row>
        <label>Email:</label>
        <b-form-input v-model="user.email" type="email" placeholder="exemplo@colegiovisaorecife.com.br" :disabled="loading"></b-form-input>
      </b-row>
        <label>Senha:</label>
      <b-row>
        <b-form-input v-model="user.password" type="password" placeholder="Insira sua senha" label="Senha" :disabled="loading"></b-form-input>
      </b-row>
      <b-row>
        <a class="forget-password" @click="forgotPassword()">Esqueci minha senha</a>
      </b-row>
        <b-button variant="btn btn-primary" v-on:click="signIn()">Entrar</b-button>
      </div>
      <div v-else>
        <div style="text-align: center; margin-bottom: 20px">
          <strong>Esqueceu a senha?</strong>
        </div>

          <label>Informe seu login</label>
        <b-form-input v-model="email" type="email" placeholder="exemplo@colegiovisaorecife.com.br" label="Email" :disabled="loading"></b-form-input>

        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <button class="btn btn-success" @click="confirmResetPassword()">Redefinir</button>
            </div>
            <div class="col-md-6">
              <button class="btn btn-danger" @click="forgot = false">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../helpers/generalConfig';

  export default {
    data() {
      return {
        email: undefined,
        loading: true,
        forgot: false,
        user: {
          email: undefined,
          password: undefined,
        },
      };
    },
    created() {
      window.document.title = 'Trilhas Visão';
      this.forgot = false;
      this.loading = false;
    },
    methods: {
      forgotPassword() {
        this.forgot = true;
      },
      signIn() {
        if (!this.user.email || !this.user.email.includes("@colegiovisaorecife.com.br")) {
          this.error('Informe um email válido')
          return;
        }
        if (!this.user.password) {
          this.error('Senha incorreta')
          return;
        }
        // TODO - descomentar e deixar compatível com api
        // this.$api()
        //   .post(`${config.jsonServer}/api/user/signin`, this.user)
        //   .then((response) => {
        //     const user = response.data.user;
        //     const token = response.data.token;
        //     this.$store.dispatch('auth/setUser', user);
        //     this.$store.dispatch('auth/setToken', token);
            this.$router.push({ name: 'home' });
          // })
          // .catch((err) => {
          //   this.error(err || 'Usuário não encontrado')
          // });
      },
      confirmResetPassword() {
        // TODO - descomentar e deixar compatível com api
          if (this.email && this.email.includes("@colegiovisaorecife.com.br")) {
          // this.$api()
          //   .post(`${config.jsonServer}/api/userToken/createToken`, { email: this.email })
          //   .then((response) => {
          //     this.$api()
          //       .get(`${config.jsonServer}/api/userToken/sendEmailForgetPassword?email=${this.email}&token=${response.data._id}`)
          //       .then(() => {
          //         this.forgot = false;
                  this.success('Foi enviado um e-mail para você com instruções para mudar a senha')
          //       })
          //       .catch((err) => {
          //         this.error(err || 'Erro ao enviar email')
          //       })
          //   })
          //   this.error('Erro na recuperação de senha')
        } else {
          this.warning('Informe um email válido')
        }
      }
    },
  };
</script>

<style scoped>
.center {
  margin: auto;
  width:50%;
  padding: 10px;
}
.centered-container {
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 100px;
  }
  .background {
    background-color: #4089e7;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .white-background {
    width: 35%;
    border-radius: 50px;
    padding-top: 40%;
    background-color: #ffffff;
    position: relative;
  }
  .forget-password {
    font-size: 15px;
    color: red;
    text-decoration: underline;
    text-decoration: red;
    cursor: pointer;
  }
  .logo{
    width:200px;
    position: relative;
    top: -670px;
  }
</style>
