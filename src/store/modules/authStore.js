/* eslint-disable no-console */
import variables from '../../variables';

const AuthModule = {
  namespaced: true,
  state: {
    user: undefined,
    token: undefined,
  },
  mutations: {
    setUser(state, newUser) {
      // eslint-disable-next-line no-param-reassign
      state.user = newUser;
    },
    setToken(state, newToken) {
      // eslint-disable-next-line no-param-reassign
      state.token = newToken;
    },
  },
  actions: {
    /**
     * Initialize from cache (localstorage)
     */
    init(context) {
      try {
        let user;
        if (localStorage.getItem(variables.auth.userdetais) !== 'undefined') {
          user = JSON.parse(localStorage.getItem(variables.auth.userdetais));
        }
        let token;
        if (localStorage.getItem(variables.auth.appToken) !== 'undefined') {
          token = JSON.parse(localStorage.getItem(variables.auth.appToken));
        }
        context.commit('setUser', user);
        context.commit('setToken', token);
      } catch (err) {
        console.error(err);
      }
    },
    /**
     * Set logged user
     */
    setUser(context, newUser) {
      if (newUser) {
        const user = {
          Id: newUser.id,
          FirstName: newUser.first_name,
          LastName: newUser.last_name,
          Email: newUser.email,
          Profile: newUser.profile,
        };
        if (user.PictureUrl) {
          user.PictureUrl = user.PictureUrl.substring(0, user.PictureUrl.indexOf('?'));
        }

        context.commit('setUser', user);
      } else {
        context.commit('setUser', undefined);
      }
    },
    /**
     * Set the authentication metadata
     * @returns {token: string, expires: number}
     */
    setToken(context, newToken) {
      if (newToken) {
        const week = new Date();
        week.setDate(week.getDate() + variables.auth.expires * 60);

        const data = {
          expires: week.getTime(),
          token: newToken,
        };
        context.commit('setToken', data);
      } else {
        context.commit('setToken', undefined);
      }
    },
  },
  getters: {
    /**
     * Get logged user
     * @returns {token: string, expires: number}
     */
    user(state) {
      return state.user;
    },
    /**
     * Get application token
     */
    token(state) {
      return state.token;
    },
  },
};

export default AuthModule;
