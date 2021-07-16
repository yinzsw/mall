import {ADD_COUNTER, ADD_TO_CART, MOD_All_CHECKED} from "./mutations-types";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  },
  [MOD_All_CHECKED](state, payload) {
    state.cartList.forEach(item => item.checked = payload);
  }
}
