<template>
  <div>
    <div>
      <div class="navbar fixed-top p-0 navbar-adjustment">
        <div class="offset-lg-2 col-lg-1 col-sm-1 col-1 logo-topo">
          <a href="#" v-on:click="$router.go()">
            <img width="100%" src="../assets/logoVisao.png" alt="Logo Colégio Visão"/>
          </a>
        </div>
        <div class="col-md-2 col-1">
          <b-dropdown id="ddown1" text="Dados no template" class="m-md-2">
            <template slot="button-content">
              <span class="off-set-right-20"> {{ this.userName }}</span>
            </template>
            <b-dropdown-item v-on:click="$router.push('/meuPerfil')">Meu Perfil </b-dropdown-item>
            <b-dropdown-item v-if="usuarioLogado.profile === 4" v-on:click="$router.push('/admin')">Administração </b-dropdown-item>
            <b-dropdown-item v-if="usuarioLogado.profile === 2" v-on:click="$router.push('/reports')">Gerar Relatório </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item v-on:click="signOut" class>Sair</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import config from '../helpers/generalConfig';

  export default {
    name: 'user-profile-header',
    data() {
      return {
        userName: undefined,
          // TODO - remover exemplo
        usuarioLogado: {
          DisplayName: 'Luiz Pompílio',
          FirstName: 'Luiz',
          Email: 'luizgdiniz@colegiovisaorecife.com.br',
          profile: 1,
        },
      };
    },
    async created() {
      // TODO - descomentar e deixar compatível com api
      // await this.$api()
      //   .get(`${config.jsonServer}/api/user/byEmail`, {
      //     params: { email: this.$store.getters['auth/user'].Email },
      //   })
      //   .then((response) => {
      //     const user = response.data;
      //     this.usuarioLogado.DisplayName = user.nome;
      //     this.usuarioLogado.FirstName = user.nome.split(' ')[0];
      //     this.usuarioLogado.Email = user.email;
      //     this.usuarioLogado.company = user.company;
      //     this.usuarioLogado.profile = user.profile;
      //   });
      // this.userName = this.usuarioLogado.FirstName;
    },
    methods: {
      signOut() {
        this.logout(true);
        this.$router.push({ name: 'login' });
      },
    },
  };
</script>
<style scoped>
  @media (max-width: 900px) {
    .navbar .dropdown .dropdown-menu,
    .navbar .dropdown.show .dropdown-menu {
      background-color: white;
      color: white;
      border: 0;
      padding-bottom: 15px;
      -webkit-transition: none;
      transition: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      -webkit-transform: none !important;
      transform: none !important;
      width: auto;
      margin-bottom: 15px;
      margin-top: 52px;
      padding-top: 0;
      height: 100px;
      -webkit-animation: none;
      animation: none;
      opacity: 1;
      overflow-y: scroll;
    }
    .d-sm-block {
      display: flex;
    }
  }
  @media (max-width: 414px) {
    .btn.btn-fab.btn-round,
    .btn.btn-just-icon.btn-round {
      border-radius: 50%;
      position: relative;
      top: -54px;
      right: 2px;
    }
  }
  .select {
    width: 80%;
  }
  .select .dropdown-toggle:after {
    display: none;
  }
  .logo-topo img {
    max-width: 100%;
    padding: 10px;
  }
  .avatar-image img {
    height: 35px;
    width: 35px;
    border-radius: 20%;
    -o-object-fit: cover;
    object-fit: cover;
  }
</style>
<style>
  @media all and (max-width: 991px) {
    /* Correcting setting at material-dashboard.css, line 17987 */
    .navbar .dropdown .dropdown-menu,
    .navbar .dropdown.show .dropdown-menu {
      transform: translate3d(0, 56px, 0) !important;
      background-color: #fff !important;
      height: auto;
    }

    /* This corrects strange right shift of navbar on mobile */
    /* Investigate further and proper correct it */
    .navbar-adjustment {
      margin-left: -150px;
    }
  }

  [id*='__option']:hover {
    background-color: ghostwhite;
    box-shadow: 0 8px 8px -4px gainsboro;
  }

  [id*='__option'] {
    margin-bottom: 2%;
  }

  [role~='listbox'] {
    position: absolute;
    background-color: white;
    width: 100%;
    max-height: 10em;
    overflow: auto;
    padding-left: 1%;
    padding-right: 2%;
    box-shadow: #394066;
    box-shadow: 0 8px 8px -4px gainsboro;
  }

  [type~='search'] {
    width: 100%;
    border-style: solid;
    border-width: 1px;
    border-color: #dfe5fb;
    padding: 1% 1% 1% 1%;
  }
</style>
