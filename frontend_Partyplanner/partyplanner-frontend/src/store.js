import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";

const store = createStore({
    state() {
        return {
            Auth: false,
          
            // menu: [],
        };
    },
    mutations: {
        setAuth(state, Auth) {
            state.Auth = Auth;

        },
        // addMenuItem(state, menuItem) {
        //     state.menu.push(menuItem);
        // },
        // removeMenuItem(state, menuItemId) {
        //     const index = state.menu.findIndex(item => item.id === menuItemId);
        //     if (index !== -1) {
        //       state.menu.splice(index, 1);
        //     }
        //   }
     
    },
    actions: {
        // addMenuItem({ commit }, menuItem) {
        //     return api.addMenuItem(menuItem).then(() => {
        //         commit('addMenuItem', menuItem);
        //     });
        // }
    },
    plugins: [
        createPersistedState({}),
    ],
});

export default store;
