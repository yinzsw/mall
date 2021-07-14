import {ADD_COUNTER, ADD_TO_CART} from "./mutations-types";

export default {
  addCart(context, payload) {
    let sameProduct = context.state.cartList.find(item => item.iid === payload.iid);
    if (sameProduct) return context.commit(ADD_COUNTER, sameProduct);
    payload.count = 1;
    context.commit(ADD_TO_CART, payload);
  }
}
