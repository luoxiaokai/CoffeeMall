import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopt:0,
    sids:[],
  },
  mutations: {
    shop(state,payload){
      state.shopt=payload
    },
    getsids(state,payload){
      state.sids=payload
    }

  },
  actions: {
  },
  modules: {
  }
})
