import config from '../helpers/generalConfig';

const AuthMixin = {
  methods: {
    logout(redirect = true) {
      this.$store.dispatch('auth/setUser', undefined);
      this.$store.dispatch('auth/setToken', undefined);
      if (redirect) {
        this.$router.push({ name: 'login' });
      }
    },
    requestCredentials() {
      this.$showAlert({
        body: 'Você precisa informar suas credeciais.',
        type: 'warning',
        config: { position: 'centerTop' },
      });
      this.logout();
    },
    tryRefreshToken() {
      try {
        const url = 'refreshToken';
        const tokenMetadata = this.$store.getters['auth/token'];
        if (!tokenMetadata && !tokenMetadata.token) {
          this.requestCredentials();
        } else {
          this.$api().post(url, {
            token: tokenMetadata.token,
          }).then((response) => {
            this.$store.dispatch('auth/setToken', response.data);
          }, () => {
            this.requestCredentials();
          });
        }
      } catch (e) {
        this.requestCredentials();
      }
    },
    $validate() {
      return new Promise((resolve, reject) => {
        this.$NProgress().start();
        this.$api()
          .get(`${config.jsonServer}/api/auth/validate`)
          .then((response) => {
            this.$NProgress().done();
            if (response.data.statusCode === 200) {
              resolve();
            } else {
              reject();
            }
          });
      });
    },
  },
};

export default AuthMixin;
