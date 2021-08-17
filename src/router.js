import Vue from "vue";
import VueRouter from "vue-router"
//由于导入通过webpack处理过后，如果之前已经有导入过的，则直接获取之前的导出结果而不重新运行该文件
import store from "./store";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        redirect: "goodsManage",
        meta: {
            //标记为一级菜单
            menu: 1
        },
        component: () => import("./views/home"),
        children: [{
            path: "/goodsManage",
            name: "goodsManage",
            meta: {
                title: "商品管理",
                icon: "goodsManage",
                index: "1"
            },
            component: () => import("./views/goodsManage")
        }],
    },
    {
        path: "/1",
        redirect: "categoryAndTags",
        meta: {
            menu: 1,
        },
        component: () => import("./views/home"),
        children: [{
            path: "/categoryAndTags",
            name: "categoryAndTags",
            meta: {
                title: "类名与标签",
                icon: "categoryAndTags",
                index: 2,
                admin: true //需要管理员才能访问
            },
            component: () => import("./views/categoryAndTags")
        }]
    },
    {
        path: "/saleManage",
        name: "saleManage",
        meta: {
            title: "销售管理",
            icon: "saleManage",
            index: 3,
            //标记为2级菜单
            menu: 2
        },
        redirect: "saleManage/statistics",
        component: () => import("./views/home"),
        children: [{
                name: "statistics",
                path: "statistics",
                meta: {
                    title: "销售统计",
                    icon: "saleStatistics",
                    index: "3-1"
                },
                component: () => import("./views/statistics")
            },
            {
                name: "order",
                path: "order",
                meta: {
                    title: "订单管理",
                    icon: "orderManage",
                    index: "3-2"
                },
                component: () => import("./views/order")
            }
        ]
    },
    {
        path: "/login",
        component: () => import("./views/login")
    },
];

const router = new VueRouter({
    routes,
    mode: "history"
});

router.beforeEach((to, from, next) => {
    if (to.path == "/login" || window.localStorage.getItem("token")) {
        //获取作用于菜单栏的路由
        let menuRoutes = routes.filter(val => {
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
    }
})

export default router;