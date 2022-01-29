<template>
  <div>
    <b-tabs pills lazy>
        <b-tab active>
            <template v-slot:title><em class="ni ni-cloud-upload-96 mr-2"></em> Visualizar Trilha</template>
            <CreateEdit :loggedUser="loggedUser" :isCreate="isCreate" :selectedTrack="selectedTrack"></CreateEdit>
        </b-tab>
        <b-tab v-if="selectedTrack">
            <template v-slot:title><em class="ni ni-cloud-upload-96 mr-2"></em> Visualizar Trilha</template>
            <TrackDetails :loggedUser="loggedUser" :selectedTrack="selectedTrack"></TrackDetails>
        </b-tab>
  </div>
</template>

<script>
  import config from '../helpers/generalConfig';
  import TrackDetails from './TrackDetails.vue'
  import CreateEdit from './CreateEdit.vue'

  export default {
      components: {
          TrackDetails,
          CreateEdit,
      },
    data() {
      return {
        loggedUser: undefined,
        selectedTrack: undefined,
        loading: false,
        isCreate: false,
      };
    },
    async created() {
      await this.carregarUsuario().then((response) => {
        this.loggedUser = response || {};
      });
      //   await this.$api()
      //     .get(`${config.jsonServer}/api/user/byEmail`, {
      //       params: { email: this.$store.getters['auth/user'].Email },
      //     })
      //     .then((response) => {
      //       this.usuarioLogado = response.data;
      //     });
      await this.getTrack();
    },
    methods: {
      async getTrack() {
          if (this.$router.app._route.params.trackId === '0') {
              this.isCreate = true;
          } else {
            await this.$api()
          .get(`${config.jsonServer}/api/track/one/${this.$router.app._route.params.trackId}`)
          .then((response) => {
              this.selectedTrack = response.data;
          })
          .catch(() => {
              // MENSAGEM 'Erro ao encontrar trilhas existentes'
          });
        }
      },
      async carregarUsuario() {
        return new Promise((resolve, reject) => {
          const user = this.$store.getters['auth/user'];
          this.$api()
            .get(`${config.jsonServer}/api/user/byEmail?email=${user.Email}`)
            .then((response) => resolve(response.data))
            .catch(() => {
              this.error('Erro ao consultar usuário logado.');
              this.$store.dispatch('auth/setUser', undefined);
              this.$store.dispatch('auth/setToken', undefined);
              this.$router.push({ name: 'login' });
              reject();
            });
        });
      },
    },
  };
</script>

<style scoped></style>
