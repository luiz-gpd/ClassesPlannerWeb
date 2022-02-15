<template>
  <div class="background">
  <div class="centered-container">
    <div class="white-background">
      <b-row>
      <img class="logo center" src="../assets/logoVisao.png" alt="Logo Colégio Visão" />
      </b-row>
        <br/>
        <br/>
      
      <div v-if="!forgot" class="inputs center">
      <b-row>
        <label>Email:</label>
        <b-form-input :state="isValidEmail" v-model="user.email" @change="validateEmail()" type="email" placeholder="exemplo@colegiovisaorecife.com.br" :disabled="loading"></b-form-input>
        <p v-if="isValidEmail === false" class="under-input">O email deve pertencer ao domínio do colégio visão</p>
      </b-row>
        <br/>
        <br/>
      <b-row>
        <label>Senha:</label>
        <b-form-input :state="isValidPassword" @change="validatePassword()" v-model="user.password" type="password" placeholder="Insira sua senha" label="Senha" :disabled="loading"></b-form-input>
        <p v-if="isValidPassword === false" class="under-input">Informe a senha</p>
      </b-row>
        <br/>
        <br/>
      <b-row>
        <b-col lg='8'>
        <a class="forget-password" @click="forgotPassword()">Esqueci minha senha</a>
        </b-col>
        <b-col lg='4'>
        <b-button variant="btn btn-primary" v-on:click="signIn()">Entrar</b-button>
        </b-col>
      </b-row>
      </div>
      <div v-else>
        <div style="text-align: center; margin-bottom: 20px" class="center-on-block inputs">
          <strong>Esqueceu a senha?</strong>
        </div>
        <div class="inputs center">
          <label>Informe seu login:</label>
          <br/>
          <br/>
          <b-form-input v-model="email" type="email" placeholder="exemplo@colegiovisaorecife.com.br" label="Email" :disabled="loading"></b-form-input>
          <br/>
          <div>
            <b-row>
              <b-col lg="6" class="pl-4">
                <button class="btn btn-success" @click="confirmResetPassword()">Gerar nova senha</button>
              </b-col>
              <b-col lg="6" class="pl-4">
                <button class="btn btn-danger" @click="forgot = false">Cancelar</button>
              </b-col>
            </b-row>
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
        isValidEmail: null,
        isValidPassword: null,
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
      async signIn() {
        if (!this.user.email || !this.user.email.includes("@colegiovisaorecife.com.br")) {
          this.error('Informe um email válido')
          return;
        }
          this.isValidEmail = null;
        if (!this.user.password) {
          this.error('Senha incorreta')
          return;
        }
        this.$api()
        // TODO aqui deveria ser a rota de login, mas tô recebendo badRequest
          .get(`${config.jsonServer}/users`)
          .then((response) => {
            console.log(response);
            // const user = response.data.user;
            const user = response.data[1];
            // const token = response.data.token;
            this.$store.dispatch('auth/setUser', user);
            // this.$store.dispatch('auth/setToken', token);
            this.$router.push({ name: 'home' });
          })
          .catch((error) => {
            console.log(error)
            console.log(error.response)
            console.log(error.request)
            console.log(error.message)
            this.error(error || 'Usuário não encontrado')
          });
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
      },
      validateEmail() {
        if(!this.user.email || !this.user.email.includes("@colegiovisaorecife.com.br")) {
          this.isValidEmail = false;
        } else {
          this.isValidEmail = null;
        }
      },
      validatePassword() {
        if(!this.user.password) {
          this.isValidPassword = false;
        } else {
          this.isValidPassword = null;
        }
      }
    },
  };
</script>

<style scoped>
.center {
  margin: auto;
}
.center-on-block {
  margin: auto;
  position:absolute;
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
    width: 500px;
    border-radius: 50px;
    padding-top: 166px;
    background-color: #ffffff;
    position: relative;
  }
  .forget-password {
    font-size: 15px;
    color: red;
    text-decoration: underline;
    cursor: pointer;
  }
  .under-input {
    color:red;
    font-size: 13px;
  }
  .logo{
    width:200px;
    position: relative;
    top: -150px
  }
  .inputs {
    position: relative;
    top: -130px;
    max-width: 360px;
  }
</style>
