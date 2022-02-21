<template>
  <div>
    <b-form>
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-3">
      <b-form-group id="input-group-3" label="Segmento:" label-for="segmento">
        <b-form-select
          id="segmento"
          v-model="selectedTrack.segmento"
          :options="options"
          required
        ></b-form-select>
      </b-form-group>
      </div>
      <div class="col-md-3">
      <b-form-group id="input-group-3" label="Turma:" label-for="turma">
        <b-form-select
          id="turma"
          v-model="selectedTrack.turma"
          :options="options"
          required
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
      <b-form-group id="input-group-3" :label="`Habilidade Associadas: ${selectedTrack.associatedHabilities}`" label-for="associatedHabilities">
        <b-form-select
          id="associatedHabilities"
          v-model="selectedTrack.associatedHabilities"
          :options="options"
          required
          multiple
          :select-size="4"
        ></b-form-select>
      </b-form-group>
      </div>
      </div>
      </div>
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-12">
      <b-form-group id="input-group-2" label="Observação:" label-for="observation">
        <b-form-input
          id="observation"
          v-model="newActivity.observation"
          placeholder="Observação"
        ></b-form-input>
      </b-form-group>
      </div>
      </div>
      </div>
    </b-form>

    <br/>
    <br/>
    <br/>
    <br/>
    
    <b-form @reset="onReset">
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-6">
      <b-form-group id="input-group-3" label="Tipo:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="newActivity.type"
          :options="options"
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
      <b-button type="button" @click="onSubmit" variant="primary">Adicionar atividade</b-button>
      <b-button type="reset" class='ml-2' variant="danger">Limpar</b-button>
    </b-form>

      <!-- <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->

    <br/>
      <b-button type="submit" @click="save()" variant="primary">Salvar</b-button>
    <br/>
    <b-table class="tablez" striped head-variant="dark" bordered hover: :items="tableData"></b-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loggedUser: undefined,
        newActivity: {
          type: '',
          description: '',
        },
        selectedTrack: {
          turma : '',
          disciplina : '',
          objectives : '',
          associatedHabilities : [],
          tableData: [],
          activities : [
            {
              index: '0',
              type: '1',
              description: '2',
            },
            {
              index: '1',
              type: '3',
              description: '4',
            }
          ],
          observation : '',
        },
        options: ['1', '2', '3'],
        loading: false,
        isCreate: false,
      };
    },
    async created() {
      this.loggedUser = this.$store.getters['auth/user'];
      await this.getTrack();
    },
    methods: {
      async getTrack() {
          if (!this.$router.app._route.params.trackId || this.$router.app._route.params.trackId === '0') {
              this.isCreate = true;
              this.organizeTable();
          } else {
            console.log(`veio aqui`)
            await this.$api()
          .get(`tracks/${this.$router.app._route.params.trackId}`)
          .then((response) => {
            this.selectedTrack = response.data[0];
            console.log(this.selectedTrack)
              this.organizeTable();
          })
          .catch(() => {
              this.error('Erro ao encontrar trilha')
          });
        }
      },
      async save() {
        if (this.isCreate) {
          await this.$api()
          .post(`tracks`, this.selectedTrack)
          .then((response) => {
              this.selectedTrack = response.data;
              this.organizeTable();
              this.success(`Nova trilha salva com sucesso`)
          })
          .catch(() => {
            this.error('Erro ao encontrar trilha')
          });
        } else {
          await this.$api()
          .put(`tracks`, this.selectedTrack)
          .then((response) => {
            this.selectedTrack = response.data;
              this.organizeTable();
            this.success(`Alteracao realizada com sucesso`)
          })
          .catch(() => {
              this.error('Erro ao encontrar trilha')
          });
        }
      },
      onSubmit() {
        this.selectedTrack.activities.push({
          type: this.newActivity.type,
          description: this.newActivity.description,
          index: this.selectedTrack.activities.length,
        });
        this.organizeTable();
        this.newActivity = {
          type: '',
          description: '',
        };
      },
      onReset() {
        this.newActivity = {
          type: '',
          description: '',
        };
      },
      organizeTable() {
        const data = []
        this.selectedTrack.activities.map((e, index) => {
          data.push({
            passo: index+1,
            tipo: e.type,
            descricao: e.description
          });
        });
        this.tableData = data;
      }
    },
  };
</script>

<style scoped>
.tablez {
  border-radius: 10%;
}
</style>
