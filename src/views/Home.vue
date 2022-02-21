<template>
   <div>
    <br/>
    <br/>
    <div v-if="!selectedTrack">
      <b-row>
      <b-col>
    <h1>Olá {{ loggedUser.exibitionName }}!</h1>
      </b-col>
      <b-col>
    <b-popover target="createTrack" triggers="hover" variant="light" placement="left">
            Criar Nova Trilha
          </b-popover>
          <div class="plus-btn" @click="createTrack()" id="createTrack">
            <div class="vertical-block"></div>
            <div class="horizontal-block"></div>
          </div>
      </b-col>
      </b-row>
    <div v-for="(track, index) in tracks" :key="index" class="center">
    <b-card no-body @click="seeTrack(track)" style="width: 16rem;" :class="`mr-4 mt-4 tables`"
    :header="track.name" :border-variant="colors[index%7]" :header-bg-variant="colors[index%7]" :header-text-variant="colors[index] === 'light'? '' : 'white'">
    <b-list-group>
      <b-list-group-item><b-icon icon="award" :variant="colors[index%7]"/> {{ track.turma }} </b-list-group-item>
      <b-list-group-item><b-icon icon="file-earmark-richtext" :variant="colors[index%7]"/> {{ track.disciplina }} </b-list-group-item>
      <b-list-group-item><b-icon icon="person-fill" :variant="colors[index%7]"/> {{ track.creator.name}} </b-list-group-item>
      <b-list-group-item><b-icon icon="calendar3" :variant="colors[index%7]"/> {{ track.createdAt}} </b-list-group-item>
    </b-list-group>
    </b-card>
    </div>
    </div>
    <div v-else>
      <TrackDetails :loggedUser="loggedUser" :selectedTrack="selectedTrack"></TrackDetails>
      <b-button v-on:click="selectedTrack=undefined" >Voltar</b-button>
    </div>
  </div> 
</template>

<script>
  import TrackDetails from './TracksDetails.vue';

  export default {
    components: {
      TrackDetails,
    },
    data() {
      return {
        loggedUser: undefined,
        tracks: [],
        selectedTrack: undefined,
        // TODO - ADICIONAR, EM TODAS AS TELAS QUE PRECISEM, A PARTE DE LOADING
        loading: false,
        colors: ['info', 'danger', 'secondary', 'warning', 'success', 'dark', 'light']
      };
    },
    async created() {
      this.loggedUser = this.$store.getters['auth/user'];
      await this.getTracks();
    },
    methods: {
      async getTracks() {
        // TODO - descomentar e deixar compatível com api
        await this.$api()
          .get(`tracks/filter/${this.loggedUser._id}`)
          .then((response) => {
            this.tracks = response.data;
          })
          .catch((e) => {
            console.log(e);
            this.error('Erro ao encontrar trilhas existentes')
          });
      },
      createTrack() {
        this.$router.push(`/track/0`);
      },
      seeTrack(track) {
        this.selectedTrack = track;
      },
    },
  };
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Klainy&display=swap');
h1 {
  font-family: graphit;
  font-weight: bold;
  color: #4089e7;
}
.tables {
  cursor:pointer;
  margin-left: 30px;
  float: left;
  display: flex;
}
.center {
  margin: auto;
}
.plus-btn {
  display:block;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: 1px solid #000F63;
  background-color: #000F63;
  cursor: pointer;
  align-items: center;
  float: right;
  margin-right: 10%;
}
.vertical-block {
  display:block;
  top: 7px;
  height: 52px;
  width: 15px;
  border-radius: 5%;
  background-color: white;
  margin: auto;
  position:relative;
}
.horizontal-block {
  display:block;
  top: -25px;
  left: 8px;
  height: 15px;
  width: 52px;
  border-radius: 5%;
  background-color: white;
  position:relative;
}

</style>
