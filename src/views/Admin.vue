<template>
  <div class="row row-offcanvas row-offcanvas-right off-set-padding-top-5">
    <notifications group="userAdmin" position="center" />
    <div class="container">
      <div class="row row-offcanvas row-offcanvas-right">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-2">
              <button
                id="btnCadastrarUsuario"
                type="button"
                class="btn btn-success"
                v-on:click="this.cadastrarUsuario"
              >
                Cadastrar Usuário <em class="fa fa-plus-circle"></em>
              </button>
            </div>
            <div style="margin-left: 30px" class="col-md-3">
              <button
                id="btnImportarUsuario"
                type="button"
                class="btn btn-primary"
              >
                <!-- v-on:click="this.importUserCsv" -->
                Importar Usuários <em class="fa fa-arrow-circle-up"></em>
              </button>
              <i
                v-b-tooltip.hover.v-light
                title="Realizar Dowload do CSV"
                id="tooltip-download"
                class="fa fa-download"
                aria-hidden="true"
                style="font-size: 20px; margin-left: 10px"
                v-b-modal.modal-download
              />
            </div>
            <b-modal id="modal-download" title="Formato CSV obrigatório" cancel-title="Cancelar">
              <ul>
                <li>Os valores precisam ser separados por vírgulas( , ) ou pontos e vírgulas( ; )</li>
                <li>As colunas devem ter os seguintes cabeçalhos. Valores: nome, nomeExibicao, email, localTrabalho</li>
                <li>A coluna "nomeExibição" não pode conter informações com mais de 35 caracteres (incluindo espaços).</li>
                <li class="red">
                  Caso esta posição tenha mais do que o número de 35 caracteres o sistema cadastrará apenas o primeiro e último nome
                </li>
                <li>O tamanho máximo do arquivo é 1 MB</li>
              </ul>
              <br />
              <h3>Exemplo de arquivo CSV</h3>
              <p>
                Você pode criar um arquivo CSV: Abrindo um arquivo do Excel, vá em "salvar como" e escolha o formato CSV; ou
                <br />
                abrindo um editor de texto simples (como o bloco de notas) e colocando cabeçalhos na primeira linha (onde <br />
                você separa os valores com uma vírgula) e listando os valores em novas linhas.
              </p>
              <br />
              <download-csv :data="json_data" name="user-planner-visao.csv">
                <!-- Altera o exemplo por Aqui!! -->
                <a href="javascript:void(0);" target="_self"
                  >Baixar arquivo CSV de exemplo <em id="tooltip-download" class="fa fa-download" aria-hidden="true"
                /></a>
              </download-csv>
            </b-modal>
            <div style="margin-left: 40px" class="col-md-6">
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <strong>Pesquisar usuários:</strong>
                    <div class="input-group mb-3">
                      <b-form-input
                        type="text"
                        v-model="keyword"
                        placeholder="Informe nome ou e-mail"
                        @keydown.enter="loadUsers()"
                      ></b-form-input>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <b-form-select
                      v-model="segmentoSelecionado"
                      :options="this.segmentoOptions"
                      @change="loadUsers()"
                    >
                      <option :value="null">Segmento</option>
                      <span slot="no-options">Filtro não encontradao!</span>
                      <template slot="option" slot-scope="option">
                        {{ option.title }}
                      </template>
                    </b-form-select>
                  </div>
                  <div class="col-md-4">
                    <b-form-select
                      v-model="disciplinaSelecionada"
                      :options="this.disciplinaOptions"
                      placeholder="Disciplina"
                      @change="loadUsers()"
                    >
                      <option :value="null">Disciplina</option>
                      <span slot="no-options">Filtro não encontradao!</span>
                      <template slot="option" slot-scope="option">
                        {{ option.name }}
                      </template>
                    </b-form-select>
                  </div>
                  <div class="col-md-4">
                    <button type="button" v-on:click="loadUsers" class="btn btn-outline-secondary pull-right" id="button-addon2">
                      <em class="fa fa-search" aria-hidden="true"></em>Pesquisar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <br />
          <br />
          <!-- <div v-if="this.loading" class="col-md-12" style="margin-top: 70px; display: flex; justify-content: center">
            <b-media
              v-show="loading"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; background: white; opacity: 0.75"
            >
              <b-icon style="position: absolute; top: 50%; left: 50%" icon="clock-fill" animation="fade" font-scale="3" variant="warning"></b-icon>
            </b-media>
          </div> -->

          <div class="table-responsive-sm table-responsive-md table-responsive-lg bg-white">
            <table class="table" summary="Usuários">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Disciplina</th>
                  <th scope="col">Segmento</th>
                  <th scope="col">Turma</th>
                  <th scope="col" style="text-align: center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) of listaUser" :key="index">
                  <td>
                    {{ user.name }}
                    <b-badge
                      variant="info"
                      v-if="user.profile === 4"
                      >ADMIN</b-badge
                    >
                    <b-badge
                      variant="info"
                      v-if="
                        user.profile === 3"
                      >COORD DISC.</b-badge
                    >
                    <b-badge
                      variant="info"
                      v-if="user.profile === 2"
                      >COORD</b-badge
                    >
                  </td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.disciplinas[0] }}</td>
                  <td>{{ user.segmento }}</td>
                  <td>{{ user.turmas[0] }}</td>
                  <td>
                      <b-icon
                        icon="pencil-fill"
                        class="btn btn-success"
                        @click="editarUsuario(user)"
                        v-b-tooltip.hover.v-light
                        title="Editar"
                      >
                      </b-icon>
                      <b-icon
                      icon="x-square-fill"
                        class="btn btn-warning"
                        @click="sendWelcomeMail(user)"
                        v-b-tooltip.hover.v-light
                        title="Excluir"
                      />
                  </td>
                </tr>
              </tbody>
            </table>
            <br/>
            <div class="correctPosition">
              <b-pagination
              pills
              size="sm"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                :number-of-pages="numPages"
                @input="loadUsers()"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="modal-center" name="import-user" height="auto" style="padding-top: 25vh" :scrollable="true">
      <!-- <ImportUserCSV></ImportUserCSV> -->
    </b-modal>
    <modal name="form-user" height="auto" :scrollable="true">
      <UserForm :user="usuarioSelecionado"></UserForm>
    </modal>
    <v-dialog />
  </div>
