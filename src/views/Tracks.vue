<template>
  <div>
    <b-button class="m-4" @click="openPastTrackModal()">REUTILIZAR TRILHA EXISTENTE</b-button>
    <b-form>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <b-form-group id="input-group-n" label="Nome da Trilha:" label-for="nome">
              <b-form-input
                id="nome"
                v-model="selectedTrack.name"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-3"></div>
          </div>
        </div>
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-3">
      <b-form-group id="input-group-3" label="Segmento:" label-for="segmento">
        <b-form-select
          id="segmento"
          v-model="selectedTrack.segmento"
          :options="optionsSeg"
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
          :disabled="!selectedTrack.segmento"
        ></b-form-select>
      </b-form-group>
      </div>
      <div class="col-md-3">
      <b-form-group id="input-group-3" label="Duração da trilha:" label-for="objectives">
        <b-form-input
          type="number"
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
    
    <b-card bg-variant="secondary" title="Nova atividade" text-variant="white">
    <b-form>
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-6">
      <b-form-group id="input-group-3" label="Etapa:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="newActivity.steps"
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
          placeholder="..."
          required
        ></b-form-input>
      </b-form-group>
      </div>
      </div>
      </div>
      <b-button type="button" @click="onSubmit()" variant="primary">Adicionar atividade</b-button>
      <b-button type="button" @click="onReset()" class='ml-2' variant="danger">Limpar</b-button>
    </b-form>
    </b-card>
    <br/>
    <br/>
    <b-table class="tablez" :key="tableKey" striped head-variant="dark" bordered hover: :items="tableData ? tableData : []" :fields="fields" >
      <template #cell(acoes)="data">
        <b-icon @click="editAction(data)" icon="pencil-fill" class="mr-2 ml-2 actions-on-table"/>
        <b-icon @click="excludeAction(data)" icon="trash" class="ml-2 actions-on-table"/>
      </template>
    </b-table>
    <br/>
      <b-button block type="submit" @click="save()" variant="primary">Salvar</b-button>
    <br/>
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
      fields: ["passo", "etapa", { key:"descricao", label: "Descrição" }, { key: "acoes", label: "Ações" }],
      habTemas: null,
      temaHab: null,
      tableKey: 0,
      items: [],
      pastTrack: undefined,
      pastTracks: undefined,
      associatedHabilities: undefined,
      treatedAssociatedHabilities: undefined,
      loggedUser: undefined,
      newActivity: {
        steps: "",
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
          etapa: e.steps,
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
        .then(async (response) => {
           await this.$api()
          .get(`users/${this.loggedUser._id}`)
          .then((result) => {
            this.optionsSeg = [result.data[0].segmento];
            this.optionsDisc = result.data[0].disciplinas.length>0 ? result.data[0].disciplinas : response.data.disciplinas;
            this.optionsTurma = result.data[0].turmas;
          })
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
        if(!this.selectedTrack.turma) {
          this.error("O campo série é obrigatório");
          return;
        }
        if(!this.selectedTrack.disciplina) {
          this.error("O campo disciplina é obrigatório");
          return;
        }
        if (this.isCreate) {
          await this.$api()
            .post(`tracks`, this.selectedTrack)
            .then((response) => {
              this.selectedTrack = response.data;
              this.organizeTable();
              this.success(`Nova trilha salva com sucesso`);
            })
            .catch((e) => {
              console.log(e);
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
              console.log(e);
              this.error("Erro ao encontrar trilha");
            });
        }
      } catch (e) {
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
          this.error("Não há habilidades para essa turma e disciplina");
        });
    },
    onSubmit() {
      this.selectedTrack.activities.push({
        steps: this.newActivity.steps,
        description: this.newActivity.description,
        index: this.selectedTrack.activities.length,
      });
      this.organizeTable();
      this.newActivity = {
        steps: "",
        description: "",
      };
    },
    excludeAction(row) {
      this.tableData.splice(row.index, 1);
      this.selectedTrack.activities.splice(row.index, 1);
      this.tableKey++;
    },
    editAction(row) {
      this.newActivity.steps = this.tableData[row.index].etapa;
      this.newActivity.description = this.tableData[row.index].descricao;
      this.excludeAction(row);
    },
    onReset() {
      this.newActivity = {
        steps: "",
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
  },
};
</script>

<style scoped>
.tablez {
  border-radius: 10%;
}
.actions-on-table {
  cursor: pointer;
}
</style>
