<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <div class="col-md-12">
      <div class="row">
      <div class="col-md-6">
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="newActivity.description"
          placeholder="Descrição"
          required
        ></b-form-input>
      </b-form-group>

      </div>
      <div class="col-md-6">
      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="newActivity.type"
          :options="options"
          required
        ></b-form-select>
      </b-form-group>
      </div>
      </div>
      </div>

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

      <b-button type="submit" variant="primary">Salvar</b-button>
      <b-button type="reset" variant="danger">Limpar</b-button>
    </b-form>
    <br/>
    <b-table class="tablez" striped head-variant="dark" bordered hover: :items="selectedTrack.activities"></b-table>
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
          } else {
            await this.$api()
          .get(`tracks/${this.$router.app._route.params.trackId}`)
          .then((response) => {
              this.selectedTrack = response.data;
              this.organizeTable();
          })
          .catch(() => {
              this.error('Erro ao encontrar trilha')
          });
        }
      },
      async onSubmit() {
        this.selectedTrack.activities.push(this.newActivity);
        if (this.isCreate) {
          await this.$api()
          .post(`tracks`, this.selectedTrack)
          .then((response) => {
              this.selectedTrack = response.data;
              this.organizeTable();
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
          })
          .catch(() => {
              this.error('Erro ao encontrar trilha')
          });
        }
      },
      async onReset() {

      },
      organizeTable() {
        const data = []
        this.selectedTrack.activities.map((e, index) => {
          data.push({
            passo: index,
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