</template>

<script>
  // import ImportUserCSV from './ImportUserCSV.vue';
  import Vue from 'vue';
  import JsonCSV from 'vue-json-csv';
  import UserForm from '../components/UserForm.vue'

  Vue.component('downloadCsv', JsonCSV);

  export default {
    components: {
      // ImportUserCSV,
      UserForm,
    },
    data() {
      return {
        currentPage: 1,
        perPage: 15,
        totalRows: 0,
        loading: true,
        keyword: '',
        listaUser: [],
        usuarioSelecionado: {},
        segmentoOptions: [],
        segmentoSelecionado: null,
        disciplinaOptions: [],
        disciplinaSelecionada: null,
        json_data: [
          {
            nome: '',
            nomeExibicao: '',
            email: '',
            localTrabalho: '',
          },
        ],
      };
    },
    async created() {
      this.currentPage = 1;
      this.loading = true;
      await this.loadUsers(event);
      // this.$validate()
      //   .then(() => {
      //     this.loadData();
      //   })
      //   .catch(() => {
      //     this.$router.push({ name: 'login' });
      //     this.error('Erro ao consultar empresa.');
      //   });
    },
    methods: {
      downloadCsv() {
        var fileURL = window.URL.createObjectURL(new Blob('../assets/download/user-merit-coin.csv'));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'file.csv');
        document.body.appendChild(fileLink);

        fileLink.click();
      },
      numPages() {
        return Math.ceil(this.totalRows / this.perPage);
      },
      editarUsuario(user) {
        this.usuarioSelecionado = user;
        this.$modal.show('form-user');
      },
      cadastrarUsuario() {
        this.usuarioSelecionado = { profile: 1 };
        this.$bvModal.show('form-user');
      },
      // importUserCsv() {
      //   this.$modal.show('import-user');
      // },
      async loadUsers(e) {
        if (e) {
          e.preventDefault();
        }
        this.listaUser = {};
        this.usuarioSelecionado = {};

        const url = this.buildSearchQuery();
        await this.$api()
          .get(url)
          .then((response) => {
            this.listaUser = response.data;
            this.totalRows = response.data.length;
          })
          .catch((e) => {
            this.loading = false;
            this.error(`Não foi possível retornar a lista de usuários: ${e.message}`);
          });
          console.log(this.listaUser)
      },
      buildSearchQuery() {
        let query = `/users?limit=${this.perPage}&currentPage=${this.currentPage}&filter=${this.keyword}`;

        // if (this.filtroIsActiveSelecionado.value !== null) {
        //   query += `&isActive=${this.filtroIsActiveSelecionado.value}`;
        // }
        // if (this.filtroGrupoSelecionado._id) {
        //   query += `&group=${this.filtroGrupoSelecionado._id}`;
        // }
        return query;
      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons');
  @import url('https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css');

  .avatar-image img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .red {
    color: red;
  }

  .to-left {
    float: right;
  }

  .to-right {
    float: right;
    color: gray;
  }

  .orange {
    color: orange;
  }

  .form-control-aux {
    border: 1px solid #ccc;
    margin-top: 5px;
    padding: 21.5px 28px;
    border-bottom: 0px;
    border-radius: 0;
    font-size: 14px;
  }
</style>
