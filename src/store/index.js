import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      let sameProduct = state.cartList.find(item => item.iid === payload.iid);
      if (sameProduct) return ++sameProduct.count;
      payload.count = 1;
      state.cartList.push(payload);
    }
  },
  actions: {},
  modules: {}
})
