import { createStore } from 'vuex'

export default createStore({
  state: {
    CURRENT_VIEW: "view1",
  },
  getters: {
    CURRENT_VIEW: state => state.CURRENT_VIEW
  },
  mutations: {
    SET_CURRENT_VIEW(state, payload) {
      state.CURRENT_VIEW = payload;
    },
  },
  actions: {
    INIT_CURRENT_VIEW({ commit }) {
      commit("SET_CURRENT_VIEW", "view1");
    }
  },
  modules: {
  }
})
