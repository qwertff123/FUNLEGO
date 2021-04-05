import qwMenu from "./qwMenu";
import qwMenuItem from "./qwMenuItem";
import qwMenuItemGroup from "./qwMenuItemGroup";
import "./iconfont.css";
import Vue from "vue";

Vue.prototype.$menuBus = new Vue({
    data(){
        return {
            curSelected : null,
            defaultActive : null,
        }
    }
});

export default {
    qwMenu,
    qwMenuItem,
    qwMenuItemGroup
}