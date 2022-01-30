<template>
  <div>
    <div v-if="!selectedTrack">
    <h1>Olá {{ loggedUser.name }}</h1>
    <div v-for="(track, index) in tracks" :key="index" @click="seeTrack(track)">{{ track.name }} - {{ track.turma }} - {{ track.disciplina }} - {{ track.creator.name}}</div>
    <button v-if="loggedUser.profile === 1" @click="createTrack">Criar Nova trilha</button>
    </div>
    <div v-else>
      <TrackDetails :loggedUser="loggedUser" :selectedTrack="selectedTrack"></TrackDetails>
      <b-button v-on:click="selectedTrack=undefined" >Voltar</b-button>
    </div>
  </div>
</template>

<script>
  import config from '../helpers/generalConfig';
  import TrackDetails from './TracksDetails.vue';

  export default {
    components: {
      TrackDetails,
    },
    data() {
      return {
        // TODO - remover exemplo
        loggedUser: {
          name: 'Luiz Pompílio',
          profile: 1,
        },
        // TODO - remover exemplo
        tracks: [
          {
            name: 'Teste 1',
            turma: '5º ano',
            disciplina: 'Matemática',
            objectives: 'Desenvolver Lógica',
            associatedHabilities: 'Nenhuma',
            activities: [{
              type: 'vídeo',
              description: 'um vídeo super legal e atrativo'
            },{
              type: 'seminário',
              description: 'fazendo os alunos trabalharem'
            }],
            observation: '',
            creator: {
              name: 'Tio Rico'
            }
          },
          {
            name: 'Teste 2',
            turma: '5º ano',
            disciplina: 'Matemática',
            objectives: 'Educação Financeira',
            creator: {
              name: 'Luiz Gustavo'
            }
          }
        ],
        selectedTrack: undefined,
        // TODO - ADICIONAR, EM TODAS AS TELAS QUE PRECISEM, A PARTE DE LOADING
        loading: false,
      };
    },
    async created() {
      // TODO - descomentar e deixar compatível com api
        // await this.$api()
        //   .get(`${config.jsonServer}/api/user/byEmail`, {
        //     params: { email: this.$store.getters['auth/user'].Email },
        //   })
        //   .then((response) => {
        //     this.loggedUser = response.data;
        //   });
      await this.getTracks();
    },
    methods: {
      async getTracks() {
        // TODO - descomentar e deixar compatível com api
        // await this.$api()
        //   .get(`${config.jsonServer}/api/tracks/byUser/${this.loggedUser._id}`)
        //   .then((response) => {
        //     this.tracks = response.data;
        //   })
        //   .catch(() => {
        //     this.error('Erro ao encontrar trilhas existentes')
        //   });
      },
      createTrack() {
        this.$router.push({ name: `trilha/0` });
      },
      seeTrack(track) {
        this.selectedTrack = track;
      },
    },
  };
</script>

<style scoped></style>
