import {ADD_COUNTER, ADD_TO_CART, MOD_All_CHECKED} from "./mutations-types";

export default {
  addCart(context, payload) {
    let sameProduct = context.state.cartList.find(item => item.iid === payload.iid);
    if (sameProduct) return context.commit(ADD_COUNTER, sameProduct);
    payload.count = 1;
    payload.checked = true;
    context.commit(ADD_TO_CART, payload);
  },
  modCart_AllChecked(context, payload) {
    if (!context.state.cartList.length) return false
    context.commit(MOD_All_CHECKED, payload);
  }
}
