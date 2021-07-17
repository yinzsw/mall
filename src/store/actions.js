import {ADD_COUNTER, ADD_TO_CART, MOD_All_CHECKED} from "./mutations-types";

export default {
  addCart(context, payload) {
    let sameProduct = context.state.cartList.find(item => item.iid === payload.iid);
    if (sameProduct) {
      context.commit(ADD_COUNTER, sameProduct);
      return `当前商品数量+1(${sameProduct.count})`;
    }
    payload.count = 1;
    payload.checked = true;
    context.commit(ADD_TO_CART, payload);
    return `成功添加到购物车!`;
  },
  modCart_AllChecked(context, payload) {
    if (!context.state.cartList.length) return false
    context.commit(MOD_All_CHECKED, payload);
  }
}
