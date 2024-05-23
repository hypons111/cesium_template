import { createStore } from 'vuex'

export default createStore({
  state: {
    CURRENT_VIEW: "view1",
    CURRENT_MODEL: "",
    CURRENT_MAIN_COMPONENT: "view1"
  },
  getters: {
    CURRENT_VIEW: state => state.CURRENT_VIEW,
    CURRENT_MODEL: state => state.CURRENT_MODEL,
    CURRENT_MAIN_COMPONENT: state => state.CURRENT_MAIN_COMPONENT,
  },
  mutations: {
    SET_CURRENT_VIEW(state, payload) {
      state.CURRENT_VIEW = payload;
    },
    SET_CURRENT_MODEL(state, payload) {
      state.CURRENT_MODEL = payload;
    },
    SET_CURRENT_MAIN_COMPONENT(state, payload) {
      state.CURRENT_MAIN_COMPONENT = payload;
    },
  },
  actions: {},
  modules: {}
})
