export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  checkedTotalPrice(state) {
    return state.cartList
      .filter(item => item.checked)
      .reduce((pre, cur) => pre + cur.newPrice * cur.count, 0)
      .toFixed(2);
  },
  checkedNumber(state) {
    return state.cartList.filter(item => item.checked).length;
  },
  isCheckedAll(state) {
    if (!state.cartList.length) return false;
    return state.cartList.every(item => item.checked);
  }
}
