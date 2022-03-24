<template>
  <div>
    <div class="modal-header">
      <h2 class="modal-title" id="exampleModalLabel">
        <strong>Importar Usuários</strong>
      </h2>
      <button @click="$modal.hide('import-user')" type="button" class="close" data-dismiss="modal">
        x
      </button>
    </div>
    <div v-if="!loading">
      <div class="modal-body">
        <input type="file" @change="handleFile" />
      </div>
      <div class="modal-footer off-set-bottom-30">
        <div class="col-md-12 row">
          <button @click="importarUsuarios()" type="button" class="btn btn-success" data-dismiss="modal">
            Importar Usuários
          </button>
          <button @click="$modal.hide('import-user')" type="button" class="btn btn-danger" data-dismiss="modal">
            Cancelar
          </button>
        </div>
      </div>
    </div>
    <div v-else class="col-md-12" style=" margin-top: 30px; margin-bottom: 50px; display: flex; justify-content: center;">
      <SocketSpin></SocketSpin>
    </div>
  </div>
</template>

<script>
//   import SocketSpin from 'vue-loading-spinner/src/components/Socket.vue';

  export default {
    // components: {
    //   SocketSpin,
    // },
    data() {
      return {
        loading: false,
        file: '',
      };
    },
    created() {},
    methods: {
      handleFile(event) {
        this.file = event.target.files[0];
      },
      importarUsuarios() {
        if (this.file) {
        //   this.loading = true;

          const formData = new FormData();
          formData.append('file', this.file);
          this.$api()
            .post(`user/createUsersByCSV`, formData, {
              headers: {
                'Content-Type': 'text/csv',
              },
            })
            .then((response) => {
            //   this.$api()
            //     .post(`${config.jsonServer}/api/userToken/createListOfToken`, response.data)
            //     .then((token) => {
            //       this.$api()
            //         .post(`${config.jsonServer}/api/userToken/sendEmailNewuserList`, token.data)
            //         .then(() => {
            //           this.$snotify.success('Usuários cadastrados com sucesso.', 'Cadastro');
                      this.$modal.hide('import-user');
                    //   this.loading = false;
            //         })
            //         .catch(() => {
            //           this.$modal.hide('import-user');
            //           this.loading = false;
            //         });
            //     })
            //     .catch(() => {
            //       this.$modal.hide('import-user');
            //       this.loading = false;
            //     });
            })
            .catch((err) => {
              this.$snotify.error(err.response.data, 'Erro');
              this.loading = false;
            });
        } else {
          this.$snotify.warning('Escolha um Arquivo CSV para importar!', 'Atenção');
        }
      },
    },
  };
</script>

<style scoped></style>
