<template>
  <div>
    <div class="container">
      <user-profile-header ref="bloco_header" v-if="!this.isLoginPage"></user-profile-header>
      <router-view ref="router_view" />
      <hr v-show="!this.isLoginPage" />
      <footer class="footer pull-right" v-show="!this.isLoginPage">
        <!-- <img :src="require('@/assets/img/foot-logo.png')" alt="Thumbnail"> -->
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      this.$on('alterarPerfil-on', (perfilParam) => this.$refs.router_view.atualizarPerfil(perfilParam));
      this.$on('limparSelect-on', () => this.$refs.bloco_header.limparSelect());
    },
    computed: {
      avatar() {
        // const avatarPath = `@/statics/avatars_matricula/matricula_${
        //   this.$session.get('usuario_login').matricula
        // }.svg`;
        // return avatarPath;
        return '';
      },
      isLoginPage() {
        return this.$route.name === 'login' || this.$route.name === 'recoverpassword';
      },
    },
  };
</script>
<style></style>
