import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      authenticated: false,
      username: "",
    };
  },
  mutations: {
    signup(state: any, username) {
      state.username = username;
      state.authenticated = true;
    },
    signoff(state) {
      state.username = "";
      state.authenticated = false;
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },
    author(state) {
      return state.username;
    },
  },
});
