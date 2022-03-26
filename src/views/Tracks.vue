<template>
  <div>
    <b-button class="m-4" @click="openPastTrackModal()">REUTILIZAR TRILHA EXISTENTE</b-button>
    <b-form>
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-3">
      <b-form-group id="input-group-3" label="Segmento:" label-for="segmento">
        <b-form-select
          id="segmento"
          v-model="segmento"
          :options="optionsSeg"
          required
        ></b-form-select>
      </b-form-group>
      </div>
      <div class="col-md-3">
      <b-form-group id="input-group-3" label="Série/Ano:" label-for="turma">
        <b-form-select
          id="turma"
          v-model="selectedTrack.turma"
          :options="optionsTurma"
          required
          :disabled="!segmento"
        ></b-form-select>
      </b-form-group>
      </div>
      <div class="col-md-3">
      <b-form-group id="input-group-3" label="Objetivos:" label-for="objectives">
        <b-form-input
          id="objectives"
          v-model="selectedTrack.objectives"
          required
        ></b-form-input>
      </b-form-group>
      </div>
      <div class="col-md-3">
        <b-form-group id="input-group-3" label="Disciplina:" label-for="disciplina">
        <b-form-select
          id="disciplina"
          v-model="selectedTrack.disciplina"
          :options="optionsDisc"
          required
        ></b-form-select>
      </b-form-group>
      </div>
      </div>
      </div>
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-6">
      <b-form-group id="input-group-3" label="Metodologia:" label-for="metodologia">
        <b-form-select
          id="metodologia"
          v-model="selectedTrack.methodology"
          :options="optionsMethodology"
          required
        ></b-form-select>
      </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group id="input-group-3" label="Recurso:" label-for="recurso">
        <b-form-select
          id="recurso"
          v-model="selectedTrack.resource"
          :options="optionsResources"
          required
        ></b-form-select>
      </b-form-group>
      </div>
      </div>
      </div>
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-6">
      <b-form-group id="input-group-2" label="Observação:" label-for="observation">
        <b-form-input
          id="observation"
          v-model="newActivity.observation"
          placeholder="Observação"
        ></b-form-input>
      </b-form-group>
      </div>
      <div class="col-md-6">
      <label>Habilidades Associadas: </label>
      <b-input-group>
        <b-form-input readonly v-model="treatedAssociatedHabilities" ></b-form-input>
        <b-input-group-append>
        <b-button variant="outline-primary" @click="getAssociatedHab" :disabled="!selectedTrack.disciplina || !selectedTrack.turma">Adicionar Habilidades</b-button>
        </b-input-group-append>
      </b-input-group>
      </div>
      </div>
      </div>
    </b-form>

    <br/>
    <br/>
    <br/>
    <br/>
    
    <b-form>
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-6">
      <b-form-group id="input-group-3" label="Etapa:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="newActivity.step"
          :options="optionsStep"
          required
        ></b-form-select>
      </b-form-group>

      </div>
      <div class="col-md-6">
      <b-form-group id="input-group-2" label="Descrição:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="newActivity.description"
          placeholder="Descrição"
          required
        ></b-form-input>
      </b-form-group>
      </div>
      </div>
      </div>
      <b-button type="button" @click="onSubmit()" variant="primary">Adicionar atividade</b-button>
      <b-button type="button" @click="onReset()" class='ml-2' variant="danger">Limpar</b-button>
    </b-form>
    <br/>
      <b-button type="submit" @click="save()" variant="primary">Salvar</b-button>
    <br/>
    <b-table class="tablez" striped head-variant="dark" bordered hover: :items="tableData ? tableData : []"></b-table>
    <b-modal
      id="get-past-tracks"
      ref="modal"
      title="Selecione uma trilha"
      @ok="selectPastTrack()"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
        >
          <b-form-select
            id="name-input"
            v-model="pastTrack"
            :options="pastTracks"
            required
          ></b-form-select>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="get-hab"
      ref="modal"
      title="Selecionar Habilidades"
      @ok="selectPastTrack()"
      cancel-title="Cancelar"
    >
    <div class="col-md-12">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Unidade Temática"
          label-for="tema-hab"
        >
          <b-form-select
            id="tema-hab"
            v-model="temaHab"
            :options="optionsTema"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group id="multiple" :label="`Habilidades: ${selectedTrack.associatedHabilities}`" label-for="associatedHabilities1"  v-show="temaHab">
        <b-form-select
          id="associatedHabilities1"
          v-model="associatedHabilities"
          :options="optionsHab"
          required
          multiple
          :select-size="4"
        ></b-form-select>
      </b-form-group>
      </form>
    </div>
      <b-table striped hover :items="items"></b-table>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      segmento: undefined,
      habTemas: null,
      temaHab: null,
      items: [],
      pastTrack: undefined,
      pastTracks: undefined,
      associatedHabilities: undefined,
      treatedAssociatedHabilities: undefined,
      loggedUser: undefined,
      newActivity: {
        step: "",
        description: "",
      },
      selectedTrack: {
        turma: "",
        disciplina: "",
        objectives: "",
        associatedHabilities: [],
        tableData: [],
        activities: [],
        observation: "",
      },
      optionsSeg: [],
      optionsTurma: [],
      allTurmas: [],
      optionsResources: [],
      optionsMethodology: [],
      optionsDisc: [],
      optionsStep: [],
      optionsHab: [],
      optionsTema: [],
      loading: false,
      isCreate: false,
    };
  },
  async created() {
    this.loggedUser = this.$store.getters["auth/user"];
    await this.getTrack();
    await this.getOptions();
  },
  methods: {
    organizeTable() {
      const data = [];
      this.selectedTrack.activities.map((e, index) => {
        data.push({
          passo: index + 1,
          etapa: e.step,
          descricao: e.description,
        });
      });
      this.tableData = data;
    },
    async selectPastTrack() {
      if (this.pastTrack) {
        await this.$api()
          .get(`tracks/${this.pastTrack}`)
          .then((response) => {
            this.selectedTrack = response.data[0];
          })
          .catch((e) => {
            console.log(e);
            this.error("Erro ao encontrar a trilha selecionada");
          });
      }
    },
    async openPastTrackModal() {
      if (!this.pastTracks) {
        await this.$api()
          .get(`past/tracks`)
          .then((response) => {
            this.pastTracks = response.data.map((e) => {
              return {
                value: e._id,
                text: e.name,
              };
            });
          })
          .catch((e) => {
            console.log(e);
            this.error("Erro ao encontrar trilhas existentes");
          });
      }
      this.$bvModal.show("get-past-tracks");
    },
    async getTrack() {
      if (
        !this.$router.app._route.params.trackId ||
        this.$router.app._route.params.trackId === "0"
      ) {
        this.isCreate = true;
        this.organizeTable();
      } else {
        await this.$api()
          .get(`tracks/${this.$router.app._route.params.trackId}`)
          .then((response) => {
            this.selectedTrack = response.data[0];
            this.segmento = this.selectedTrack.segmento
            this.associatedHabilities = this.selectedTrack.associatedHabilities;
            this.organizeTable();
          })
          .catch(() => {
            this.error("Erro ao encontrar trilha");
          });
      }
    },
    async getOptions() {
      await this.$api()
        .get("users/defaults")
        .then((response) => {
          this.optionsSeg = response.data.segmentos;
          this.allTurmas = response.data.turmas;
          this.optionsDisc = response.data.disciplinas;
          this.optionsStep = response.data.steps;
          this.optionsMethodology = response.data.tipos;
          this.optionsResources = response.data.resources;
        })
        .catch((e) => {
          console.log(e);
          this.error("Erro ao encontrar opções");
        });
    },
    async save() {
      try {
        if (this.isCreate) {
          console.log(this.selectedTrack);
          await this.$api()
          .post(`tracks`, this.selectedTrack)
          .then((response) => {
            this.selectedTrack = response.data;
            this.organizeTable();
            this.success(`Nova trilha salva com sucesso`);
          })
          .catch((e) => {
            console.log(e)
            this.error("Erro ao encontrar trilha");
          });
      } else {
        await this.$api()
          .put(`tracks`, this.selectedTrack)
          .then((response) => {
            this.selectedTrack = response.data;
            this.organizeTable();
            this.success(`Alteracao realizada com sucesso`);
          })
          .catch((e) => {
            console.log(e)
            this.error("Erro ao encontrar trilha");
          });
      }
        } catch(e)  {
          this.error("Se deu mal");
          console.log(e);
        }
    },
    async getAssociatedHab() {
      await this.$api()
        .get(`subject/${this.selectedTrack.disciplina}`)
        .then((response) => {
          const temas = response.data.map((e) => {
            if (e.anos.includes(this.selectedTrack.turma)) {
              return e.unidadesTematicas;
            }
          });
          const newTemas = temas.filter((val) => {
            return val !== undefined;
          });
          this.optionsTema = newTemas[0].map((e) => {
            return e.tituloUnidade;
          });
          this.habTemas = newTemas[0];
          this.$bvModal.show("get-hab");
        })
        .catch((e) => {
          console.log(e);
          this.error("Erro ao encontrar opções");
        });
    },
    onSubmit() {
      this.selectedTrack.activities.push({
        step: this.newActivity.step,
        description: this.newActivity.description,
        index: this.selectedTrack.activities.length,
      });
      this.organizeTable();
      this.newActivity = {
        step: "",
        description: "",
      };
    },
    onReset() {
      this.newActivity = {
        step: "",
        description: "",
      };
    },
  },
  watch: {
    temaHab: {
      handler: function (val) {
        this.optionsHab = [];
        const result = this.habTemas.filter((e) => {
          return e.tituloUnidade === val;
        });
        this.items = result[0].habilidades.map((e) => {
          this.optionsHab.push(e.codigoHabilidade);
          return {
            codigo: e.codigoHabilidade,
            descricao: e.descricaoHabilidade,
          };
        });
      },
    },
    associatedHabilities: {
      handler: function (val) {
        this.selectedTrack.associatedHabilities = val;
        this.treatedAssociatedHabilities = val.toString();
      },
    },
    segmento: {
      handler: function (val) {
        this.selectedTrack.segmento = this.segmento;
        const all = this.allTurmas.map((e) => {return e});
        if(val === this.optionsSeg[0]) {
          all.splice(5,Number.MAX_VALUE);
        } else if(val === this.optionsSeg[1]) {
          all.splice(9,Number.MAX_VALUE);
          all.splice(0,5);
        } else if(val === this.optionsSeg[2]) {
          all.splice(13,Number.MAX_VALUE);
          all.splice(0,9);
        } else {
          all.splice(0,13);
        }
        this.optionsTurma = all;
      },
    },
  },
};
</script>

<style scoped>
.tablez {
  border-radius: 10%;
}
</style>
