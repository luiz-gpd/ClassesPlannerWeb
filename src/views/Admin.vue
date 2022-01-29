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
                :disabled="expired || isLimitReached"
              >
                Cadastrar Usuário <em class="fa fa-plus-circle"></em>
              </button>
            </div>
            <div style="margin-left: 30px" class="col-md-3">
              <button
                id="btnImportarUsuario"
                type="button"
                class="btn btn-primary"
                :disabled="expired || isLimitReached"
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
              <download-csv :data="json_data" name="user-merit-coin.csv">
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
                    <label>Pesquisar usuários</label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control form-control-aux"
                        v-model="keyword"
                        placeholder="Informe nome ou e-mail"
                        aria-label="Pesquisar"
                        aria-describedby="button-addon2"
                        @keydown.enter="loadUsersAndEraseSelected()"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <label>Status</label>
                    <v-select
                      v-model="filtroIsActiveSelecionado"
                      :options="this.filtroIsActive"
                      :clearable="false"
                      class="select-modal"
                      placeholder="Filtro Status"
                      label="title"
                      @change="loadUsersAndEraseSelected()"
                    >
                      <option :value="null" disabled>Status do Usuario</option>
                      <span slot="no-options">Filtro não encontradao!</span>
                      <template slot="option" slot-scope="option">
                        {{ option.title }}
                      </template>
                    </v-select>
                  </div>
                  <div class="col-md-4">
                    <label>Grupo</label>
                    <v-select
                      v-model="filtroGrupoSelecionado"
                      :options="this.filtroGrupo"
                      :clearable="false"
                      class="select-modal"
                      placeholder="Grupo"
                      label="name"
                      @change="loadUsersAndEraseSelected()"
                    >
                      <option :value="null" disabled>Grupo de Usuarios</option>
                      <span slot="no-options">Filtro não encontradao!</span>
                      <template slot="option" slot-scope="option">
                        {{ option.name }}
                      </template>
                    </v-select>
                  </div>
                  <div class="col-md-4">
                    <button type="button" v-on:click="loadUsersAndEraseSelected" class="btn btn-outline-secondary pull-right" id="button-addon2">
                      <em class="fa fa-search" aria-hidden="true"></em>Pesquisar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div v-if="selectedUsers.length > 0">
            <strong class="mr-2">Ações</strong>
            <button
              class="btn btn-primary btn-link btn-sm btn-just-icon"
              v-on:click="$modal.show('mudar-grupo')"
              v-b-tooltip.hover.v-light
              title="Alterar grupo"
            >
              <b-icon icon="arrow-repeat" style="vertical-align: top" class="orange" scale="0.8"></b-icon>
            </button>
            <button
              class="btn btn-primary btn-link btn-sm btn-just-icon"
              @click="sendWelcomeMailForAll()"
              v-b-tooltip.hover.v-light
              title="Enviar e-mail de boas vindas"
            >
              <em class="fa fa-envelope"></em>
            </button>
            <button
              class="btn btn-danger btn-link btn-sm btn-just-icon"
              :disabled="filtroIsActiveSelecionado.title === 'Inativo'"
              @click="inativarTodos()"
              v-b-tooltip.hover.v-light
              title="Inativar"
            >
              <em class="fa fa-times"></em>
            </button>
            <button
              class="btn btn-success btn-link btn-sm btn-just-icon"
              :disabled="filtroIsActiveSelecionado.title === 'Ativo'"
              @click="ativarTodos()"
              v-b-tooltip.hover.v-light="'Ativar'"
            >
              <em class="fa fa-check"></em>
            </button>
          </div>
          <div class="to-right">Usuários selecionados: {{ selectedUsers.length }}</div>
          <div v-if="this.loading" class="col-md-12" style="margin-top: 70px; display: flex; justify-content: center">
            <b-media
              v-show="loading"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; background: white; opacity: 0.75"
            >
              <b-icon style="position: absolute; top: 50%; left: 50%" icon="clock-fill" animation="fade" font-scale="3" variant="warning"></b-icon>
            </b-media>
          </div>

          <div class="table-responsive-sm table-responsive-md table-responsive-lg bg-white">
            <table class="table" summary="Usuários">
              <thead>
                <tr>
                  <th scope="col">
                    <b-form-checkbox
                      :disabled="this.loading"
                      id="select-all"
                      v-model="selectAll"
                      :name="`checkbox-all`"
                      value="include"
                      unchecked-value="exclude"
                      @change="allSelect()"
                    >
                    </b-form-checkbox>
                  </th>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Grupo</th>
                  <th scope="col">Status</th>
                  <th scope="col" style="text-align: center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) of listaUser" :key="index">
                  <td>
                    <b-form-checkbox
                      :disabled="loading"
                      :id="user._id"
                      v-model="checkboxValue[index]"
                      :name="`checkbox-${index}`"
                      value="include"
                      unchecked-value="exclude"
                      @change="userSelection(user, index)"
                    >
                    </b-form-checkbox>
                  </td>
                  <td>
                    Imagem do avatar
                  </td>
                  <td>
                    {{ user.nome }}
                    <b-badge
                      variant="info"
                      v-if="
                        user.profile.find(function (profile) {
                          return profile === 1;
                        })
                      "
                      >ADMIN</b-badge
                    >
                  </td>
                  <td>{{ user.email }}</td>
                  <td>{{ groupsMap[user.idGroup] }}</td>
                  <td>
                    <div v-if="user.isActive">
                      <span class="badge badge-success">Ativo</span>
                    </div>
                    <div v-else>
                      <span class="badge badge-danger">Inativo</span>
                    </div>
                  </td>
                  <td>
                    <div style="text-align: center">
                      <button
                        class="btn btn-primary btn-link btn-sm btn-just-icon"
                        @click="editarUsuario(user)"
                        v-b-tooltip.hover.v-light
                        title="Editar"
                        :disabled="expired"
                      >
                        <em class="fa fa-edit"></em>
                      </button>
                      <button
                        class="btn btn-primary btn-link btn-sm btn-just-icon"
                        @click="sendWelcomeMail(user)"
                        v-b-tooltip.hover.v-light
                        title="Enviar e-mail de boas vindas"
                        :disabled="expired"
                      >
                        <em class="fa fa-envelope"></em>
                      </button>
                      <button
                        v-if="user.isActive"
                        class="btn btn-danger btn-link btn-sm btn-just-icon"
                        @click="inativar(user)"
                        v-b-tooltip.hover.v-light
                        title="Inativar"
                        :disabled="expired"
                      >
                        <em class="fa fa-times"></em>
                      </button>
                      <button
                        v-else
                        class="btn btn-success btn-link btn-sm btn-just-icon"
                        @click="ativar(user)"
                        v-b-tooltip.hover.v-light="'Ativar'"
                        :disabled="expired"
                      >
                        <em class="fa fa-check"></em>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="correctPosition">
              <b-pagination
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

    <modal id="modal-center" name="import-user" height="auto" style="padding-top: 25vh" :scrollable="true">
      <!-- <ImportUserCSV></ImportUserCSV> -->
    </modal>
    <modal name="form-user" height="auto" :scrollable="true">
      <!-- <UserForm :selectedCompany="this.selectedCompany" :user="this.usuarioSelecionado" :groups="this.groups"></UserForm> -->
    </modal>

    <modal name="confirma-ativar" height="auto" :scrollable="true" @before-close="loadUsers()">
      <div>
        <div class="modal-header">
          <h2 class="modal-title">
            <strong v-if="type === 'all'">Ativar Usuários</strong>
            <strong v-else>Ativar Usuário</strong>
          </h2>
          <button @click="$modal.hide('confirma-ativar')" type="button" class="close" data-dismiss="modal">x</button>
        </div>
        <div class="modal-body">
          <span v-if="type === 'all' && selectedUsers.length > 1">Confirmar a ativação de {{ selectedUsers.length }} usuários?</span>
          <span v-if="type === 'all' && selectedUsers.length === 1">Confirmar a ativação de 1 usuário?</span>
        </div>
        <div class="modal-footer off-set-bottom-30">
          <div class="col-md-12 row">
            <button @click="$modal.hide('confirma-ativar')" type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button @click="confirmaAtivar()" type="button" class="btn btn-success" data-dismiss="modal">Ativar</button>
          </div>
        </div>
      </div>
    </modal>
    <modal name="mudar-grupo" height="auto" :scrollable="true">
      <div>
        <div class="modal-header">
          <h2 class="modal-title">
            <strong>Alterar Grupo</strong>
          </h2>
          <button @click="$modal.hide('mudar-grupo')" type="button" class="close" data-dismiss="modal">x</button>
        </div>
        <div class="modal-body">
          <div>
            <label for="group-select">Grupo de Destino:</label>
            <b-form-select id="group-select" v-model="selectedGroup" :options="groupsOptions" :disabled="loading"></b-form-select>
            <br />
          </div>
        </div>
        <div class="modal-footer off-set-bottom-30">
          <label>Quantidade de usuários selecionados: {{ selectedUsers.length }}</label>
          <div class="col-md-12 row">
            <button @click="$modal.hide('mudar-grupo')" type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button @click="changeUsersGroup()" type="button" class="btn btn-success" data-dismiss="modal">Salvar</button>
          </div>
        </div>
      </div>
    </modal>
    <v-dialog />
  </div>
