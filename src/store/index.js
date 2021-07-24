import Vue from "vue";
import Vuex from "vuex";

import * as userApi from "@/api/user";

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        menuRoutes : null,      //菜单路由
        userInfo : null,        //用户信息
        isloading : false       //是否处于加载状态
    },
    mutations : {
        changeMenuRoutes(state,routes){
            state.menuRoutes = routes;
        },
        setUserInfo(state,userInfo){
            state.userInfo = userInfo;
        },
        setIsLoading(state,status){
            state.isloading = status;
        }
    },
    actions : {
        changeMenuRoutes(context,routes){
            context.commit("changeMenuRoutes",routes);
        },
        async login(context,userInfo){
            context.commit("setIsLoading",true);
            const result = await userApi.login(userInfo.email,userInfo.password);
            context.commit("setUserInfo",result.data);
            context.commit("setIsLoading",false);
            return result;
        },
        async whoami(context){
            context.commit("setIsLoading",true);
            const result = await userApi.whoami();
            context.commit("setUserInfo",result.data);
            context.commit("setIsLoading",false); 
        }
    }
})

export default store;