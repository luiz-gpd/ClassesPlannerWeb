const headerClass = 'p-0 border-bottom-0';
const footerClass = 'p-0 border-top-0';
export default {
  methods: {
    warning: async function (text) {
      await this.$bvModal.msgBoxOk(text, {
        titleHtml:
          '<div style="font-size:18pt margin: auto; padding: 3px 20px 0 10px"><row> <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Atenção</row></div>',
        headerClass,
        footerClass,
        size: 'sm',
        headerBgVariant: 'warning',
        headerTextVariant: 'warning',
        bodyBgVariant: 'warning',
        bodyTextVariant: 'dark',
        footerBgVariant: 'warning',
        okVariant: 'outline-warning',
        buttonSize: 'sm',
        button: 'disabled',
        hideHeaderClose: false,
        centered: true,
      });
    },

    confirm: async function (text) {
      return await this.$bvModal.msgBoxConfirm(text, {
        title: 'Confirmar ação',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        okTitle: 'sim',
        cancelTitle: 'não',
        headerClass,
        footerClass,
        centered: true,
      });
    },

    error: async function (text) {
      await this.$bvModal.msgBoxOk(text, {
        titleHtml:
          '<div style="font-size:18pt margin: auto; padding: 3px 20px 0 10px"><row> <i class="fa fa-ban" aria-hidden="true"></i> Erro</row></div>',
        headerClass,
        footerClass,
        size: 'sm',
        headerBgVariant: 'danger',
        headerTextVariant: 'light',
        bodyBgVariant: 'danger',
        bodyTextVariant: 'light',
        footerBgVariant: 'danger',
        okVariant: 'outline-danger',
        buttonSize: 'sm',
        disabled: 'true',
        hideHeaderClose: false,
        centered: true,
      });
    },

    success: async function (text) {
      await this.$bvModal.msgBoxOk(text, {
        titleHtml:
          '<div style="font-size:18pt; margin: auto; padding: 3px 20px 0 10px"><row> <i class="fa fa-check" aria-hidden="true"></i> Sucesso </row></div>',
        headerClass,
        footerClass,
        size: 'sm',
        headerBgVariant: 'success',
        headerTextVariant: 'light',
        bodyBgVariant: 'success',
        bodyTextVariant: 'light',
        footerBgVariant: 'success',
        okVariant: 'outline-success',
        buttonSize: 'sm',
        disabled: true,
        hideHeaderClose: false,
        centered: true,
      });
    },
  },
};
