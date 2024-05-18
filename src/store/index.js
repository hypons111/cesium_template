import { createStore } from 'vuex'

export default createStore({
  state: {
    CURRENT_VIEW: "view1",
    CURRENT_MODEL: "",
    IS_SHOW_CESIUM: true,
    REFRESH_KEY: true
  },
  getters: {
    CURRENT_VIEW: state => state.CURRENT_VIEW,
    CURRENT_MODEL: state => state.CURRENT_MODEL,
  },
  mutations: {
    SET_CURRENT_VIEW(state, payload) {
      state.CURRENT_VIEW = payload;
    },
    SET_CURRENT_MODEL(state, payload) {
      state.CURRENT_MODEL = payload;
    },
  },
  actions: {
    // INIT_CURRENT_VIEW({ commit }) {
    //   commit("SET_CURRENT_VIEW", "view1");
    // },
    // INIT_CURRENT_MODEL({ commit }) {
    //   commit("SET_CURRENT_MODEL", "building");
    // }
  },
  modules: {
  }
})
