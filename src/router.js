import Vue from "vue";
import VueRouter from "vue-router"
//由于导入通过webpack处理过后，如果之前已经有导入过的，则直接获取之前的导出结果而不重新运行该文件
import store from "./store";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        redirect: "/goodsManage",
        meta: {
            //标记为一级菜单
            menu: 1
        },
        component: () => import("./router/home"),
        children: [{
                path: "goodsManage",
                name: "goodsManage",
                meta: {
                    title: "商品管理",
                    icon : "goodsManage"
                },
                component: () => import("./router/goodsManage")
            }
        ],
    },
    {
        path: "/saleManage",
        name: "saleManage",
        meta: {
            title: "销售管理",
            icon : "saleManage",
            //标记为2级菜单
            menu: 2
        },
        redirect: "saleManage/statistics",
        component: () => import("./router/home"),
        children: [{
                name: "statistics",
                path: "statistics",
                meta: {
                    title: "销售统计",
                    icon : "saleStatistics"
                },
                component: () => import("./router/statistics")
            },
            {
                name: "order",
                path: "order",
                meta: {
                    title: "订单管理",
                    icon : "orderManage"
                },
                component: () => import("./router/order")
            }
        ]
    },
    {
        path: "/login",
        component: () => import("./router/login")
    },
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    //这只是测试阶段的登录校验，没有安全性
    if (to.path=="/login" || window.document.cookie.includes("appkey")) {
        //获取作用于菜单栏的路由
        const menuRoutes = routes.filter(val => {
            return val.meta && val.meta.menu;
        }).map(val => {
            if (val.meta.menu == 1) {
                return val.children;
            } else if (val.meta.menu == 2) {
                return val;
            }
        }).flat();

        store.dispatch("changeMenuRoutes", menuRoutes).then(() => {
            next();
        })
    } else {
        alert("你还没有登录呢!");
        next("/login");
    }
})

export default router;