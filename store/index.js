import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      selected: [],
      loginStatus: false,
      username: ""
    },
    mutations: {
      add(state, selection) {
        state.selected = selection;
      },
      toggle(state) {
        state.loginStatus = !state.loginStatus;
      },
      addUser(state, username) {
        state.username = username;
      }
    }
  });
};

export default createStore;
