import NProgress from 'nprogress';

const NProgressPlugin = {
  install(Vue, options) {
    const instance = Vue;
    instance.prototype.$NProgress = (opt) => {
      if (opt) {
        NProgress.configure(opt);
      } else if (options) {
        NProgress.configure(options);
      }

      return NProgress;
    };

    instance.mixin({
      created() {
        if (this.$options.showLoading) {
          this.$NProgress().start();
        }
      },
      mounted() {
        if (this.$options.showLoading) {
          this.$NProgress().done();
        }
      },
    });
  },
};

export default NProgressPlugin;
