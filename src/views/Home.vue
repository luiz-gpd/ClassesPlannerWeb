<template>
  <div>
    <div v-for="(track, index) in tracks" :key="index" @click="editTrack(track)">{{ track.name }} - {{ track.turma }} - {{ track.disciplina }}</div>
    <button @click="createTrack">Criar Nova trilha</button>
  </div>
</template>

<script>
  import config from '../helpers/generalConfig';

  export default {
    data() {
      return {
        loggedUser: undefined,
        tracks: [],
        loading: false,
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
      await this.getTracks();
    },
    methods: {
      async getTracks() {
        await this.$api()
          .get(`${config.jsonServer}/api/tracks/byUser/${this.loggedUser._id}`)
          .then((response) => {
            this.tracks = response.data;
          })
          .catch(() => {
            // MENSAGEM 'Erro ao encontrar trilhas existentes'
          });
      },
      createTrack() {
        this.$router.push({ name: `trilha/0` });
      },
      editTrack(track) {
        this.$router.push({ name: `trilha/${track._id}` });
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
