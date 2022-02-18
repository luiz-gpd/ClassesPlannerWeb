<template>
  <div>
    <notifications group="user" position="center" />
    <div class="modal-header">
      <h2 class="modal-title" id="exampleModalLabel">
        <strong v-if="!user._id">Cadastrar Usuário</strong>
        <strong v-else>Editar Usuário</strong>
      </h2>
      <button @click="$modal.hide('form-user')" type="button" class="close" data-dismiss="modal">x</button>
    </div>
    <div class="modal-body">
      <div v-if="!loading">
        <div class="off-set-top-30">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-6 avatar-image" style="display: flex;">
                </div>
                <div class="col-md-6">
                  <label v-if="this.createdlbl">Cadastrado em {{ this.createdlbl }}</label>
                  <label v-if="this.updatedlbl">Última atualização em {{ this.updatedlbl }}</label>
                </div>
              </div>
              <div class="row off-set-top-30">
                <div class="col-md-6">
                  <label for="name">Nome completo</label>
                  <base-input v-model="user.name" id="name" type="text" placeholder="Nome Completo"></base-input>
                </div>
                <div class="col-md-6">
                  <label for="email">E-mail</label>
                  <base-input v-model="user.email" id="email" type="email" placeholder="E-mail"></base-input>
                </div>
              </div>
              <div class="row off-set-top-30">
                <div class="col-md-6">
                  <label for="name">Perfil de acesso</label>
                  <b-select size="sm" v-model="user.profile" :options="profileOpt"> </b-select>
                </div>
                <div class="col-md-6">
                  <label>Segmento</label>
                  <b-select size="sm" :disabled="user.profile === 4" v-model="user.segmento" :options="this.segmentos" type="text" placeholder="Segmento"></b-select>
                </div>
              </div>
              <br/>
              <div class="row off-set-top-30">
                <div class="col-md-6">
                    <!-- TODO - ESSE SELECT DEVE TER MÚTIPLAS OPÇÕES (BASEADO NO SEGMENTO ESCOLHIDO) -->
                  <label>Turmas:</label>
                  <b-select :disabled="user.profile !== 1" v-model="user.turmas" :options="this.turmas" multiple :select-size="2"></b-select>
                </div>
                <div class="col-md-6">
                  <label for="email">Disciplinas</label>
                  <b-select :disabled="user.profile === 2 || user.profile === 4" v-model="user.disciplinas" :options="this.disciplinas" multiple :select-size="2"></b-select>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>

        <div class="modal-footer">
            <div class="row">
          <div class="col-md-5">
            <button @click="salvar()" type="button" class="btn btn-primary" data-dismiss="modal">Salvar</button>
          </div>
          <div class="col-md-3">
            <button @click="$modal.hide('form-user')" type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog />
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: {
      user: {},
      disciplinas: [],
      segmentos: [],
      turmas: [],
    },
    data() {
      return {
        loading: false,
        createdlbl: '',
        updatedlbl: '',
        profileOpt: [
          { value: 1, text: 'PROFESSOR' },
          { value: 2, text: 'COORDENADOR' },
          { value: 3, text: 'COORDENADOR DA DISCPLINA' },
          { value: 4, text: 'ADMINISTRADOR' },
        ],
      };
    },
    async created() {
      if (this.user.createdAt) {
        this.createdlbl = moment(this.user.createdAt).format('DD/MM/YYYY');
      }
      if (this.user.updatedAt) {
        this.updatedlbl = moment(this.user.updatedAt).format('DD/MM/YYYY');
      }
    },
    methods: {
      salvar() {
          if (!this.user.email.includes('@colegiovisaorecife.com.br')) {
            this.error('Informe um e-mail válido');
            return;
          }

        //   this.loading = true;
        if (!this.user._id) {
            this.$api()
            .post(`users`, this.user)
            .then(() => {
                // this.loading = false;
              this.$modal.hide('form-user');
            })
            .catch((e) => {
                console.log(e);
              this.error('Erro ao criar usuário')
            });
        } else {
            this.$api()
            .put(`users`, this.user)
            .then(() => {
              this.$modal.hide('form-user');
            })
            .catch((e) => {
                console.log(e);
              this.error('Erro ao criar usuário')
            });
          }
        }
    },
    watch: {
        user: (newValue) => {
            if(newValue.profile === 4) {
                newValue.disciplinas = '';
                newValue.turmas = '';
                newValue.segmentos = '';
            } else if (newValue.profile === 3) {
                newValue.turmas = '';
            } else if (newValue.profile === 2) {
                newValue.turmas = '';
                newValue.disciplinas = '';
            }
        }
    }
  };
</script>

<style scoped>
</style>
