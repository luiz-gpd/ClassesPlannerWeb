<template>
  <div>
    <br />
    <br />
    <div> <h1>Meu Perfil</h1> </div>
    <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <b-form-group id="input-group-n" label="Usuário:" label-for="nome">
              <b-form-input
                id="nome"
                v-model="user.name"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group id="input-group-n" label="Email:" label-for="email">
              <b-form-input
                id="email"
                v-model="user.email"
                disabled
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-button variant="primary" v-on:click="openPasswordModal()" >ALTERAR SENHA</b-button>
          </div>
          <div class="col-md-6">
            <b-button variant="primary" v-on:click="saveChanges()" >SALVAR</b-button>
            <b-button variant="danger" class="ml-2" @click="this.$router.push(`/home`)"> CANCELAR</b-button>
          </div>
        </div>
    </div>
    <b-modal id="change-password"
      title="Selecionar Habilidades"
      @ok="changePassword()"
      ok-title="Salvar nova senha"
      cancel-title="Cancelar">
        <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Senha Atual"
          label-for="password-input"
          invalid-feedback="A senha é exigida"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="password"
            :state="nameState"
          type="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Nova Senha"
          label-for="password-input"
          invalid-feedback="Preencha todos os campos"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="newPassword"
            :state="nameState"
          type="password"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedUser: undefined,
      user: undefined,
      newPassword: '',
      password: '',
    };
  },
  async created() {
    this.loggedUser = this.$store.getters["auth/user"];
    console.log(this.loggedUser);
    this.user = {
        name: this.loggedUser.name,
        email: this.loggedUser.email,
    }
  },
  methods: {
      async saveChanges() {
          await this.$api()
            .put(`users`, this.user)
            .then((response) => {
                this.success('Usuário salvo!')
                console.log(response)
            })
            .catch((e) => {
                console.log(e);
                this.error('Erro ao salvar alterações')
            })
      },
      openPasswordModal() {
        this.$bvModal.show("change-password");
      },
      async changePassword() {
        if (!this.password) {
            this.error("Insira a senha atual");
            return;
        }
        if (!this.newPassword.length < 8) {
            this.error("Sua senha deve ter pelo menos 8 caracteres");
            return;
        }
         await this.$api()
            .put(`users`, { password: this.newPassword })
            .then((response) => {
                this.success('Nova senha salva!')
                console.log(response)
            })
            .catch((e) => {
                console.log(e);
                this.error('Erro ao salvar nova senha')
            })
      },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Klainy&display=swap");
h1 {
  font-family: graphit;
  font-weight: bold;
  color: #4089e7;
}
.tables {
  cursor: pointer;
  margin-left: 30px;
  float: left;
  display: flex;
}
.center {
  margin: auto;
}
.plus-btn {
  display: block;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: 1px solid #000f63;
  background-color: #000f63;
  cursor: pointer;
  align-items: center;
  float: right;
  margin-right: 10%;
}
.vertical-block {
  display: block;
  top: 7px;
  height: 52px;
  width: 15px;
  border-radius: 5%;
  background-color: white;
  margin: auto;
  position: relative;
}
.horizontal-block {
  display: block;
  top: -25px;
  left: 8px;
  height: 15px;
  width: 52px;
  border-radius: 5%;
  background-color: white;
  position: relative;
}
</style>
