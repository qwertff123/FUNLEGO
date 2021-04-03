import Vue from 'vue'
import App from './App.vue'
import router from "./router";
//导出重置css
import "./assets/css/reset.css";
//导入iconfont
import "./assets/css/iconfont.css"

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
