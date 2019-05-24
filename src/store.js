import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    avatar:null
  },

  getters:{
    getUserAvatar: state => {
      if(state.avatar == null){
          state.avatar = localStorage.getItem("avatar");
      }
      return '/api/upload/' + state.avatar
    }
  },
  mutations: {
    changeAvatar(state,avatar){
      state.avatar = avatar
    }

  },
  actions: {

  }
})
