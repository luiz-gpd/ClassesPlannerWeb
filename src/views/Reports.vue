<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light">
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav>
          <b-nav-form>
            <b-row>
              <b-col class="m-4">
                <b-row>Turmas:</b-row>
                <b-row>
                  <b-form-select
                    size="sm"
                    class="w-100 border-top-0 border-right-0 border-left-0"
                    v-model="filters.turma"
                    :options="turmaOptions"
                  ></b-form-select>
                </b-row>
                <b-row class="mt-2">Período:</b-row>
                <b-row>
                  De:
                  <b-form-datepicker id="dateFrom" v-model="filters.dateFrom"></b-form-datepicker>
                  Até:>
                  <b-form-datepicker
                    id="dateUntil"
                    v-model="filters.dateUntil"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  ></b-form-datepicker>
                </b-row>
                <b-row>Disciplinas:</b-row>
                <b-row>
                  <b-form-select
                    class="w-100 border-top-0 border-right-0 border-left-0"
                    size="sm"
                    multiple
                    :select-size="1"
                    v-model="filters.disciplinas"
                    :options="disciplinasOptions"
                  ></b-form-select>
                </b-row>
              </b-col>
              <b-col class="m-4">
                <!-- Tem de ser visto como vai ser feito esse: -->
                <b-row class="mt-2">Professor Responsável:</b-row>
                <b-row>
                  <v-select
                    class="select-modal"
                    v-model="filters.teachers"
                    :options="this.teachersList"
                    label="nomeLimpo"
                    placeholder="Digite o nome do colaborador"
                  >
                    <!-- :onChange="this.tratarStringDupla()" -->
                    <option :value="null" disabled>Selecione o professor responsável</option>
                    <span slot="no-options" id="respostaBuscaColaborador" name="respostaBuscaColaborador">Professor não encontrado!</span>
                    <template slot="option" slot-scope="option">
                      {{ option.title }}
                    </template>
                  </v-select>
                </b-row>
              </b-col>
              <!-- <b-col class="m-4">
                <b-row class="mt-2">Valor da Empresa:</b-row>
                <div>
                  <b-col>
                    <b-row v-for="(value, index) in valuesList1" :key="value.name">
                      <b-form-checkbox
                        :id="`checkbox-${value.id}`"
                        v-model="isValueChecked[index]"
                        :name="`checkbox-${value.id}`"
                        value="checked"
                        unchecked-value="not-checked"
                        >{{ value.name.toUpperCase() }}</b-form-checkbox
                      >
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row v-for="(value, index) in valuesList2" :key="value.name">
                      <b-form-checkbox
                        :id="`checkbox-${value.id}`"
                        :v-model="isValueChecked[index + valuesList1.length]"
                        :name="`checkbox-${value.id}`"
                        value="checked"
                        unchecked-value="not-checked"
                        >{{ value.name.toUpperCase() }}</b-form-checkbox
                      >
                    </b-row>
                    <b-row></b-row>
                    <b-row></b-row>
                  </b-col>
                </div>
              </b-col> -->
              <b-col class="m-4">
                <b-row>
                  <b-col class="text-right">
                    <b-button @click="makeExcel()" class="btn btn-success">Gerar Relatório</b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import config from '../helpers/generalConfig';

  export default {
    data() {
      return {
        // TODO - remover exemplo
        loggedUser: {
          name: 'Luiz Pompílio',
          profile: 2,
        },
        filters: {
            turma: '',
            dateFrom: undefined,
            dateUntil: undefined,
            disciplinas: '',
            teachers: [],
        },
        loading: false,
        turmaOptions: [],
        disciplinasOptions: [],
        teachersList: [],
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
        // if(this.loggedUser.profile !== 2) {
        //     this.error('Página acessível apenas m=para coordenadores')
        //     this.$router.push({ name: 'login'})
        // }
        // await getTeachers();
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
      getTeachers() {
        // TODO - Deixar compatível com api
      },
      makeExcel() {
        // TODO - Deixar compatível com api
      },
    },
  };
</script>

<style scoped></style>
