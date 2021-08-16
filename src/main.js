import Vue from 'vue'
import App from './App.vue'
import router from "./router";
//导出重置css
import "./assets/css/reset.css";
//导入iconfont
import "./assets/css/iconfont.css"

//导入vuex
import store from "./store";

import {
  Steps,
  Button,
  message,
  Icon,
  Carousel
} from 'ant-design-vue';
Vue.config.productionTip = false;

Vue.use(Steps);
Vue.use(Button);
Vue.use(Carousel);
Vue.use(Icon);
Vue.prototype.$message = message;

const app = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount("#app");

store.dispatch("whoami").catch(err => {
  app.$router.push("/login");
});