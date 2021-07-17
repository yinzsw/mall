import Toast from "./Toast";

export default {
  install(Vue) {

    //1. 创建组件构造器
    const toastConstructor = Vue.extend(Toast);

    //2. 实例化一个构造器对象,创建一个组件对象
    const toast = new toastConstructor();

    //3. 将组件对象挂载到某一个元素上
    toast.$mount();

    //4. 渲染Dom元素
    document.body.appendChild(toast.$el)

    //5. 把toast对象建家到Vue的原型
    Vue.prototype.$toast = toast
  }
}
