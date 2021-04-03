import Vue from "vue";
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/goodsManage",
        component: () => import("./router/home"),
        children: [
            {
                path: "/goodsManage",
            
                component: () => import("./router/goodsManage")
            },
            {
                path: "/orderManage",
                component: () => import("./router/orderManage")
            },
            {
                path: "/userManage",
                redirect: "/userManger/merchant"
            }
        ],
        beforeEnter(to, from, next) {
            //这只是测试阶段的登录校验，没有安全性
            if (window.document.cookie.includes("appkey")) {
                next();
            } else {
                alert("你还没有登录呢!");
                next("/login");
            }
        }
    },
    {
        path: "/login",
        component: () => import("./router/login")
    },

];

export default new VueRouter({
    routes
})