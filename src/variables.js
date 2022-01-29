export default {
    env: {
      nodeEnv: process.env.VUE_APP_NODE_ENV,
      prodTip: process.env.VUE_APP_PROD_TIP,
      devTools: process.env.VUE_APP_DEV_TOOLS,
    },
    app: {
      name: process.env.VUE_APP_NAME,
      version: process.env.VUE_APP_VERSION,
    },
    http: {
      root: process.env.VUE_APP_API,
    },
    auth: {
      appToken: process.env.VUE_APP_AUTH_TOKEN_KEY,
      expires: parseInt(process.env.VUE_APP_AUTH_EXPIRES, 10),
      userdetais: process.env.VUE_APP_AUTH_USER_DETAILS,
    },
    colegiovisao: {
      domain: 'colegiovisaorecife.com.br',
    },
  };
  