</template>

<script>
  // import ImportUserCSV from './ImportUserCSV.vue';
  // import UserForm from './UserForms.vue';
  import config from '../helpers/generalConfig'
  import Vue from 'vue';
  import JsonCSV from 'vue-json-csv';

  Vue.component('downloadCsv', JsonCSV);

  export default {
    components: {
      // ImportUserCSV,
      // UserForm,
    },
    props: {
      selectedCompany: null,
    },
    data() {
      return {
        expired: false,
        type: 'one',
        checkboxValue: [],
        selectedUsers: [],
        selectAll: 'exclude',
        selectedGroup: [],
        currentPage: 1,
        perPage: 15,
        totalRows: 0,
        loading: true,
        keyword: '',
        listaUser: [],
        isLimitReached: true,
        groups: [],
        groupsOptions: [],
        groupsMap: {},
        filtroIsActive: [
          {
            title: 'Todos',
            value: null,
          },
          {
            title: 'Ativo',
            value: true,
          },
          {
            title: 'Inativo',
            value: false,
          },
        ],
        filtroIsActiveSelecionado: {
          title: 'Ativo',
          value: true,
        },
        filtroGrupo: [
          {
            name: 'Todos',
            value: null,
          },
        ],
        filtroGrupoSelecionado: {
          name: 'Todos',
          value: null,
        },
        usuarioSelecionado: {},
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
      await this.loadGroups();
      await this.loadUsers(event);

      await this.validateUserLimit();
      this.groupsOptions = this.groups.map((e) => {
        return {
          value: e._id,
          text: e.name,
        };
      });
      this.$api()
        .get(`${config.jsonServer}/api/company/settings`)
        .then((response) => {
          this.expired = response.data.hasExpired;

          if (this.expired) {
            this.$modal.hide('import-user');
            this.$modal.hide('form-user');
          }
        });
      this.$validate()
        .then(() => {
          this.loadData();
        })
        .catch(() => {
          this.$router.push({ name: 'login' });
          this.error('Erro ao consultar empresa.');
        });
    },
    methods: {
      loadData() {},
      async loadUsersAndEraseSelected() {
        this.selectedUsers = [];
        this.selectAll = 'exclude';
        await this.loadUsers();
      },
      async validateUserLimit() {
        try {
          const response = await this.$api().get(`${config.jsonServer}/api/subscription/active`);
          if (response.data && response.data.subscription.idContractPlan) {
            this.isLimitReached = this.totalRows >= response.data.subscription.idContractPlan.user_limit;
          } else if (response.data.subscription.status === 'TRIAL') {
            this.isLimitReached = this.totalRows >= 200;
          }
        } catch (e) {
          this.warning(e.message);
        }
      },
      userSelection(user, index) {
        if (this.checkboxValue[index] === 'include') {
          this.selectedUsers.push(user);
        } else {
          const position = this.selectedUsers.findIndex((item) => item._id === user._id);
          this.selectedUsers.splice(position, 1);
        }
      },
      async changeUsersGroup() {
        const usersList = this.selectedUsers.map((e) => {
          return e._id;
        });
        if (usersList.length > 0) {
          this.$api()
            .put(`${config.jsonServer}/api/user/changegroup/${this.selectedGroup}`, usersList)
            .then(() => {
              this.$modal.hide('mudar-grupo');
              this.success('Grupo alterado com sucesso');
              this.selectedUsers = [];
              this.selectAll = 'exclude';
              this.loadUsers();
            })
            .catch((e) => {
              this.error(`Erro na mudança de grupo: ${e.message}`);
            });
        } else {
          this.warning('É necessário haver ao menos 1 usuário selecionado');
        }
      },
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
      async allSelect() {
        if (this.selectAll === 'include') {
          this.loading = true;
          const resume = true;
          let query = `${config.jsonServer}/api/user/allUsersAdmin?resume=${resume}&filter=${this.keyword}`;
          if (this.filtroIsActiveSelecionado.value !== null) {
            query += `&isActive=${this.filtroIsActiveSelecionado.value}`;
          }
          if (this.filtroGrupoSelecionado._id) {
            query += `&group=${this.filtroGrupoSelecionado._id}`;
          }
          const response = await this.$api().get(query);
          this.selectedUsers = response.data;
          await this.loadUsers();
          this.loading = false;
        } else {
          this.selectedUsers = [];
          await this.loadUsers();
        }
      },
      async confirmaInativar() {
        if (this.type === 'all') {
          const usersList = this.selectedUsers.map((e) => {
            return e._id;
          });
          if (usersList.length > 0) {
            try {
              await this.$api().put(`${config.jsonServer}/api/user/inactivate/all`, usersList);
              this.selectedUsers = [];
              this.success(`${usersList.length} usuário(s) foram inativados`);
              this.selectAll = 'exclude';
            } catch (e) {
              this.error('Erro ao inativar usuário(s)');
            }
          } else {
            this.warning('Selecione ao menos 1 usuário');
          }
        } else {
          try {
            await this.$api().put(`${config.jsonServer}/api/user/inactivate`, this.usuarioSelecionado);
            this.success(`O(A) usuário(a) ${this.usuarioSelecionado.nome} foi inativado(a)`);
          } catch (e) {
            this.error('Erro ao inativar usuário(s)');
          }
        }
        this.loadUsers();
      },
      confirmaAtivar() {
        if (this.type === 'all') {
          const usersList = this.selectedUsers.map((e) => {
            return e._id;
          });
          if (usersList.length > 0) {
            this.$api()
              .put(`${config.jsonServer}/api/user/activate/all`, usersList)
              .then(() => {
                this.$modal.hide('confirma-ativar');
                this.selectedUsers = [];
                this.success(`${usersList.length} usuários foram reativados`);
                this.selectAll = 'exclude';
                this.loadUsers();
              })
              .catch(() => {
                this.error('Erro ao reativar usuário(s)');
                this.$router.push({ name: 'login' });
              });
          } else {
            this.warning('Selecione ao menos 1 usuário');
          }
        } else {
          this.$api()
            .put(`${config.jsonServer}/api/user/activate`, this.usuarioSelecionado)
            .then(() => {
              this.$modal.hide('confirma-ativar');
            })
            .catch((e) => {
              this.error(e.message);
              this.$router.push({ name: 'login' });
            });
        }
      },
      inativar(user) {
        this.type = 'one';
        const h = this.$createElement;

        // this.confirm(`O(A) usuário(a) ${user.nome} será inativado(a).`).then((res) => {
        this.confirm(h('p', ['O(A) usuário(a) ', h('strong', user.nome), ' será inativado(a) '])).then((res) => {
          if (res) {
            this.usuarioSelecionado = user;
            this.confirmaInativar();
          }
        });
      },
      ativar(user) {
        this.type = 'one';
        this.usuarioSelecionado = user;
        this.$modal.show('confirma-ativar');
      },
      inativarTodos() {
        this.type = 'all';
        this.confirm(`${this.selectedUsers.length} usuário(s) serão inativados.`).then((res) => {
          if (res) {
            this.confirmaInativar();
          }
        });
      },
      ativarTodos() {
        this.type = 'all';
        this.$modal.show('confirma-ativar');
      },
      editarUsuario(user) {
        this.usuarioSelecionado = user;
        this.$modal.show('form-user');
      },
      cadastrarUsuario() {
        this.usuarioSelecionado = { isActive: true, profile: [2] };
        this.$modal.show('form-user');
      },
      // importUserCsv() {
      //   this.$modal.show('import-user');
      // },
      async loadGroups() {
        let path;
        if (this.selectedCompany) {
          path = `${config.jsonServer}/api/groups/company/${this.selectedCompany._id}`;
        } else {
          path = `${config.jsonServer}/api/groups`;
        }

        try {
          const { data } = await this.$api().get(path);
          this.groups = data;
          this.filtroGrupo = [
            {
              name: 'Todos',
            },
            ...data,
          ];
          this.filtroGrupoSelecionado = this.filtroGrupo[0];
          data.forEach(({ _id, name }) => (this.groupsMap[_id] = name));
        } catch (e) {
            console.log(e);
        }
      },
      async loadUsers(e) {
        if (e) {
          e.preventDefault();
        }
        this.listaUser = {};
        this.usuarioSelecionado = {};

        const url = this.buildSearchQuery();
        await this.$api()
          .get(url)
          .then(({ data: { docs, totalDocs } }) => {
            this.loading = false;
            this.listaUser = docs;
            this.listaUser.map((e, index) => {
              this.selectedUsers
                .map((item) => {
                  return item._id.toString();
                })
                .includes(e._id.toString())
                ? (this.checkboxValue[index] = 'include')
                : (this.checkboxValue[index] = 'exclude');
            });
            this.totalRows = totalDocs;
          })
          .catch((e) => {
            this.loading = false;
            this.error(`Não foi possível retornar a lista de usuários: ${e.message}`);
          });
      },
      async sendWelcomeMail(user) {
        if (user.nome === '') {
          this.warning('Erro ao localizar usuário');
        }
        this.$modal.show('dialog', {
          title: 'Envio de Email',
          text: `Confirmar re-envio do e-mail de boas vindas para <b>${user.nome}</b> com um novo token de primeiro acesso?`,
          buttons: [
            {
              title: 'Sim',
              default: true, // Will be triggered by default if 'Enter' pressed.
              handler: () => {
                const loader = this.$loading.show();
                this.$api()
                  .get(`${config.jsonServer}/api/user/${user._id}/resend-welcome-email`)
                  .then(() => {
                    // certo
                    loader.hide();
                    this.$modal.hide('dialog');
                    this.success('Mensagem enviada');
                  })
                  .catch(() => {
                    // erro
                    loader.hide();
                    this.error('Erro no envio da mensagem');
                  });
              },
            },
            {
              title: 'Não',
              handler: () => {
                this.$modal.hide('dialog');
              },
            },
          ],
        });
      },
      async sendWelcomeMailForAll() {
        const usersEmailList = this.selectedUsers.map((e) => {
          return e.email;
        });
        if (usersEmailList.length > 0) {
          this.$modal.show('dialog', {
            title: 'Envio de Email',
            text:
              this.selectedUsers.length > 1
                ? `Confirmar re-envio do e-mail de boas vindas para <b>${this.selectedUsers.length} USUÁRIOS</b> com um novo token de primeiro acesso?`
                : `Confirmar re-envio do e-mail de boas vindas para <b>1 USUÁRIO</b> com um novo token de primeiro acesso?`,
            buttons: [
              {
                title: 'Sim',
                default: true, // Will be triggered by default if 'Enter' pressed.
                handler: () => {
                  const loader = this.$loading.show();

                  this.$api()
                    .put(`${config.jsonServer}/api/user/resend-welcome-email/all`, usersEmailList)
                    .then(() => {
                      // certo
                      loader.hide();
                      this.$modal.hide('dialog');
                      this.success('Mensagem enviada');
                    })
                    .catch((e) => {
                      // erro
                      loader.hide();
                      this.error(`Erro no envio da mensagem: ${e.message}`);
                    });
                },
              },
              {
                title: 'Não',
                handler: () => {
                  this.$modal.hide('dialog');
                },
              },
            ],
          });
        } else {
          this.error('É necessário haver ao menos 1 usuário selecionado');
        }
      },
      buildSearchQuery() {
        let query;
        if (this.selectedCompany) {
          query = `${config.jsonServer}/api/user/allUsersAdmin/${this.selectedCompany._id}?limit=${this.perPage}&currentPage=${this.currentPage}&filter=${this.keyword}`;
        } else {
          query = `${config.jsonServer}/api/user/allUsersAdmin?limit=${this.perPage}&currentPage=${this.currentPage}&filter=${this.keyword}`;
        }

        if (this.filtroIsActiveSelecionado.value !== null) {
          query += `&isActive=${this.filtroIsActiveSelecionado.value}`;
        }
        if (this.filtroGrupoSelecionado._id) {
          query += `&group=${this.filtroGrupoSelecionado._id}`;
        }
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
