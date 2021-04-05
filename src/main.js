import Vue from 'vue'
import App from './App.vue'
import router from "./router";
//导出重置css
import "./assets/css/reset.css";
//导入iconfont
import "./assets/css/iconfont.css"

//导入vuex
import store from "./store";
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
