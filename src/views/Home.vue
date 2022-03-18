<template>
  <div>
    <br />
    <br />
    <div v-if="!selectedTrack">
      <b-row>
        <b-col>
          <h1>Olá {{ loggedUser.exibitionName }}!</h1>
        </b-col>
        <b-col>
          <b-form-group id="input-group-2" label="Buscar Trilha:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="trackName"
          placeholder="Buscar Trilha"
          required
        ></b-form-input>
      </b-form-group>
        </b-col>
        <b-col>
          <b-popover
            target="createTrack"
            triggers="hover"
            variant="light"
            placement="left"
          >
            Criar Nova Trilha
          </b-popover>
          <div
            v-if="loggedUser.profile === 1"
            class="plus-btn"
            @click="createTrack()"
            id="createTrack"
          >
            <div class="vertical-block"></div>
            <div class="horizontal-block"></div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <div>
          <div v-for="(track, index) in tracks" :key="index" class="center">
            <b-card
              no-body
              @click="seeTrack(track)"
              style="width: 16rem"
              :class="`mr-4 mt-4 tables`"
              :header="track.name"
              :border-variant="colors[index % 7]"
              :header-bg-variant="colors[index % 7]"
              :header-text-variant="colors[index] === 'light' ? '' : 'white'"
            >
              <b-list-group>
                <b-list-group-item
                  ><b-icon icon="award" :variant="colors[index % 7]" />
                  {{ track.turma }}
                </b-list-group-item>
                <b-list-group-item
                  ><b-icon
                    icon="file-earmark-richtext"
                    :variant="colors[index % 7]"
                  />
                  {{ track.disciplina }}
                </b-list-group-item>
                <b-list-group-item
                  ><b-icon icon="person-fill" :variant="colors[index % 7]" />
                  {{ track.creator.name }}
                </b-list-group-item>
                <b-list-group-item
                  ><b-icon icon="calendar3" :variant="colors[index % 7]" />
                  {{ track.createdAt }}
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </div>
        </div>
      </b-row>
      <b-row class="mt-4 center">
        <b-pagination
          v-model="currentPage"
          :total-rows="16"
          :per-page="12"
          aria-controls="my-table"
        ></b-pagination>
      </b-row>
    </div>
    <div v-else>
      <TrackDetails
        :loggedUser="loggedUser"
        :selectedTrack="selectedTrack"
      ></TrackDetails>
      <b-button v-on:click="selectedTrack = undefined">Voltar</b-button>
      <b-button
        class="ml-2"
        v-if="loggedUser.profile === 1"
        v-on:click="editTrack()"
        >Editar Trilha</b-button
      >
      <b-button class="ml-2" v-on:click="openDialog()">Baixar Trilha</b-button>
    </div>
    <v-dialog />
  </div>
</template>

<script>
import TrackDetails from "./TracksDetails.vue";

export default {
  components: {
    TrackDetails,
  },
  data() {
    return {
      trackName: '',
      currentPage: 1,
      loggedUser: undefined,
      tracks: [],
      selectedTrack: undefined,
      // TODO - ADICIONAR, EM TODAS AS TELAS QUE PRECISEM, A PARTE DE LOADING
      loading: false,
      colors: [
        "info",
        "danger",
        "secondary",
        "warning",
        "success",
        "dark",
        "light",
      ],
    };
  },
  async created() {
    this.loggedUser = this.$store.getters["auth/user"];
    await this.getTracks(1);
  },
  methods: {
    async getTracks(page, keyword) {
      // TODO - descomentar e deixar compatível com api
      const url = keyword ? `home/tracks?page=${page}&keyword=${keyword}` : `home/tracks?page=${page}`
      console.log(url);
      await this.$api()
        .get(url)
        .then((response) => {
          this.tracks = response.data;
        })
        .catch((e) => {
          console.log(e);
          this.error("Erro ao encontrar trilhas existentes");
        });
    },
    createTrack() {
      this.$router.push(`/track/0`);
    },
    seeTrack(track) {
      this.selectedTrack = track;
    },
    editTrack() {
      this.$router.push(`track/${this.selectedTrack._id}`);
    },
    openDialog() {
      this.$modal.show("dialog", {
        title: "Download de Trilha  ",
        text: `Selecione qual formato você deseja baixar a trilha <b>${this.selectedTrack.name}</b>?`,
        buttons: [
          {
            title: "Relatório(.xls)",
            default: false, // Will be triggered by default if 'Enter' pressed.
            handler: async () => {
              await this.$api()
                .get(`tracks/only/report/${this.selectedTrack._id}`)
                .then((response) => {
                  const blob = new Blob([response.data], { type: 'application/excel' });
                  const link = document.createElement('a');
                  link.href = window.URL.createObjectURL(blob);
                  link.download = 'Relatório.xls';
                  link.click();
                })
                .catch((e) => {
                  console.log(e);
                  this.error("Erro ao encontrar a trilha selecionada");
                });
            },
          },
          {
            title: "Imagem(.png)",
          },
        ],
      });
    },
  },
  watch: {
    currentPage: {
      handler: function (val) {
        this.getTracks(val);
      },
    },
    trackName: {
      handler: function (val) {
        console.log('entrou')
        this.getTracks(1, val)
      },
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
