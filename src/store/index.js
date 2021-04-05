import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        menuRoutes : null
    },
    mutations : {
        changeMenuRoutes(state,routes){
            state.menuRoutes = routes;
        }
    },
    actions : {
        changeMenuRoutes(context,routes){
            context.commit("changeMenuRoutes",routes);
        }
    }
})

export default store;