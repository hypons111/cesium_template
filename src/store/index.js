import { createStore } from 'vuex'

const defaultModel = "ALL";

export default createStore({
  state: {
    CURRENT_SECTION: "section1",
    ALL_MODEL: "ALL",
    CURRENT_MODEL: defaultModel,
    CURRENT_MAIN_COMPONENT: "section1",
    MODAL_STATUS: {
      IS_SHOW : false,
      CONTENTS : {}
    }
  },
  getters: {
    CURRENT_SECTION: state => state.CURRENT_SECTION,
    ALL_MODEL: state => state.ALL_MODEL,
    CURRENT_MODEL: state => state.CURRENT_MODEL,
    CURRENT_MAIN_COMPONENT: state => state.CURRENT_MAIN_COMPONENT,
    MODAL_STATUS: state => state.MODAL_STATUS
  },
  mutations: {
    SET_CURRENT_SECTION(state, payload) {
      state.CURRENT_SECTION = payload;
    },
    SET_CURRENT_MODEL(state, payload) {
      state.CURRENT_MODEL = payload;
    },
    SET_CURRENT_MAIN_COMPONENT(state, payload) {
      state.CURRENT_MAIN_COMPONENT = payload;
    },
    SET_MODAL_STATUS(state, payload) {
      state.MODAL_STATUS = payload;
    }
  },
  actions: {},
  modules: {}
})
